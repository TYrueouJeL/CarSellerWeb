import { MaintenanceRequestSchema } from '#database/schema'
import { belongsTo, hasMany } from '@adonisjs/lucid/orm'
import type { BelongsTo, HasMany } from '@adonisjs/lucid/types/relations'
import User from './user.ts'
import UserVehicle from './user_vehicle.ts'
import MaintenanceServiceType from './maintenance_service_type.ts'
import Maintenance from './maintenance.ts'

export default class MaintenanceRequest extends MaintenanceRequestSchema {
  static table = 'maintenance_request'

  @belongsTo(() => User, { foreignKey: 'customerId' })
  declare customer: BelongsTo<typeof User>

  @belongsTo(() => User, { foreignKey: 'technicianId' })
  declare technician: BelongsTo<typeof User>

  @belongsTo(() => MaintenanceServiceType, { foreignKey: 'typeId' })
  declare serviceType: BelongsTo<typeof MaintenanceServiceType>

  @belongsTo(() => UserVehicle, { foreignKey: 'vehicleId' })
  declare userVehicle: BelongsTo<typeof UserVehicle>

  @hasMany(() => Maintenance)
  declare maintenances: HasMany<typeof Maintenance>
}
