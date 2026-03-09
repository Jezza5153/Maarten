import { parseJsonArray } from './utils'

interface ChefData {
    id: string
    firstName: string
    lastName: string
    slug: string
    city: string
    radiusKm: number
    roles: string
    cuisines: string
    experienceYears: number
    languages: string
    certifications: string
    rateHourlyMin: number
    rateHourlyMax: number
    lastActiveAt: Date
    status: string
    profileCompletenessScore: number
    reliabilityScore: number
    photoUrl: string | null
    bio: string | null
    availability: {
        date: string
        startTime: string
        endTime: string
        isAvailable: boolean
    }[]
}

interface ShiftData {
    roleNeeded: string
    date: string
    startTime: string
    endTime: string
    locationCity: string
    languagesReq: string
    certificationsReq: string
    budgetMin: number | null
    budgetMax: number | null
    urgency: string
}

interface MatchResultOutput {
    chefId: string
    matchScore: number
    matchReasons: string[]
    risks: string[]
    summary: string
}

const ROLE_ADJACENCY: Record<string, string[]> = {
    chef_de_partie: ['sous_chef', 'pastry_chef'],
    sous_chef: ['chef_de_partie', 'executive_chef'],
    executive_chef: ['sous_chef'],
    pastry_chef: ['chef_de_partie'],
    bediening: [],
}

const AMSTERDAM_NEARBY: Record<string, number> = {
    'Amsterdam': 0,
    'Amstelveen': 5,
    'Diemen': 6,
    'Zaandam': 10,
    'Haarlem': 20,
    'Hoofddorp': 15,
    'Schiphol': 12,
    'Aalsmeer': 15,
    'Uithoorn': 20,
    'Purmerend': 18,
    'Hilversum': 30,
    'Utrecht': 40,
    'Leiden': 45,
    'Den Haag': 60,
    'Rotterdam': 75,
    'Almere': 25,
    'Weesp': 12,
    'Muiden': 14,
    'Bussum': 22,
    'Naarden': 20,
}

function estimateDistance(chefCity: string, requestCity: string): number {
    if (chefCity === requestCity) return 0
    const d1 = AMSTERDAM_NEARBY[chefCity]
    const d2 = AMSTERDAM_NEARBY[requestCity]
    if (d1 !== undefined && d2 !== undefined) {
        return Math.abs(d1 - d2) || Math.max(d1, d2)
    }
    if (d1 !== undefined && requestCity === 'Amsterdam') return d1
    if (d2 !== undefined && chefCity === 'Amsterdam') return d2
    return 50 // unknown, assume far
}

function timeOverlap(
    aStart: string, aEnd: string,
    bStart: string, bEnd: string
): boolean {
    const toMin = (t: string) => {
        const [h, m] = t.split(':').map(Number)
        return h * 60 + m
    }
    const aS = toMin(aStart), aE = toMin(aEnd)
    const bS = toMin(bStart), bE = toMin(bEnd)
    return aS <= bS && aE >= bE
}

