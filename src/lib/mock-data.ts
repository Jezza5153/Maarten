// Mock data layer — replaces Prisma for static prototype deployment

export interface Chef {
    id: string
    firstName: string
    lastName: string
    slug: string
    email: string
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
    bio: string | null
    photoUrl: string | null
    notesInternal: string | null
    availability: ChefAvailability[]
}

export interface ChefAvailability {
    id: string
    chefId: string
    date: string
    startTime: string
    endTime: string
    isAvailable: boolean
}

export interface HotelCompany {
    id: string
    name: string
    kvkNumber: string
    address: string
    city: string
    contactName: string
    contactEmail: string
    contactPhone: string | null
    billingEmail: string | null
}

export interface ShiftRequest {
    id: string
    hotelCompanyId: string
    roleNeeded: string
    date: string
    startTime: string
    endTime: string
    locationCity: string
    languagesReq: string
    certificationsReq: string
    dressCode: string | null
    specialNotes: string | null
    budgetMin: number | null
    budgetMax: number | null
    urgency: string
    status: string
    createdAt: Date
    hotelCompany: HotelCompany
    matchResults: MatchResult[]
}

export interface MatchResult {
    id: string
    shiftRequestId: string
    chefId: string
    matchScore: number
    matchReasons: string
    risks: string
    summary: string | null
    status: string
    chef: Chef
}

// --- Seed-like generated mock data ---

const FIRST_NAMES = ['Jan', 'Pieter', 'Willem', 'Bas', 'Daan', 'Lars', 'Sven', 'Sophie', 'Eva', 'Lisa', 'Sarah', 'Maria', 'Fleur', 'Julia', 'Emma', 'Hassan', 'Youssef', 'Pierre', 'Giovanni', 'Marco', 'Thomas', 'Jeroen', 'Wouter', 'Koen', 'Anne', 'Anouk', 'Femke', 'Sanne', 'Lotte', 'Roos', 'Ali', 'Omar', 'Claude', 'Michel', 'Luca', 'Giuseppe', 'Piotr', 'Tomasz', 'Daniel', 'Martin']
const LAST_NAMES = ['De Jong', 'Jansen', 'De Vries', 'Van den Berg', 'Van Dijk', 'Bakker', 'Visser', 'Smit', 'Meijer', 'De Boer', 'Mulder', 'De Groot', 'Bos', 'Vos', 'Peters', 'Hendriks', 'Dekker', 'Brouwer', 'De Wit', 'Dijkstra', 'Kok', 'Jacobs', 'Vermeer', 'Schouten', 'Maas', 'Prins', 'Blom', 'Huisman', 'Kramer', 'Scholten']
const CITIES = ['Amsterdam', 'Amsterdam', 'Amsterdam', 'Amsterdam', 'Amstelveen', 'Haarlem', 'Zaandam', 'Hoofddorp', 'Diemen', 'Utrecht', 'Hilversum', 'Almere', 'Leiden', 'Purmerend', 'Aalsmeer']
const ROLES = ['chef_de_partie', 'sous_chef', 'executive_chef', 'pastry_chef', 'bediening']
const CUISINES = ['Frans', 'Italiaans', 'Aziatisch', 'Fine Dining', 'Banqueting', 'Ontbijt', 'Nederlandse keuken', 'Fusion', 'Mediterraans', 'Internationaal', 'Patisserie']
const CERTS = ['HACCP', 'SVH', 'BHV', 'Sociale Hygiëne', 'EHBO']
const BIOS = [
    'Ervaren keukenmedewerker met een passie voor seizoensgebonden ingrediënten.',
    'Gespecialiseerd in hoog-volume banqueting voor internationale hotels.',
    'Flexibele professional, beschikbaar voor korte en lange opdrachten.',
    'Creatieve kok met ervaring in fine dining en à la carte.',
    'Betrouwbare kracht met uitstekende referenties uit de Amsterdamse hotelbranche.',
    'Specialist in patisserie en desserts voor evenementen.',
    'All-round keukenprofessional met leidinggevende ervaring.',
    'Snel inzetbaar en gewend aan wisselende werkomgevingen.',
]

function seededRandom(seed: number) {
    let s = seed
    return () => { s = (s * 16807) % 2147483647; return (s - 1) / 2147483646 }
}

