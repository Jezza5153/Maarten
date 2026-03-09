import { PrismaClient } from '@prisma/client'
import { PrismaBetterSqlite3 } from '@prisma/adapter-better-sqlite3'

const adapter = new PrismaBetterSqlite3({ url: 'file:./dev.db' })
const prisma = new PrismaClient({ adapter } as any)

// ---- Name data ----
const DUTCH_FIRST_NAMES = [
    'Jan', 'Pieter', 'Willem', 'Bas', 'Daan', 'Lars', 'Sven', 'Joris', 'Thijs', 'Ruben',
    'Thomas', 'Max', 'Luuk', 'Bram', 'Niels', 'Jeroen', 'Wouter', 'Koen', 'Tim', 'Stijn',
    'Marco', 'Dennis', 'Erik', 'Martijn', 'Stefan', 'Jos', 'Rik', 'Dave', 'Kevin', 'Patrick',
    'Anne', 'Sophie', 'Eva', 'Lisa', 'Sarah', 'Maria', 'Fleur', 'Julia', 'Emma', 'Iris',
    'Linda', 'Nicole', 'Anouk', 'Femke', 'Marloes', 'Sanne', 'Nienke', 'Lotte', 'Merel', 'Roos',
    'Hassan', 'Mohammed', 'Youssef', 'Ali', 'Omar', 'Fatima', 'Aisha', 'Leila', 'Nadia', 'Karim',
    'Pierre', 'Jean', 'Claude', 'Michel', 'Antoine', 'Marie', 'Céline', 'Isabelle', 'François', 'Laurent',
    'Giovanni', 'Marco', 'Alessandro', 'Luca', 'Giuseppe', 'Sofia', 'Giulia', 'Elena', 'Valentina', 'Lucia',
    'Piotr', 'Andrzej', 'Tomasz', 'Katarzyna', 'Anna', 'Marta', 'Agnieszka', 'Magdalena', 'Robert', 'Krzysztof',
    'Daniel', 'Martin', 'Victor', 'Adrian', 'Carlos', 'Diego', 'Pablo', 'Rosa', 'Carmen', 'Miguel',
]

const DUTCH_LAST_NAMES = [
    'De Jong', 'Jansen', 'De Vries', 'Van den Berg', 'Van Dijk', 'Bakker', 'Janssen', 'Visser',
    'Smit', 'Meijer', 'De Boer', 'Mulder', 'De Groot', 'Bos', 'Vos', 'Peters', 'Hendriks',
    'Van Leeuwen', 'Dekker', 'Brouwer', 'De Wit', 'Dijkstra', 'Smits', 'De Graaf', 'Van der Meer',
    'Van der Linden', 'Kok', 'Jacobs', 'De Haan', 'Vermeer', 'Van den Heuvel', 'Van der Veen',
    'Van den Broek', 'De Bruijn', 'De Bruin', 'Van der Heijden', 'Schouten', 'Van Beek', 'Willems',
    'Van Vliet', 'Van de Ven', 'Hoekstra', 'Maas', 'Verhoeven', 'Koster', 'Van Dam', 'Van der Wal',
    'Prins', 'Blom', 'Huisman', 'Peeters', 'De Jonge', 'Kuijpers', 'Van Wijk', 'Post', 'Kuiper',
    'Veenstra', 'Kramer', 'Van den Brink', 'Scholten', 'Van Hout', 'Willekens', 'Teunissen',
    'Nowak', 'Kowalski', 'Wiśniewski', 'Rossi', 'Ferrari', 'Bianchi', 'Dupont', 'Martin',
    'Bernard', 'García', 'Hernández', 'López', 'Schmidt', 'Weber', 'Müller', 'Andersen',
]

const CITIES = [
    { name: 'Amsterdam', weight: 40 },
    { name: 'Amstelveen', weight: 8 },
    { name: 'Haarlem', weight: 7 },
    { name: 'Zaandam', weight: 5 },
    { name: 'Hoofddorp', weight: 5 },
    { name: 'Diemen', weight: 4 },
    { name: 'Aalsmeer', weight: 3 },
    { name: 'Purmerend', weight: 3 },
    { name: 'Hilversum', weight: 4 },
    { name: 'Utrecht', weight: 6 },
    { name: 'Almere', weight: 4 },
    { name: 'Leiden', weight: 3 },
    { name: 'Den Haag', weight: 3 },
    { name: 'Rotterdam', weight: 3 },
    { name: 'Weesp', weight: 1 },
    { name: 'Bussum', weight: 1 },
]

