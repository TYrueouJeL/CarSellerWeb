import { VehicleSchema } from '#database/schema'
import { belongsTo } from '@adonisjs/lucid/orm'
import Model from './model.ts'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'

export default class Vehicle extends VehicleSchema {
    @belongsTo(() => Model)
    declare model: BelongsTo<typeof Model>;
}