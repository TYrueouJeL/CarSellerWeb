import { ModelSchema } from '#database/schema'
import { belongsTo } from '@adonisjs/lucid/orm'
import Brand from './brand.ts'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import Category from './category.ts'

export default class Model extends ModelSchema {
    @belongsTo(() => Brand)
    declare brand: BelongsTo<typeof Brand>

    @belongsTo(() => Category)
    declare category: BelongsTo<typeof Category>
}