function generateChefs(): Chef[] {
    const chefs: Chef[] = []
    const rand = seededRandom(42)
    const pick = <T,>(arr: T[]) => arr[Math.floor(rand() * arr.length)]
    const pickN = <T,>(arr: T[], min: number, max: number) => {
        const n = min + Math.floor(rand() * (max - min + 1))
        const shuffled = [...arr].sort(() => rand() - 0.5)
        return shuffled.slice(0, Math.min(n, arr.length))
    }
    const randInt = (min: number, max: number) => min + Math.floor(rand() * (max - min + 1))

    for (let i = 0; i < 840; i++) {
        const firstName = pick(FIRST_NAMES)
        const lastName = pick(LAST_NAMES)
        const r = rand()
        const status = r < 0.4 ? 'inactive' : r < 0.75 ? 'warm' : 'active'
        const roles = pickN(ROLES, 1, rand() > 0.6 ? 2 : 1)
        const cuisines = pickN(CUISINES, 1, 3)
        const languages = ['NL', ...(rand() > 0.3 ? ['EN'] : []), ...(rand() > 0.8 ? ['DE'] : [])]
        const certs = pickN(CERTS, 0, 2)
        const rateMin = randInt(22, 45)
        const expYears = randInt(1, 25)
        const completeness = status === 'active' ? randInt(65, 100) : status === 'warm' ? randInt(35, 80) : randInt(10, 55)
        const reliability = status === 'active' ? randInt(60, 100) : status === 'warm' ? randInt(40, 85) : randInt(20, 70)

        const today = new Date()
        const availability: ChefAvailability[] = []
        if (status !== 'inactive') {
            const numDays = status === 'active' ? randInt(3, 10) : randInt(0, 4)
            for (let d = 0; d < numDays; d++) {
                const date = new Date(today.getTime() + randInt(0, 21) * 86400000)
                const startHour = pick([6, 7, 8, 9, 10, 14, 15, 16])
                const endHour = Math.min(startHour + pick([4, 6, 8, 10]), 23)
                availability.push({
                    id: `avail-${i}-${d}`,
                    chefId: `chef-${i}`,
                    date: date.toISOString().split('T')[0],
                    startTime: `${startHour.toString().padStart(2, '0')}:00`,
                    endTime: `${endHour.toString().padStart(2, '0')}:00`,
                    isAvailable: rand() > 0.15,
                })
            }
        }

        const daysAgo = status === 'active' ? randInt(0, 14) : status === 'warm' ? randInt(15, 60) : randInt(61, 365)

        chefs.push({
            id: `chef-${i}`,
            firstName,
            lastName,
            slug: `${firstName.toLowerCase()}-${lastName.toLowerCase().replace(/\s/g, '-')}-${i}`,
            email: `chef${i}@example.nl`,
            city: pick(CITIES),
            radiusKm: pick([10, 15, 20, 25, 30]),
            roles: JSON.stringify(roles),
            cuisines: JSON.stringify(cuisines),
            experienceYears: expYears,
            languages: JSON.stringify(languages),
            certifications: JSON.stringify(certs),
            rateHourlyMin: rateMin,
            rateHourlyMax: rateMin + randInt(5, 20),
            lastActiveAt: new Date(today.getTime() - daysAgo * 86400000),
            status,
            profileCompletenessScore: completeness,
            reliabilityScore: reliability,
            bio: rand() > 0.3 ? pick(BIOS) : null,
            photoUrl: null,
            notesInternal: null,
            availability,
        })
    }
    return chefs
}

const allChefs = generateChefs()

