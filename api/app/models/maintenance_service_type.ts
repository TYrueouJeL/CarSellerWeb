import { MaintenanceServiceTypeSchema } from '#database/schema'
import { hasMany } from '@adonisjs/lucid/orm'
import type { HasMany } from '@adonisjs/lucid/types/relations'
import Maintenance from './maintenance.ts'
import MaintenanceRequest from './maintenance_request.ts'

export default class MaintenanceServiceType extends MaintenanceServiceTypeSchema {
  static table = 'maintenance_service_type'

  @hasMany(() => Maintenance)
  declare maintenances: HasMany<typeof Maintenance>

  @hasMany(() => MaintenanceRequest)
  declare maintenanceRequests: HasMany<typeof MaintenanceRequest>
}
