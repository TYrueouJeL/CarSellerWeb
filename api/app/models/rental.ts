import { RentalSchema } from '#database/schema'
import { belongsTo } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import Vehicle from './vehicle.ts'
import User from './user.ts'

export default class Rental extends RentalSchema {
  static table = 'rental'

  @belongsTo(() => Vehicle)
  declare vehicle: BelongsTo<typeof Vehicle>

  @belongsTo(() => User)
  declare user: BelongsTo<typeof User>
}