const ROLES = ['chef_de_partie', 'sous_chef', 'executive_chef', 'pastry_chef', 'bediening']
const ROLE_WEIGHTS = [30, 25, 10, 15, 20]

const CUISINES = [
    'Frans', 'Italiaans', 'Aziatisch', 'Fine Dining', 'Banqueting',
    'Ontbijt', 'Nederlandse keuken', 'Fusion', 'Mediterraans', 'Internationaal',
    'Japans', 'Indonesisch', 'Mexicaans', 'Vegetarisch', 'Patisserie',
]

const CERTIFICATIONS = ['HACCP', 'SVH', 'BHV', 'Sociale Hygiëne', 'EHBO', 'Allergenen']

const LANGUAGES_POOL = ['NL', 'EN', 'DE', 'FR', 'ES', 'PL', 'IT']

// ---- Helpers ----
function randomInt(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min
}

function pick<T>(arr: T[]): T {
    return arr[Math.floor(Math.random() * arr.length)]
}

function pickWeighted(items: string[], weights: number[]): string {
    const total = weights.reduce((a, b) => a + b, 0)
    let r = Math.random() * total
    for (let i = 0; i < items.length; i++) {
        r -= weights[i]
        if (r <= 0) return items[i]
    }
    return items[items.length - 1]
}

function pickN<T>(arr: T[], min: number, max: number): T[] {
    const n = randomInt(min, max)
    const shuffled = [...arr].sort(() => Math.random() - 0.5)
    return shuffled.slice(0, Math.min(n, arr.length))
}

function pickCityWeighted(): string {
    const names = CITIES.map(c => c.name)
    const weights = CITIES.map(c => c.weight)
    return pickWeighted(names, weights)
}

function slugify(first: string, last: string, index: number): string {
    const base = `${first}-${last}`.toLowerCase()
        .replace(/[^a-z0-9-]/g, '')
        .replace(/--+/g, '-')
    return `${base}-${index}`
}

function generateStatus(): string {
    const r = Math.random()
    if (r < 0.40) return 'inactive'
    if (r < 0.75) return 'warm'
    return 'active'
}

function generateCompletenessScore(status: string): number {
    if (status === 'active') return randomInt(65, 100)
    if (status === 'warm') return randomInt(35, 80)
    return randomInt(10, 55)
}

function generateReliabilityScore(status: string): number {
    if (status === 'active') return randomInt(60, 100)
    if (status === 'warm') return randomInt(40, 85)
    return randomInt(20, 70)
}

function generateLastActive(status: string): Date {
    const now = new Date()
    if (status === 'active') {
        return new Date(now.getTime() - randomInt(0, 14) * 86400000)
    }
    if (status === 'warm') {
        return new Date(now.getTime() - randomInt(15, 60) * 86400000)
    }
    return new Date(now.getTime() - randomInt(61, 365) * 86400000)
}

function generateAvailability(chefId: string, status: string): Array<{
    chefId: string
    date: string
    startTime: string
    endTime: string
    isAvailable: boolean
}> {
    if (status === 'inactive') return []

    const slots: Array<{
        chefId: string
        date: string
        startTime: string
        endTime: string
        isAvailable: boolean
    }> = []

    const today = new Date()
    const numDays = status === 'active' ? randomInt(3, 14) : randomInt(0, 5)

    for (let i = 0; i < numDays; i++) {
        const date = new Date(today.getTime() + randomInt(0, 21) * 86400000)
        const dateStr = date.toISOString().split('T')[0]

        const startHour = pick([6, 7, 8, 9, 10, 11, 14, 15, 16])
        const duration = pick([4, 6, 8, 10, 12])
        const endHour = Math.min(startHour + duration, 23)

        slots.push({
            chefId,
            date: dateStr,
            startTime: `${startHour.toString().padStart(2, '0')}:00`,
            endTime: `${endHour.toString().padStart(2, '0')}:00`,
            isAvailable: Math.random() > 0.15,
        })
    }

    return slots
}

