import vine from '@vinejs/vine'

export const createMaintenanceRequestValidator = vine.create({
  typeId: vine.number().positive(),
  vehicleId: vine.number().positive(),
  technicianId: vine.number().positive(),
  requestDate: vine.string().trim(),
})
