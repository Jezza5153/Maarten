import SeoLandingPage from '@/components/SeoLandingPage'

export const metadata = {
    title: 'Pastry Chef inhuren — Patisserie personeel | Chef & Serve',
    description: 'Pastry chef nodig? Chef & Serve levert gescreende patissiers voor hotels. Desserts, brood, banketwerk. Direct beschikbaar.',
}

export default function PastryChefPage() {
    return (
        <SeoLandingPage
            title="Pastry Chef inhuren"
            h1="Pastry chef inhuren voor uw hotel"
            intro="Chef & Serve levert ervaren patissiers en pastry chefs voor hotels in Amsterdam. Desserts, brood, banketwerk en alles wat met patisserie te maken heeft."
            sections={[
                { heading: 'Professionele patissiers voor hotels', content: 'Een goede pastry chef is essentieel voor het dessertmenu, ontbijtbuffet, afternoon tea en banqueting. Onze pastry chefs hebben ervaring in hotelkeukens en kennen de standaarden van fine dining patisserie.' },
                { heading: 'Specialisaties', content: 'Onze patissiers beheersen: plated desserts voor fine dining, petit fours en mignardises, brood en viennoiserie voor ontbijt, banketwerk voor evenementen, chocoladewerk, en dieet-specifieke desserts (glutenvrij, veganistisch).' },
                { heading: 'Flexibel inzetbaar', content: 'Nodig voor een enkel evenement? Of zoekt u een patissier voor meerdere weken? Wij bieden flexibele inzet op maat van uw hotel.' },
            ]}
            faqs={[
                { q: 'Wat kost een pastry chef?', a: 'Tarieven voor pastry chefs liggen tussen €28 en €48 per uur, afhankelijk van ervaring en specialisatie.' },
                { q: 'Heeft u patissiers met fine dining ervaring?', a: 'Ja. Veel van onze pastry chefs hebben ervaring in Michelin-restaurants en internationale hotelketens.' },
                { q: 'Kunnen pastry chefs ook brood maken?', a: 'Ja. De meeste patissiers in ons netwerk beheersen zowel patisserie als boulangerie.' },
            ]}
            relatedLinks={[
                { label: 'Chef huren Amsterdam', href: '/chef-huren-amsterdam' },
                { label: 'Banqueting Chef', href: '/banqueting-chef' },
                { label: 'Keukenpersoneel hotel', href: '/keukenpersoneel-hotel' },
            ]}
        />
    )
}