const BIOS = [
    'Ervaren keukenmedewerker met een passie voor seizoensgebonden ingrediënten.',
    'Gespecialiseerd in hoog-volume banqueting voor internationale hotels.',
    'Flexibele professional, beschikbaar voor korte en lange opdrachten.',
    'Creatieve kok met ervaring in fine dining en à la carte.',
    'Betrouwbare kracht met uitstekende referenties uit de Amsterdamse hotelbranche.',
    'Specialist in patisserie en desserts voor evenementen.',
    'All-round keukenprofessional met leidinggevende ervaring.',
    'Ervaring met dieetwensen, allergenen en speciale menu\'s.',
    'Snel inzetbaar en gewend aan wisselende werkomgevingen.',
    'Sterke communicator met ervaring in multiculturele keukens.',
]

// ---- Seed functions ----
async function seedChefs() {
    console.log('Seeding 840 chefs...')
    const usedSlugs = new Set<string>()
    const usedEmails = new Set<string>()

    for (let i = 0; i < 840; i++) {
        const firstName = pick(DUTCH_FIRST_NAMES)
        const lastName = pick(DUTCH_LAST_NAMES)
        let slug = slugify(firstName, lastName, i)
        while (usedSlugs.has(slug)) { slug = `${slug}-${randomInt(100, 999)}` }
        usedSlugs.add(slug)

        let email = `${firstName.toLowerCase()}.${lastName.toLowerCase().replace(/\s/g, '')}${i}@chef-serve.nl`
        email = email.replace(/[^a-z0-9.@-]/g, '')
        while (usedEmails.has(email)) { email = `chef${randomInt(1000, 9999)}@chef-serve.nl` }
        usedEmails.add(email)

        const status = generateStatus()
        const roleCount = Math.random() > 0.6 ? randomInt(2, 3) : 1
        const roles = pickN(ROLES, 1, roleCount)
        const cuisines = pickN(CUISINES, 1, 4)
        const languages = ['NL', ...pickN(LANGUAGES_POOL.filter(l => l !== 'NL'), 0, 2)]
        const certs = pickN(CERTIFICATIONS, 0, 3)

        const rateMin = randomInt(22, 45)
        const rateMax = rateMin + randomInt(5, 20)

        const chef = await prisma.chef.create({
            data: {
                firstName,
                lastName,
                slug,
                email,
                city: pickCityWeighted(),
                radiusKm: pick([10, 15, 20, 25, 30]),
                roles: JSON.stringify(roles),
                cuisines: JSON.stringify(cuisines),
                experienceYears: randomInt(1, 25),
                languages: JSON.stringify(languages),
                certifications: JSON.stringify(certs),
                rateHourlyMin: rateMin,
                rateHourlyMax: rateMax,
                lastActiveAt: generateLastActive(status),
                status,
                profileCompletenessScore: generateCompletenessScore(status),
                reliabilityScore: generateReliabilityScore(status),
                bio: Math.random() > 0.3 ? pick(BIOS) : null,
                photoUrl: null,
                notesInternal: Math.random() > 0.7 ? 'Goede indruk bij vorig hotel.' : null,
            },
        })

        const avail = generateAvailability(chef.id, status)
        if (avail.length > 0) {
            await prisma.chefAvailability.createMany({ data: avail })
        }

        if ((i + 1) % 100 === 0) console.log(`  ${i + 1}/840 chefs created`)
    }
    console.log('✓ 840 chefs seeded')
}

async function seedHotels() {
    console.log('Seeding 10 hotel companies...')
    const hotels = [
        { name: 'Grand Hotel Krasnapolsky', kvk: '34100281', contact: 'Peter van der Berg', address: 'Dam 9' },
        { name: 'Hotel de Grachten', kvk: '56234891', contact: 'Marieke Jansen', address: 'Herengracht 341' },
        { name: 'Amstel Waterfront Hotel', kvk: '67345902', contact: 'Thomas Bakker', address: 'Amstel 1' },
        { name: 'Vondelpark Residence Hotel', kvk: '78456013', contact: 'Sophie de Vries', address: 'Vondelstraat 78' },
        { name: 'Harbour Tower Amsterdam', kvk: '89567124', contact: 'Lars Visser', address: 'IJdok 12' },
        { name: 'Het Concertgebouw Hotel', kvk: '90678235', contact: 'Eva Meijer', address: 'Museumplein 25' },
        { name: 'Canal House International', kvk: '11789346', contact: 'Jeroen Mulder', address: 'Keizersgracht 148' },
        { name: 'RAI Convention Hotel', kvk: '22890457', contact: 'Fleur de Groot', address: 'Europaplein 30' },
        { name: 'Zuidas Business Hotel', kvk: '33901568', contact: 'Wouter Smit', address: 'Gustav Mahlerlaan 10' },
        { name: 'Jordaan Boutique Hotel', kvk: '44012679', contact: 'Sanne Dekker', address: 'Prinsengracht 450' },
    ]

    for (const h of hotels) {
        await prisma.hotelCompany.create({
            data: {
                name: h.name,
                kvkNumber: h.kvk,
                address: h.address,
                city: 'Amsterdam',
                contactName: h.contact,
                contactEmail: `${h.contact.toLowerCase().replace(/\s/g, '.')}@${h.name.toLowerCase().replace(/[^a-z]/g, '')}.nl`,
                contactPhone: `+31 20 ${randomInt(100, 999)} ${randomInt(1000, 9999)}`,
                billingEmail: `finance@${h.name.toLowerCase().replace(/[^a-z]/g, '')}.nl`,
            },
        })
    }
    console.log('✓ 10 hotels seeded')
}