export function matchChefs(
    chefs: ChefData[],
    shift: ShiftData,
    weights?: { reliability?: number; rate?: number; distance?: number }
): MatchResultOutput[] {
    const w = {
        reliability: weights?.reliability ?? 1.0,
        rate: weights?.rate ?? 1.0,
        distance: weights?.distance ?? 1.0,
    }

    const reqLanguages = parseJsonArray(shift.languagesReq)
    const reqCerts = parseJsonArray(shift.certificationsReq)

    const scored = chefs.map(chef => {
        let score = 0
        const reasons: string[] = []
        const risks: string[] = []

        const chefRoles = parseJsonArray(chef.roles)
        const chefLanguages = parseJsonArray(chef.languages)
        const chefCerts = parseJsonArray(chef.certifications)

        // ---- Availability (hard gate for non-urgent) ----
        const hasAvailability = chef.availability.some(
            a => a.date === shift.date && a.isAvailable && timeOverlap(a.startTime, a.endTime, shift.startTime, shift.endTime)
        )

        if (chef.status === 'inactive' && shift.urgency !== 'urgent') {
            return null // skip inactive for normal requests
        }

        if (hasAvailability) {
            score += 25
            reasons.push('Beschikbaar op de gevraagde datum en tijd')
        } else if (chef.status === 'active') {
            score += 5
            risks.push('Geen beschikbaarheid ingevoerd voor deze datum')
        } else if (chef.status === 'warm') {
            score += 3
            risks.push('Warm lead – beschikbaarheid onbekend, kan worden gecontacteerd')
        } else if (shift.urgency === 'urgent' && chef.status === 'inactive') {
            score += 1
            risks.push('Inactief profiel – alleen overwegen bij urgentie')
        }

        // ---- Role match ----
        if (chefRoles.includes(shift.roleNeeded)) {
            score += 30
            reasons.push(`Exacte rol match: ${shift.roleNeeded.replace(/_/g, ' ')}`)
        } else {
            const adjacent = ROLE_ADJACENCY[shift.roleNeeded] || []
            const hasAdjacent = chefRoles.some(r => adjacent.includes(r))
            if (hasAdjacent) {
                score += 15
                reasons.push('Aangrenzende rol ervaring')
                risks.push('Geen exacte rol match')
            } else {
                risks.push('Geen matching rol')
                score -= 10
            }
        }

        // ---- Location/distance ----
        const dist = estimateDistance(chef.city, shift.locationCity)
        if (dist === 0) {
            score += Math.round(15 * w.distance)
            reasons.push(`Zelfde stad: ${chef.city}`)
        } else if (dist <= chef.radiusKm) {
            score += Math.round(10 * w.distance)
            reasons.push(`Binnen reisafstand (${dist} km)`)
        } else {
            score -= Math.round(20 * w.distance)
            risks.push(`Buiten gewenste reisafstand (${dist} km, max ${chef.radiusKm} km)`)
        }

        // ---- Languages ----
        if (reqLanguages.length > 0) {
            const match = reqLanguages.every(l => chefLanguages.includes(l))
            if (match) {
                score += 10
                reasons.push(`Spreekt gevraagde talen: ${reqLanguages.join(', ')}`)
            } else {
                const missing = reqLanguages.filter(l => !chefLanguages.includes(l))
                risks.push(`Mist taal: ${missing.join(', ')}`)
                score -= 5
            }
        }

        // ---- Certifications ----
        if (reqCerts.length > 0) {
            const match = reqCerts.every(c => chefCerts.includes(c))
            if (match) {
                score += 10
                reasons.push(`Heeft vereiste certificeringen: ${reqCerts.join(', ')}`)
            } else {
                const missing = reqCerts.filter(c => !chefCerts.includes(c))
                risks.push(`Mist certificering: ${missing.join(', ')}`)
                score -= 5
            }
        }

        // ---- Reliability ----
        const relScore = Math.round((chef.reliabilityScore / 100) * 10 * w.reliability)
        score += relScore
        if (chef.reliabilityScore >= 80) {
            reasons.push(`Hoge betrouwbaarheid (${chef.reliabilityScore}%)`)
        } else if (chef.reliabilityScore < 50) {
            risks.push(`Lage betrouwbaarheidsscore (${chef.reliabilityScore}%)`)
        }

        // ---- Profile completeness ----
        if (chef.profileCompletenessScore >= 80) {
            score += 5
        } else if (chef.profileCompletenessScore < 50) {
            score -= 5
            risks.push(`Profiel onvolledig (${chef.profileCompletenessScore}%)`)
        }

        // ---- Rate within budget ----
        if (shift.budgetMax) {
            if (chef.rateHourlyMin <= shift.budgetMax) {
                score += Math.round(8 * w.rate)
                reasons.push(`Tarief past binnen budget (€${chef.rateHourlyMin}-${chef.rateHourlyMax}/u)`)
            } else {
                score -= Math.round(10 * w.rate)
                risks.push(`Tarief boven budget (€${chef.rateHourlyMin}/u min, budget max €${shift.budgetMax}/u)`)
            }
        }

        // ---- Experience bonus ----
        if (chef.experienceYears >= 10) {
            score += 5
            reasons.push(`Ervaren professional (${chef.experienceYears} jaar)`)
        } else if (chef.experienceYears >= 5) {
            score += 3
        }

        // ---- Last active penalty ----
        const daysSinceActive = Math.floor(
            (Date.now() - new Date(chef.lastActiveAt).getTime()) / (1000 * 60 * 60 * 24)
        )
        if (daysSinceActive > 90) {
            risks.push(`Laatst actief ${daysSinceActive} dagen geleden`)
            score -= 5
        } else if (daysSinceActive > 30) {
            risks.push(`Laatst actief ${daysSinceActive} dagen geleden`)
            score -= 2
        }

        // Clamp score
        score = Math.max(0, Math.min(100, score))

        // Generate summary in Dutch
        const summary = generateSummary(chef, score, reasons, risks)

        return {
            chefId: chef.id,
            matchScore: score,
            matchReasons: reasons,
            risks,
            summary,
        }
    }).filter(Boolean) as MatchResultOutput[]

    // Sort by score descending, take top 10
    scored.sort((a, b) => b.matchScore - a.matchScore)
    return scored.slice(0, 10)
}

function generateSummary(
    chef: ChefData,
    score: number,
    reasons: string[],
    risks: string[]
): string {
    const chefRoles = parseJsonArray(chef.roles)
    const roleStr = chefRoles.map(r => r.replace(/_/g, ' ')).join(', ')

    let summary = `${chef.firstName} ${chef.lastName} is een ${roleStr} uit ${chef.city} met ${chef.experienceYears} jaar ervaring.`

    if (score >= 70) {
        summary += ` Sterke match op basis van ${reasons.slice(0, 2).join(' en ').toLowerCase()}.`
    } else if (score >= 40) {
        summary += ` Mogelijke match, maar let op: ${risks.slice(0, 2).join('; ').toLowerCase()}.`
    } else {
        summary += ` Beperkte match. ${risks.slice(0, 2).join('. ')}.`
    }

    return summary
}
