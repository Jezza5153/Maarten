import Link from 'next/link'
import { Shield, Clock, Users, CheckCircle, ArrowRight, Star, Building2 } from 'lucide-react'

export default function HomePage() {
  return (
    <>
      {/* Hero Section */}
      <section style={{
        background: 'linear-gradient(135deg, var(--navy) 0%, var(--navy-light) 100%)',
        color: '#fff',
        padding: '5rem 0 4rem',
        position: 'relative',
        overflow: 'hidden',
      }}>
        <div style={{
          position: 'absolute', top: 0, right: 0, width: '40%', height: '100%',
          background: 'radial-gradient(circle at center, rgba(200,165,92,0.08) 0%, transparent 70%)',
        }} />
        <div className="container-wide" style={{ position: 'relative', zIndex: 1 }}>
          <div style={{ maxWidth: '700px' }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: 'rgba(200,165,92,0.15)', borderRadius: '9999px', padding: '0.375rem 1rem', marginBottom: '1.5rem' }}>
              <Star size={14} color="var(--gold)" fill="var(--gold)" />
              <span style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--gold)' }}>840+ gescreende professionals</span>
            </div>
            <h1 style={{ color: '#fff', fontSize: '3rem', lineHeight: 1.1, marginBottom: '1.25rem' }}>
              Professioneel keuken&shy;personeel voor hotels in Amsterdam
            </h1>
            <p style={{ fontSize: '1.125rem', color: 'var(--gray-400)', lineHeight: 1.7, marginBottom: '2rem', maxWidth: '560px' }}>
              Vandaag nog een betrouwbare kok nodig? Chef & Serve matcht uw hotel met gescreend keukenpersoneel. Binnen enkele uren een shortlist, altijd met backup.
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem' }}>
              <Link href="/aanvraag" className="btn btn-primary btn-lg">
                Vraag beschikbaarheid aan <ArrowRight size={18} />
              </Link>
              <Link href="/werkwijze" className="btn btn-lg" style={{ background: 'rgba(255,255,255,0.1)', color: '#fff', border: '1px solid rgba(255,255,255,0.2)' }}>
                Hoe het werkt
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Bar */}
      <section style={{ background: 'var(--cream)', padding: '1.5rem 0', borderBottom: '1px solid var(--cream-dark)' }}>
        <div className="container-wide">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '1.5rem', textAlign: 'center' }}>
            {[
              { icon: <Shield size={20} />, text: '100% gescreend & gecheckt' },
              { icon: <Clock size={20} />, text: 'Shortlist binnen 2 uur' },
              { icon: <Users size={20} />, text: '840+ professionals' },
              { icon: <CheckCircle size={20} />, text: 'Altijd een backup' },
            ].map((item, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
                <span style={{ color: 'var(--gold-dark)' }}>{item.icon}</span>
                <span style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--navy)' }}>{item.text}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="section">
        <div className="container-wide">
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <h2>Zo werkt het</h2>
            <p style={{ color: 'var(--gray-500)', marginTop: '0.5rem', maxWidth: '500px', margin: '0.5rem auto 0' }}>
              Van aanvraag tot shortlist in drie stappen.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem' }}>
            {[
              { step: '01', title: 'Dien uw aanvraag in', desc: 'Vul de shift details in: rol, datum, tijden en vereisten. Duurt minder dan 2 minuten.' },
              { step: '02', title: 'Wij matchen & screenen', desc: 'Ons systeem selecteert de beste kandidaten op beschikbaarheid, ervaring, locatie en betrouwbaarheid.' },
              { step: '03', title: 'Ontvang uw shortlist', desc: 'Binnen enkele uren ontvangt u een shortlist van 3-10 gescreende kandidaten met profiel en tarieven.' },
            ].map((item, i) => (
              <div key={i} className="card" style={{ textAlign: 'center', padding: '2rem' }}>
                <div style={{
                  width: '3rem', height: '3rem', borderRadius: '0.75rem',
                  background: 'var(--cream)', color: 'var(--gold-dark)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '1.125rem', fontWeight: 800, margin: '0 auto 1rem',
                }}>
                  {item.step}
                </div>
                <h3 style={{ fontSize: '1.125rem', marginBottom: '0.5rem' }}>{item.title}</h3>
                <p style={{ fontSize: '0.875rem', color: 'var(--gray-500)', lineHeight: 1.6 }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Roles Section */}
      <section className="section section-cream">
        <div className="container-wide">
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <h2>Alle keukenfuncties beschikbaar</h2>
            <p style={{ color: 'var(--gray-500)', marginTop: '0.5rem' }}>
              Van Chef de Partie tot Executive Chef — we hebben het juiste talent.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
            {[
              { role: 'Chef de Partie', count: '240+', link: '/chef-huren-amsterdam' },
              { role: 'Sous Chef', count: '185+', link: '/tijdelijke-kok-amsterdam' },
              { role: 'Executive Chef', count: '95+', link: '/chef-huren-amsterdam' },
              { role: 'Pastry Chef', count: '130+', link: '/pastry-chef-inhuren' },
              { role: 'Bediening', count: '190+', link: '/keukenpersoneel-hotel' },
            ].map((item, i) => (
              <Link key={i} href={item.link} className="card" style={{ textDecoration: 'none', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <div style={{ fontWeight: 700, color: 'var(--navy)' }}>{item.role}</div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--gray-500)' }}>{item.count} professionals</div>
                </div>
                <ArrowRight size={16} color="var(--gold)" />
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Hotels Section */}
      <section className="section">
        <div className="container-wide">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3rem', alignItems: 'center' }}>
            <div>
              <h2>Vertrouwd door hotels in Amsterdam</h2>
              <p style={{ color: 'var(--gray-500)', marginTop: '1rem', lineHeight: 1.7 }}>
                Hotels vertrouwen op Chef & Serve voor betrouwbaar, gescreend keukenpersoneel. Of het nu gaat om een enkele dienst of meerdere weken — wij leveren.
              </p>
              <ul style={{ listStyle: 'none', marginTop: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                {[
                  'Shortlist binnen 2 uur, ook bij spoedaanvragen',
                  'Altijd een backup-kandidaat beschikbaar',
                  'HACCP-gecertificeerd personeel',
                  'Duidelijke tarieven, geen verborgen kosten',
                  'KvK-geregistreerd en AVG-compliant',
                ].map((item, i) => (
                  <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem', fontSize: '0.938rem', color: 'var(--gray-700)' }}>
                    <CheckCircle size={18} color="var(--success)" style={{ marginTop: '2px', flexShrink: 0 }} />
                    {item}
                  </li>
                ))}
              </ul>
              <Link href="/aanvraag" className="btn btn-primary" style={{ marginTop: '1.5rem' }}>
                Aanvraag indienen <ArrowRight size={16} />
              </Link>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              {[
                { value: '840+', label: 'Professionals in ons netwerk' },
                { value: '<2u', label: 'Gemiddelde responstijd' },
                { value: '98%', label: 'Tevredenheidsscore' },
                { value: '50+', label: 'Hotels bediend' },
              ].map((item, i) => (
                <div key={i} className="metric-card">
                  <div className="metric-value">{item.value}</div>
                  <div className="metric-label">{item.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section section-dark" style={{ textAlign: 'center' }}>
        <div className="container-narrow">
          <Building2 size={40} color="var(--gold)" style={{ marginBottom: '1rem' }} />
          <h2 style={{ marginBottom: '1rem' }}>Keukenpersoneel nodig?</h2>
          <p style={{ color: 'var(--gray-400)', marginBottom: '2rem', maxWidth: '460px', margin: '0 auto 2rem' }}>
            Dien vandaag nog uw aanvraag in. Wij sturen binnen enkele uren een shortlist met gescreende kandidaten.
          </p>
          <Link href="/aanvraag" className="btn btn-primary btn-lg">
            Vraag beschikbaarheid aan <ArrowRight size={18} />
          </Link>
        </div>
      </section>

      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Organization',
            name: 'Chef & Serve',
            description: 'Professioneel keukenpersoneel voor hotels in Amsterdam',
            url: 'https://chef-en-serve.nl',
            address: {
              '@type': 'PostalAddress',
              addressLocality: 'Amsterdam',
              addressCountry: 'NL',
            },
          }),
        }}
      />
    </>
  )
}