async function seedShiftRequests() {
    console.log('Seeding sample shift requests...')
    const hotels = await prisma.hotelCompany.findMany()

    const requests = [
        { hotel: 0, role: 'sous_chef', date: '2026-03-15', start: '07:00', end: '15:00', urgency: 'normal', budgetMin: 30, budgetMax: 45 },
        { hotel: 1, role: 'chef_de_partie', date: '2026-03-12', start: '10:00', end: '22:00', urgency: 'urgent', budgetMin: 25, budgetMax: 40 },
        { hotel: 2, role: 'pastry_chef', date: '2026-03-20', start: '06:00', end: '14:00', urgency: 'normal', budgetMin: 28, budgetMax: 42 },
        { hotel: 3, role: 'executive_chef', date: '2026-03-18', start: '08:00', end: '20:00', urgency: 'normal', budgetMin: 40, budgetMax: 60 },
        { hotel: 4, role: 'bediening', date: '2026-03-14', start: '16:00', end: '23:00', urgency: 'urgent', budgetMin: 22, budgetMax: 32 },
        { hotel: 5, role: 'chef_de_partie', date: '2026-03-22', start: '07:00', end: '16:00', urgency: 'normal', budgetMin: 25, budgetMax: 38 },
    ]

    for (const r of requests) {
        await prisma.shiftRequest.create({
            data: {
                hotelCompanyId: hotels[r.hotel].id,
                roleNeeded: r.role,
                date: r.date,
                startTime: r.start,
                endTime: r.end,
                locationCity: 'Amsterdam',
                languagesReq: JSON.stringify(['NL', 'EN']),
                certificationsReq: JSON.stringify(['HACCP']),
                budgetMin: r.budgetMin,
                budgetMax: r.budgetMax,
                urgency: r.urgency,
                status: r === requests[0] ? 'matching' : 'new',
            },
        })
    }
    console.log('✓ 6 shift requests seeded')
}

async function main() {
    console.log('Starting seed...\n')

    // Clear existing data
    await prisma.matchResult.deleteMany()
    await prisma.chefAvailability.deleteMany()
    await prisma.shiftRequest.deleteMany()
    await prisma.hotelCompany.deleteMany()
    await prisma.chef.deleteMany()

    await seedChefs()
    await seedHotels()
    await seedShiftRequests()

    console.log('\n✅ Seed complete!')

    // Print stats
    const chefCount = await prisma.chef.count()
    const activeCount = await prisma.chef.count({ where: { status: 'active' } })
    const warmCount = await prisma.chef.count({ where: { status: 'warm' } })
    const inactiveCount = await prisma.chef.count({ where: { status: 'inactive' } })
    const hotelCount = await prisma.hotelCompany.count()
    const requestCount = await prisma.shiftRequest.count()
    const availCount = await prisma.chefAvailability.count()

    console.log(`\nStats:`)
    console.log(`  Chefs: ${chefCount} (active: ${activeCount}, warm: ${warmCount}, inactive: ${inactiveCount})`)
    console.log(`  Hotels: ${hotelCount}`)
    console.log(`  Shift Requests: ${requestCount}`)
    console.log(`  Availability Slots: ${availCount}`)
}

main()
    .catch(console.error)
    .finally(() => prisma.$disconnect())
