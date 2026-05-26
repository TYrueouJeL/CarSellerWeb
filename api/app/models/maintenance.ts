import { MaintenanceSchema } from '#database/schema'
import { belongsTo } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import User from './user.ts'
import UserVehicle from './user_vehicle.ts'
import MaintenanceServiceType from './maintenance_service_type.ts'
import MaintenanceStatus from './maintenance_status.ts'
import MaintenanceRequest from './maintenance_request.ts'

export default class Maintenance extends MaintenanceSchema {
  static table = 'maintenance'

  @belongsTo(() => User, { foreignKey: 'customerId' })
  declare customer: BelongsTo<typeof User>

  @belongsTo(() => User, { foreignKey: 'technicianId' })
  declare technician: BelongsTo<typeof User>

  @belongsTo(() => MaintenanceStatus)
  declare maintenanceStatus: BelongsTo<typeof MaintenanceStatus>

  @belongsTo(() => MaintenanceRequest)
  declare maintenanceRequest: BelongsTo<typeof MaintenanceRequest>

  @belongsTo(() => MaintenanceServiceType, { foreignKey: 'typeId' })
  declare serviceType: BelongsTo<typeof MaintenanceServiceType>

  @belongsTo(() => UserVehicle, { foreignKey: 'vehicleId' })
  declare userVehicle: BelongsTo<typeof UserVehicle>
}
