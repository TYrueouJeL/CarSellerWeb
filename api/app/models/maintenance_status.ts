import { MaintenanceStatusSchema } from '#database/schema'
import { hasMany } from '@adonisjs/lucid/orm'
import type { HasMany } from '@adonisjs/lucid/types/relations'
import Maintenance from './maintenance.ts'

export default class MaintenanceStatus extends MaintenanceStatusSchema {
  static table = 'maintenance_status'

  @hasMany(() => Maintenance)
  declare maintenances: HasMany<typeof Maintenance>
}
