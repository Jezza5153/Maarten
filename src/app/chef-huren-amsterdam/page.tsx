import SeoLandingPage from '@/components/SeoLandingPage'

export const metadata = {
    title: 'Chef huren Amsterdam — Gescreend keukenpersoneel | Chef & Serve',
    description: 'Een chef huren in Amsterdam? Chef & Serve levert gescreende koks voor hotels. Shortlist binnen 2 uur. 840+ professionals beschikbaar.',
}

export default function ChefHurenAmsterdamPage() {
    return (
        <SeoLandingPage
            title="Chef huren Amsterdam"
            h1="Chef huren in Amsterdam?"
            intro="Chef & Serve levert gescreend keukenpersoneel aan hotels in Amsterdam en omgeving. Van Chef de Partie tot Executive Chef — u ontvangt binnen 2 uur een shortlist met beschikbare kandidaten."
            sections={[
                { heading: 'Waarom een chef huren via Chef & Serve?', content: 'Hotels in Amsterdam hebben regelmatig behoefte aan extra keukenpersoneel: bij ziekte, piekdrukte, evenementen of seizoensdrukte. Chef & Serve biedt een direct netwerk van 840+ gescreende keukenprofessionals. Geen uitzendbureau-overhead, maar directe matching op basis van beschikbaarheid, ervaring en locatie.' },
                { heading: 'Welke chefs kunt u huren?', content: 'Wij bieden alle keukenfuncties: Executive Chef, Sous Chef, Chef de Partie, Pastry Chef en bediening. Onze chefs hebben ervaring in fine dining, banqueting, à la carte en ontbijt. Alle professionals zijn HACCP-gecertificeerd en gescreend op werkervaring en referenties.' },
                { heading: 'Hoe snel is een chef beschikbaar?', content: 'Na ontvangst van uw aanvraag sturen wij binnen 2 uur een shortlist. Bij spoedaanvragen (urgent) streven we naar 1 uur. Onze chefs zijn gewend aan korte doorlooptijden en kunnen vaak dezelfde of volgende dag starten.' },
                { heading: 'Tarieven', content: 'Tarieven variëren per functie en ervaring: Chef de Partie vanaf €25/u, Sous Chef vanaf €30/u, Executive Chef vanaf €40/u. U ziet het tarief direct in de shortlist — geen verborgen kosten.' },
            ]}
            faqs={[
                { q: 'Hoe snel kan ik een chef huren?', a: 'U ontvangt binnen 2 uur een shortlist na het indienen van uw aanvraag. Bij spoedaanvragen streven we naar 1 uur.' },
                { q: 'Zijn de chefs gescreend?', a: 'Ja. Elke chef is geverifieerd op identiteit, werkervaring, certificeringen en referenties. Wij hanteren een interne betrouwbaarheidsscore.' },
                { q: 'Wat kost het om een chef te huren?', a: 'Tarieven starten vanaf €22/uur voor bediening en €25/uur voor Chef de Partie. U ziet het tarief direct in de shortlist.' },
                { q: 'Kan ik een chef voor één dag huren?', a: 'Ja, wij leveren voor zowel enkele diensten als langere periodes.' },
            ]}
            relatedLinks={[
                { label: 'Tijdelijke kok Amsterdam', href: '/tijdelijke-kok-amsterdam' },
                { label: 'Banqueting Chef', href: '/banqueting-chef' },
                { label: 'Pastry Chef inhuren', href: '/pastry-chef-inhuren' },
                { label: 'Keukenpersoneel hotel', href: '/keukenpersoneel-hotel' },
            ]}
        />
    )
}
