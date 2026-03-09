'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Mail, ArrowRight, ChefHat } from 'lucide-react'

export default function LoginPage() {
    const router = useRouter()
    const [email, setEmail] = useState('')
    const [sent, setSent] = useState(false)

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        if (email) {
            setSent(true)
            // Simulated magic link login — redirect after short delay
            setTimeout(() => {
                router.push('/chef/dashboard')
            }, 1500)
        }
    }

    return (
        <div style={{ background: 'var(--gray-50)', minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div style={{ maxWidth: '400px', width: '100%', padding: '1rem' }}>
                <div className="card" style={{ padding: '2.5rem 2rem', textAlign: 'center' }}>
                    <ChefHat size={40} color="var(--gold)" style={{ marginBottom: '1rem' }} />
                    <h1 style={{ fontSize: '1.5rem', marginBottom: '0.375rem' }}>Chef Login</h1>
                    <p style={{ color: 'var(--gray-500)', fontSize: '0.875rem', marginBottom: '1.5rem' }}>
                        Log in met je e-mailadres. We sturen je een inloglink.
                    </p>

                    {!sent ? (
                        <form onSubmit={handleSubmit}>
                            <div className="form-group" style={{ textAlign: 'left' }}>
                                <label className="form-label">E-mailadres</label>
                                <div style={{ position: 'relative' }}>
                                    <Mail size={16} style={{ position: 'absolute', left: '0.75rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--gray-400)' }} />
                                    <input
                                        type="email"
                                        className="form-input"
                                        value={email}
                                        onChange={e => setEmail(e.target.value)}
                                        placeholder="je@email.nl"
                                        required
                                        style={{ paddingLeft: '2.25rem' }}
                                    />
                                </div>
                            </div>
                            <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>
                                Stuur inloglink <ArrowRight size={16} />
                            </button>
                        </form>
                    ) : (
                        <div className="animate-fade-in">
                            <div style={{
                                width: '3rem', height: '3rem', borderRadius: '9999px',
                                background: '#D1FAE5', color: '#065F46',
                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                margin: '0 auto 1rem',
                            }}>
                                <Mail size={20} />
                            </div>
                            <h3 style={{ fontSize: '1.063rem', marginBottom: '0.375rem' }}>Link verstuurd!</h3>
                            <p style={{ fontSize: '0.875rem', color: 'var(--gray-500)' }}>
                                Check je inbox voor de inloglink. Je wordt automatisch doorgestuurd...
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}
