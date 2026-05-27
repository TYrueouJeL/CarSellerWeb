export function periodsOverlap(start1: string, end1: string, start2: string, end2: string): boolean {
    return start1 <= end2 && start2 <= end1
}

export function countRentalDays(startDate: string, endDate: string): number {
    const start = new Date(startDate)
    const end = new Date(endDate)
    const diff = end.getTime() - start.getTime()
    return Math.floor(diff / (1000 * 60 * 60 * 24)) + 1
}

export function todayIso(): string {
    return new Date().toISOString().split('T')[0]!
}

export function validateRentalDates(
    startDate: string,
    endDate: string,
    bookedPeriods: { startDate: string; endDate: string }[] = [],
): string | null {
    if (!startDate || !endDate) {
        return 'Veuillez sélectionner les dates de début et de fin'
    }

    const today = todayIso()

    if (startDate < today) {
        return 'La date de début ne peut pas être dans le passé'
    }

    if (endDate < startDate) {
        return 'La date de fin doit être égale ou postérieure à la date de début'
    }

    const days = countRentalDays(startDate, endDate)
    if (days < 1) {
        return 'La location doit durer au moins 1 jour'
    }

    for (const period of bookedPeriods) {
        if (periodsOverlap(startDate, endDate, period.startDate, period.endDate)) {
            return `Indisponible : déjà loué du ${formatDateFr(period.startDate)} au ${formatDateFr(period.endDate)}`
        }
    }

    return null
}

export function formatDateFr(isoDate: string): string {
    return new Date(isoDate).toLocaleDateString('fr-FR', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
    })
}
