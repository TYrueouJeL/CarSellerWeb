export function formatPrice(value: number | string | null | undefined): string {
    if (value === null || value === undefined) return '—'
    const num = typeof value === 'string' ? Number(value) : value
    if (Number.isNaN(num)) return '—'
    return new Intl.NumberFormat('fr-FR', {
        style: 'currency',
        currency: 'EUR',
        maximumFractionDigits: 0,
    }).format(num)
}

export function formatMileage(value: number | string): string {
    const num = typeof value === 'string' ? Number(value) : value
    return new Intl.NumberFormat('fr-FR').format(num) + ' km'
}

export function formatDateTime(value: string | undefined): string {
    if (!value) return '—'
    return new Date(value).toLocaleString('fr-FR', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
    })
}

export function formatUserType(type: string): string {
    return type === 'technician' ? 'Technicien' : 'Client'
}

export function formatRole(role: string): string {
    return role
        .replace(/^ROLES_/, '')
        .replace(/_/g, ' ')
        .toLowerCase()
        .replace(/^\w/, (c) => c.toUpperCase())
}
