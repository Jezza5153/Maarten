import SeoLandingPage from '@/components/SeoLandingPage'

export const metadata = {
    title: 'Keukenpersoneel hotel — Direct beschikbaar | Chef & Serve',
    description: 'Keukenpersoneel voor uw hotel nodig? Chef & Serve levert gescreende koks, sous chefs en bediening. 840+ professionals.',
}

export default function KeukenpersoneelHotelPage() {
    return (
        <SeoLandingPage
            title="Keukenpersoneel hotel"
            h1="Keukenpersoneel voor uw hotel"
            intro="Van koks tot bediening — Chef & Serve levert alle keukenfuncties voor hotels in Amsterdam en omgeving. Gescreend, betrouwbaar en direct beschikbaar."
            sections={[
                { heading: 'Alle functies onder één dak', content: 'Of u nu een Executive Chef zoekt voor uw fine dining restaurant, een Sous Chef voor dagelijkse aansturing, een Chef de Partie voor de koude of warme post, een Pastry Chef voor desserts, of bediening voor uw restaurant of room service — wij leveren het allemaal.' },
                { heading: 'Waarom hotels kiezen voor Chef & Serve', content: 'Hotels hebben specifieke eisen: HACCP-certificering, ervaring met hoog volume, professionaliteit en betrouwbaarheid. Ons netwerk van 840+ professionals is hierop gescreend. Wij kennen de hotelsector en weten welk type professional bij uw operatie past.' },
                { heading: 'Hoe werkt het?', content: 'U dient een aanvraag in via ons online formulier (2 minuten). Ons systeem matcht automatisch op functie, beschikbaarheid, locatie en ervaring. Binnen 2 uur ontvangt u een shortlist van 3-10 geschikte kandidaten met profiel, tarief en een korte toelichting.' },
                { heading: 'Flexibele inzet', content: 'Van een enkele dienst tot een volledig seizoen. Wij zijn flexibel en passen ons aan de behoeften van uw hotel aan. Bij ziekte of uitval regelen wij dezelfde dag een vervanging.' },
            ]}
            faqs={[
                { q: 'Welke functies bieden jullie aan?', a: 'Executive Chef, Sous Chef, Chef de Partie, Pastry Chef en bediening. Alle niveaus en specialisaties.' },
                { q: 'Is het personeel HACCP-gecertificeerd?', a: 'Ja. HACCP-certificering is een vereiste in ons screeningsproces.' },
                { q: 'Wat als iemand ziek wordt?', a: 'Wij regelen binnen 2 uur een vervangende kandidaat. Uw keuken draait altijd door.' },
                { q: 'Leveren jullie ook voor hotels buiten Amsterdam?', a: 'Ja. Wij hebben professionals in de regio Amsterdam, Haarlem, Utrecht, Amstelveen en omgeving.' },
            ]}
            relatedLinks={[
                { label: 'Chef huren Amsterdam', href: '/chef-huren-amsterdam' },
                { label: 'Tijdelijke kok Amsterdam', href: '/tijdelijke-kok-amsterdam' },
                { label: 'Banqueting Chef', href: '/banqueting-chef' },
                { label: 'Pastry Chef inhuren', href: '/pastry-chef-inhuren' },
            ]}
        />
    )
}
