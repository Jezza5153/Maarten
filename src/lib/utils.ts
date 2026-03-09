import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}

export function formatDate(dateStr: string): string {
    const [year, month, day] = dateStr.split('-').map(Number)
    const months = ['jan', 'feb', 'mrt', 'apr', 'mei', 'jun', 'jul', 'aug', 'sep', 'okt', 'nov', 'dec']
    return `${day} ${months[month - 1]} ${year}`
}

export function formatTime(timeStr: string): string {
    return timeStr
}

export function roleLabel(role: string): string {
    const labels: Record<string, string> = {
        chef_de_partie: 'Chef de Partie',
        sous_chef: 'Sous Chef',
        executive_chef: 'Executive Chef',
        pastry_chef: 'Pastry Chef',
        bediening: 'Bediening',
    }
    return labels[role] || role
}

export function statusLabel(status: string): string {
    const labels: Record<string, string> = {
        inactive: 'Inactief',
        warm: 'Warm',
        active: 'Actief',
        new: 'Nieuw',
        matching: 'Matching',
        shortlist_sent: 'Shortlist verstuurd',
        booked: 'Geboekt',
        cancelled: 'Geannuleerd',
    }
    return labels[status] || status
}

export function statusColor(status: string): string {
    const colors: Record<string, string> = {
        inactive: 'bg-gray-100 text-gray-600',
        warm: 'bg-amber-100 text-amber-700',
        active: 'bg-emerald-100 text-emerald-700',
        new: 'bg-blue-100 text-blue-700',
        matching: 'bg-purple-100 text-purple-700',
        shortlist_sent: 'bg-cyan-100 text-cyan-700',
        booked: 'bg-emerald-100 text-emerald-700',
        cancelled: 'bg-red-100 text-red-700',
    }
    return colors[status] || 'bg-gray-100 text-gray-600'
}

export function completenessColor(score: number): string {
    if (score >= 80) return 'text-emerald-600'
    if (score >= 50) return 'text-amber-600'
    return 'text-red-500'
}

export function parseJsonArray(value: string | null): string[] {
    if (!value) return []
    try {
        return JSON.parse(value)
    } catch {
        return []
    }
}
