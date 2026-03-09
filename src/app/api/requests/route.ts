import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { matchChefs } from '@/lib/match-engine'

export async function POST(req: NextRequest) {
    try {
        const body = await req.json()

        // Create or find hotel company
        let hotel = await prisma.hotelCompany.findFirst({
            where: { kvkNumber: body.kvkNumber },
        })

        if (!hotel) {
            hotel = await prisma.hotelCompany.create({
                data: {
                    name: body.companyName,
                    kvkNumber: body.kvkNumber,
                    address: '',
                    city: body.locationCity || 'Amsterdam',
                    contactName: body.contactName,
                    contactEmail: body.contactEmail,
                    contactPhone: body.contactPhone || null,
                },
            })
        }

        // Create shift request
        const request = await prisma.shiftRequest.create({
            data: {
                hotelCompanyId: hotel.id,
                roleNeeded: body.roleNeeded,
                date: body.date,
                startTime: body.startTime,
                endTime: body.endTime,
                locationCity: body.locationCity || 'Amsterdam',
                languagesReq: JSON.stringify(body.languages || []),
                certificationsReq: JSON.stringify(body.certifications || []),
                dressCode: body.dressCode || null,
                specialNotes: body.specialNotes || null,
                budgetMin: body.budgetMin ? parseFloat(body.budgetMin) : null,
                budgetMax: body.budgetMax ? parseFloat(body.budgetMax) : null,
                urgency: body.urgency || 'normal',
                status: 'matching',
            },
        })

        // Run matching
        const chefs = await prisma.chef.findMany({
            include: { availability: true },
        })

        const matches = matchChefs(chefs, {
            roleNeeded: request.roleNeeded,
            date: request.date,
            startTime: request.startTime,
            endTime: request.endTime,
            locationCity: request.locationCity,
            languagesReq: request.languagesReq,
            certificationsReq: request.certificationsReq,
            budgetMin: request.budgetMin,
            budgetMax: request.budgetMax,
            urgency: request.urgency,
        })

        // Save match results
        for (const match of matches) {
            await prisma.matchResult.create({
                data: {
                    shiftRequestId: request.id,
                    chefId: match.chefId,
                    matchScore: match.matchScore,
                    matchReasons: JSON.stringify(match.matchReasons),
                    risks: JSON.stringify(match.risks),
                    summary: match.summary,
                },
            })
        }

        // Update request status
        await prisma.shiftRequest.update({
            where: { id: request.id },
            data: { status: 'shortlist_sent' },
        })

        return NextResponse.json({ requestId: request.id, matchCount: matches.length })
    } catch (error) {
        console.error('Request creation error:', error)
        return NextResponse.json({ error: 'Er ging iets mis' }, { status: 500 })
    }
}

export async function GET() {
    try {
        const requests = await prisma.shiftRequest.findMany({
            include: {
                hotelCompany: true,
                matchResults: { include: { chef: true } },
            },
            orderBy: { createdAt: 'desc' },
        })
        return NextResponse.json(requests)
    } catch (error) {
        console.error('Error fetching requests:', error)
        return NextResponse.json({ error: 'Er ging iets mis' }, { status: 500 })
    }
}
