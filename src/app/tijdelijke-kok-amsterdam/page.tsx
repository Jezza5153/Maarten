import SeoLandingPage from '@/components/SeoLandingPage'

export const metadata = {
    title: 'Tijdelijke kok Amsterdam — Flexibel keukenpersoneel | Chef & Serve',
    description: 'Tijdelijke kok nodig in Amsterdam? Chef & Serve levert flexibele koks voor hotels. Direct beschikbaar, HACCP-gecertificeerd.',
}

export default function TijdelijkeKokPage() {
    return (
        <SeoLandingPage
            title="Tijdelijke kok Amsterdam"
            h1="Tijdelijke kok nodig in Amsterdam?"
            intro="Chef & Serve levert flexibele, tijdelijke koks aan hotels in Amsterdam. Van één dienst tot meerdere weken — altijd gescreend, altijd betrouwbaar."
            sections={[
                { heading: 'Flexibel keukenpersoneel wanneer u het nodig heeft', content: 'Ziekte, piekdrukte, seizoensdrukte of een evenement — er zijn veel redenen waarom u tijdelijk een kok nodig heeft. Chef & Serve biedt een pool van 840+ professionals die direct inzetbaar zijn. Geen lange contracten, geen uitzendbureau-overhead.' },
                { heading: 'Direct inzetbare koks', content: 'Onze koks zijn gewend aan wisselende werkomgevingen en kunnen vaak dezelfde of volgende dag starten. Ze kennen de werkdruk van Amsterdamse hotels en zijn professioneel, punctueel en zelfstandig.' },
                { heading: 'Alle niveaus beschikbaar', content: 'Van ervaren Executive Chefs voor fine dining tot betrouwbare Chef de Parties voor ontbijt- of lunchtijden. Wij matchen op functie, ervaring, beschikbaarheid en budget.' },
            ]}
            faqs={[
                { q: 'Voor hoeveel dagen kan ik een tijdelijke kok inzetten?', a: 'Vanaf 1 dag tot meerdere maanden. Wij zijn flexibel en passen ons aan uw behoefte aan.' },
                { q: 'Hoe snel is een tijdelijke kok beschikbaar?', a: 'Binnen 2 uur na aanvraag ontvangt u een shortlist. Bij spoedaanvragen streven we naar 1 uur.' },
                { q: 'Wat zijn de kosten?', a: 'Tarieven starten vanaf €25/uur. U ziet het exacte tarief per kandidaat in de shortlist.' },
            ]}
            relatedLinks={[
                { label: 'Chef huren Amsterdam', href: '/chef-huren-amsterdam' },
                { label: 'Banqueting Chef', href: '/banqueting-chef' },
                { label: 'Keukenpersoneel hotel', href: '/keukenpersoneel-hotel' },
            ]}
        />
    )
}