export const hotels: HotelCompany[] = [
    { id: 'h1', name: 'Grand Hotel Krasnapolsky', kvkNumber: '34100281', address: 'Dam 9', city: 'Amsterdam', contactName: 'Peter van der Berg', contactEmail: 'peter@krasnapolsky.nl', contactPhone: '+31 20 554 9111', billingEmail: 'finance@krasnapolsky.nl' },
    { id: 'h2', name: 'Hotel de Grachten', kvkNumber: '56234891', address: 'Herengracht 341', city: 'Amsterdam', contactName: 'Marieke Jansen', contactEmail: 'marieke@grachten.nl', contactPhone: '+31 20 623 4567', billingEmail: 'finance@grachten.nl' },
    { id: 'h3', name: 'Amstel Waterfront Hotel', kvkNumber: '67345902', address: 'Amstel 1', city: 'Amsterdam', contactName: 'Thomas Bakker', contactEmail: 'thomas@amstelwaterfront.nl', contactPhone: '+31 20 520 3456', billingEmail: null },
    { id: 'h4', name: 'Vondelpark Residence Hotel', kvkNumber: '78456013', address: 'Vondelstraat 78', city: 'Amsterdam', contactName: 'Sophie de Vries', contactEmail: 'sophie@vondelpark.nl', contactPhone: null, billingEmail: null },
    { id: 'h5', name: 'Harbour Tower Amsterdam', kvkNumber: '89567124', address: 'IJdok 12', city: 'Amsterdam', contactName: 'Lars Visser', contactEmail: 'lars@harbourtower.nl', contactPhone: '+31 20 531 7890', billingEmail: null },
    { id: 'h6', name: 'Het Concertgebouw Hotel', kvkNumber: '90678235', address: 'Museumplein 25', city: 'Amsterdam', contactName: 'Eva Meijer', contactEmail: 'eva@concertgebouwhotel.nl', contactPhone: null, billingEmail: null },
    { id: 'h7', name: 'Canal House International', kvkNumber: '11789346', address: 'Keizersgracht 148', city: 'Amsterdam', contactName: 'Jeroen Mulder', contactEmail: 'jeroen@canalhouse.nl', contactPhone: null, billingEmail: null },
    { id: 'h8', name: 'RAI Convention Hotel', kvkNumber: '22890457', address: 'Europaplein 30', city: 'Amsterdam', contactName: 'Fleur de Groot', contactEmail: 'fleur@raihotel.nl', contactPhone: null, billingEmail: null },
    { id: 'h9', name: 'Zuidas Business Hotel', kvkNumber: '33901568', address: 'Gustav Mahlerlaan 10', city: 'Amsterdam', contactName: 'Wouter Smit', contactEmail: 'wouter@zuidashotel.nl', contactPhone: null, billingEmail: null },
    { id: 'h10', name: 'Jordaan Boutique Hotel', kvkNumber: '44012679', address: 'Prinsengracht 450', city: 'Amsterdam', contactName: 'Sanne Dekker', contactEmail: 'sanne@jordaanhotel.nl', contactPhone: null, billingEmail: null },
]

// Pre-generate match results for sample requests
function generateMatches(requestId: string, roleNeeded: string): MatchResult[] {
    const matching = allChefs
        .filter(c => c.status !== 'inactive')
        .filter(c => {
            const roles = JSON.parse(c.roles) as string[]
            return roles.includes(roleNeeded)
        })
        .sort((a, b) => b.reliabilityScore - a.reliabilityScore)
        .slice(0, 10)

    return matching.map((chef, i) => {
        const roles = JSON.parse(chef.roles) as string[]
        const score = Math.max(20, Math.min(95, 50 + chef.reliabilityScore / 5 + (chef.city === 'Amsterdam' ? 10 : 0) - i * 3))
        const reasons = [
            roles.includes(roleNeeded) ? `Exacte rol match: ${roleNeeded.replace(/_/g, ' ')}` : 'Aangrenzende rol',
            chef.city === 'Amsterdam' ? 'Zelfde stad: Amsterdam' : `Binnen reisafstand`,
            `Ervaren professional (${chef.experienceYears} jaar)`,
        ]
        const risks: string[] = []
        if (chef.profileCompletenessScore < 60) risks.push(`Profiel onvolledig (${chef.profileCompletenessScore}%)`)
        if (chef.status === 'warm') risks.push('Warm lead – beschikbaarheid onbekend')

        return {
            id: `match-${requestId}-${i}`,
            shiftRequestId: requestId,
            chefId: chef.id,
            matchScore: Math.round(score),
            matchReasons: JSON.stringify(reasons),
            risks: JSON.stringify(risks),
            summary: `${chef.firstName} ${chef.lastName} is een ${roleNeeded.replace(/_/g, ' ')} uit ${chef.city} met ${chef.experienceYears} jaar ervaring. ${score >= 60 ? 'Sterke match.' : 'Mogelijke match.'}`,
            status: 'pending',
            chef,
        }
    })
}

