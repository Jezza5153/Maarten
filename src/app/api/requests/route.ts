import { NextRequest, NextResponse } from 'next/server'
import { mockDb, shiftRequests } from '@/lib/mock-data'

export async function POST(req: NextRequest) {
    try {
        const body = await req.json()

        // For the prototype, generate a mock request ID and return mock matches
        const mockRequestId = 'sr-new-' + Date.now()

        // Find matching chefs from mock data
        const chefs = mockDb.chef.findMany({ where: { status: { in: ['active', 'warm'] } } })
        const roleMatches = chefs.filter(c => {
            const roles = JSON.parse(c.roles) as string[]
            return roles.includes(body.roleNeeded)
        }).slice(0, 10)

        // Create mock match results with scores
        const matches = roleMatches.map((chef, i) => {
            const score = Math.max(20, Math.min(95, 65 + chef.reliabilityScore / 10 + (chef.city === 'Amsterdam' ? 8 : 0) - i * 4))
            return {
                id: `match-${mockRequestId}-${i}`,
                shiftRequestId: mockRequestId,
                chefId: chef.id,
                matchScore: Math.round(score),
                matchReasons: JSON.stringify([
                    `Exacte rol match: ${body.roleNeeded?.replace(/_/g, ' ')}`,
                    chef.city === (body.locationCity || 'Amsterdam') ? 'Zelfde stad' : 'Binnen reisafstand',
                    `${chef.experienceYears} jaar ervaring`,
                ]),
                risks: JSON.stringify(
                    chef.profileCompletenessScore < 60 ? [`Profiel onvolledig (${chef.profileCompletenessScore}%)`] : []
                ),
                summary: `${chef.firstName} ${chef.lastName} is een ${body.roleNeeded?.replace(/_/g, ' ')} uit ${chef.city} met ${chef.experienceYears} jaar ervaring. ${score >= 60 ? 'Sterke match.' : 'Mogelijke match.'}`,
                status: 'pending',
                chef,
            }
        })

        // Store in memory (add to shiftRequests for this session)
        const newRequest = {
            id: mockRequestId,
            hotelCompanyId: 'h-new',
            roleNeeded: body.roleNeeded || 'chef_de_partie',
            date: body.date || '2026-03-15',
            startTime: body.startTime || '08:00',
            endTime: body.endTime || '16:00',
            locationCity: body.locationCity || 'Amsterdam',
            languagesReq: JSON.stringify(body.languages || ['NL', 'EN']),
            certificationsReq: JSON.stringify(body.certifications || ['HACCP']),
            dressCode: body.dressCode || null,
            specialNotes: body.specialNotes || null,
            budgetMin: body.budgetMin ? parseFloat(body.budgetMin) : null,
            budgetMax: body.budgetMax ? parseFloat(body.budgetMax) : null,
            urgency: body.urgency || 'normal',
            status: 'shortlist_sent',
            createdAt: new Date(),
            hotelCompany: {
                id: 'h-new',
                name: body.companyName || 'Nieuw Hotel',
                kvkNumber: body.kvkNumber || '00000000',
                address: '',
                city: body.locationCity || 'Amsterdam',
                contactName: body.contactName || '',
                contactEmail: body.contactEmail || '',
                contactPhone: body.contactPhone || null,
                billingEmail: null,
            },
            matchResults: matches,
        }

        // Add to in-memory array so the confirmation page can find it
        shiftRequests.push(newRequest)

        return NextResponse.json({ requestId: mockRequestId, matchCount: matches.length })
    } catch (error) {
        console.error('Request creation error:', error)
        return NextResponse.json({ error: 'Er ging iets mis' }, { status: 500 })
    }
}

export async function GET() {
    return NextResponse.json(shiftRequests)
}
