import SeoLandingPage from '@/components/SeoLandingPage'

export const metadata = {
    title: 'Banqueting Chef inhuren — Evenementen keukenpersoneel | Chef & Serve',
    description: 'Banqueting chefs voor hotels en evenementen. Ervaren in hoog-volume catering. Direct beschikbaar via Chef & Serve.',
}

export default function BanquetingChefPage() {
    return (
        <SeoLandingPage
            title="Banqueting Chef"
            h1="Banqueting chef inhuren voor uw hotel"
            intro="Ervaren banqueting chefs voor conferenties, bruiloften, gala-diners en evenementen. Chef & Serve levert professionals die gewend zijn aan hoog-volume catering in hotelomgevingen."
            sections={[
                { heading: 'Banqueting specialist nodig?', content: 'Banqueting vraagt specifieke ervaring: hoog volume, strakke timing, consistente kwaliteit en professionele presentatie. Onze banqueting chefs hebben bewezen ervaring in grote hotelkeukens en conference centers.' },
                { heading: 'Waar zijn onze banqueting chefs ervaren in?', content: 'Conferenties en zakelijke events, bruiloften en feesten, gala-diners, buffetten, all-day dining, en hoog-volume ontbijt. Onze chefs kennen de protocollen, kunnen zelfstandig werken en zijn gewend aan wisselende teams.' },
                { heading: 'Flexibele inzet', content: 'Wij leveren banqueting chefs voor een enkel evenement, een weekend of voor langere periodes. U kiest uit de shortlist de chef die het beste past bij uw event.' },
            ]}
            faqs={[
                { q: 'Wat is het verschil met een reguliere chef?', a: 'Banqueting chefs zijn gespecialiseerd in hoog-volume, gestandaardiseerde bereiding. Ze zijn gewend aan strakke deadlines en grote aantallen couverts.' },
                { q: 'Hoeveel kost een banqueting chef?', a: 'Tarieven voor banqueting chefs liggen doorgaans tussen €28 en €48 per uur, afhankelijk van ervaring en de aard van het evenement.' },
                { q: 'Kan ik een team boeken voor een groot evenement?', a: 'Ja. Wij kunnen meerdere chefs tegelijk inzetten voor grote evenementen. Neem contact op via de aanvraag.' },
            ]}
            relatedLinks={[
                { label: 'Chef huren Amsterdam', href: '/chef-huren-amsterdam' },
                { label: 'Keukenpersoneel hotel', href: '/keukenpersoneel-hotel' },
                { label: 'Pastry Chef inhuren', href: '/pastry-chef-inhuren' },
            ]}
        />
    )
}