export const shiftRequests: ShiftRequest[] = [
    { id: 'sr1', hotelCompanyId: 'h1', roleNeeded: 'sous_chef', date: '2026-03-15', startTime: '07:00', endTime: '15:00', locationCity: 'Amsterdam', languagesReq: '["NL","EN"]', certificationsReq: '["HACCP"]', dressCode: null, specialNotes: null, budgetMin: 30, budgetMax: 45, urgency: 'normal', status: 'matching', createdAt: new Date('2026-03-09'), hotelCompany: hotels[0], matchResults: [] },
    { id: 'sr2', hotelCompanyId: 'h2', roleNeeded: 'chef_de_partie', date: '2026-03-12', startTime: '10:00', endTime: '22:00', locationCity: 'Amsterdam', languagesReq: '["NL","EN"]', certificationsReq: '["HACCP"]', dressCode: null, specialNotes: null, budgetMin: 25, budgetMax: 40, urgency: 'urgent', status: 'new', createdAt: new Date('2026-03-09'), hotelCompany: hotels[1], matchResults: [] },
    { id: 'sr3', hotelCompanyId: 'h3', roleNeeded: 'pastry_chef', date: '2026-03-20', startTime: '06:00', endTime: '14:00', locationCity: 'Amsterdam', languagesReq: '["NL"]', certificationsReq: '["HACCP"]', dressCode: null, specialNotes: null, budgetMin: 28, budgetMax: 42, urgency: 'normal', status: 'new', createdAt: new Date('2026-03-08'), hotelCompany: hotels[2], matchResults: [] },
    { id: 'sr4', hotelCompanyId: 'h4', roleNeeded: 'executive_chef', date: '2026-03-18', startTime: '08:00', endTime: '20:00', locationCity: 'Amsterdam', languagesReq: '["NL","EN"]', certificationsReq: '["HACCP","SVH"]', dressCode: null, specialNotes: 'Ervaring met fine dining vereist', budgetMin: 40, budgetMax: 60, urgency: 'normal', status: 'shortlist_sent', createdAt: new Date('2026-03-07'), hotelCompany: hotels[3], matchResults: [] },
    { id: 'sr5', hotelCompanyId: 'h5', roleNeeded: 'bediening', date: '2026-03-14', startTime: '16:00', endTime: '23:00', locationCity: 'Amsterdam', languagesReq: '["NL","EN"]', certificationsReq: '[]', dressCode: 'Zwarte broek en wit overhemd', specialNotes: null, budgetMin: 22, budgetMax: 32, urgency: 'urgent', status: 'new', createdAt: new Date('2026-03-09'), hotelCompany: hotels[4], matchResults: [] },
    { id: 'sr6', hotelCompanyId: 'h6', roleNeeded: 'chef_de_partie', date: '2026-03-22', startTime: '07:00', endTime: '16:00', locationCity: 'Amsterdam', languagesReq: '["NL"]', certificationsReq: '["HACCP"]', dressCode: null, specialNotes: null, budgetMin: 25, budgetMax: 38, urgency: 'normal', status: 'new', createdAt: new Date('2026-03-08'), hotelCompany: hotels[5], matchResults: [] },
]

// Attach matches
shiftRequests.forEach(sr => {
    sr.matchResults = generateMatches(sr.id, sr.roleNeeded)
})

// --- Mock "database" functions ---
export const mockDb = {
    chef: {
        findMany: (opts?: { where?: any; orderBy?: any; take?: number; include?: any }) => {
            let result = [...allChefs]
            if (opts?.where?.status) {
                if (typeof opts.where.status === 'string') result = result.filter(c => c.status === opts.where.status)
                else if (opts.where.status.in) result = result.filter(c => opts.where.status.in.includes(c.status))
            }
            if (opts?.orderBy) {
                const key = Object.keys(opts.orderBy)[0] as keyof Chef
                const dir = Object.values(opts.orderBy)[0] as string
                result.sort((a, b) => {
                    const av = a[key] as any, bv = b[key] as any
                    return dir === 'desc' ? (bv > av ? 1 : -1) : (av > bv ? 1 : -1)
                })
            }
            if (opts?.take) result = result.slice(0, opts.take)
            return result
        },
        findUnique: (opts: { where: { slug?: string; id?: string }; include?: any }) => {
            if (opts.where.slug) return allChefs.find(c => c.slug === opts.where.slug) || null
            if (opts.where.id) return allChefs.find(c => c.id === opts.where.id) || null
            return null
        },
        findFirst: (opts?: { where?: any; include?: any }) => {
            let result = allChefs
            if (opts?.where?.status) result = result.filter(c => c.status === opts.where.status)
            return result[0] || null
        },
        count: (opts?: { where?: any }) => {
            if (!opts?.where) return allChefs.length
            if (opts.where.status) {
                if (typeof opts.where.status === 'string') return allChefs.filter(c => c.status === opts.where.status).length
                if (opts.where.status.in) return allChefs.filter(c => opts.where.status.in.includes(c.status)).length
            }
            return allChefs.length
        },
    },
    shiftRequest: {
        findMany: (opts?: { include?: any; orderBy?: any }) => {
            return [...shiftRequests].sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
        },
        findUnique: (opts: { where: { id: string }; include?: any }) => {
            return shiftRequests.find(r => r.id === opts.where.id) || null
        },
    },
    hotelCompany: {
        findFirst: (opts: { where: any }) => {
            if (opts.where.kvkNumber) return hotels.find(h => h.kvkNumber === opts.where.kvkNumber) || null
            return null
        },
    },
}
