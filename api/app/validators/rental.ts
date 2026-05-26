import vine from '@vinejs/vine'

const dateField = () => vine.string().regex(/^\d{4}-\d{2}-\d{2}$/)

export const rentVehicleValidator = vine.create({
    startDate: dateField(),
    endDate: dateField(),
})

export const checkAvailabilityValidator = vine.create({
    startDate: dateField(),
    endDate: dateField(),
})
