import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'vehicle'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('model_id').unsigned().references('model.id')
      table.integer('year').notNullable()
      table.string('registration').notNullable()
      table.decimal('mileage', 10, 2).notNullable()
      table.enum('type', ["user_vehicle", "rentable_vehicle", "salable_vehicle"]).notNullable()

      table.decimal('price', 10, 2).nullable()

      table.decimal('daily_price', 10, 2).nullable()

      table.integer('customer_id').unsigned().nullable().references('user.id')

      table.timestamps(true, true)
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}