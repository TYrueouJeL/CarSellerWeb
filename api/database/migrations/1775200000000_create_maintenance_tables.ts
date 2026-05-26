import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  async up() {
    this.schema.createTable('maintenance_status', (table) => {
      table.increments('id')
      table.string('name').notNullable()
      table.timestamps(true, true)
    })

    this.schema.createTable('maintenance_service_type', (table) => {
      table.increments('id')
      table.string('name').notNullable()
      table.text('description').notNullable()
      table.decimal('price', 10, 2).notNullable()
      table.integer('duration').unsigned().notNullable()
      table.timestamps(true, true)
    })

    this.schema.createTable('maintenance_request', (table) => {
      table.increments('id')
      table
        .integer('customer_id')
        .unsigned()
        .notNullable()
        .references('user.id')
        .onDelete('CASCADE')
      table
        .integer('type_id')
        .unsigned()
        .notNullable()
        .references('maintenance_service_type.id')
        .onDelete('RESTRICT')
      table
        .integer('vehicle_id')
        .unsigned()
        .notNullable()
        .references('vehicle.id')
        .onDelete('CASCADE')
      table
        .integer('technician_id')
        .unsigned()
        .notNullable()
        .references('user.id')
        .onDelete('RESTRICT')
      table.timestamp('request_date', { useTz: true }).notNullable()
      table.timestamp('approved_date', { useTz: true }).nullable()
      table.timestamps(true, true)
    })

    this.schema.createTable('maintenance', (table) => {
      table.increments('id')
      table
        .integer('customer_id')
        .unsigned()
        .notNullable()
        .references('user.id')
        .onDelete('CASCADE')
      table
        .integer('technician_id')
        .unsigned()
        .notNullable()
        .references('user.id')
        .onDelete('RESTRICT')
      table
        .integer('maintenance_status_id')
        .unsigned()
        .notNullable()
        .references('maintenance_status.id')
        .onDelete('RESTRICT')
      table
        .integer('maintenance_request_id')
        .unsigned()
        .notNullable()
        .references('maintenance_request.id')
        .onDelete('CASCADE')
      table
        .integer('type_id')
        .unsigned()
        .notNullable()
        .references('maintenance_service_type.id')
        .onDelete('RESTRICT')
      table
        .integer('vehicle_id')
        .unsigned()
        .notNullable()
        .references('vehicle.id')
        .onDelete('CASCADE')
      table.timestamp('date', { useTz: true }).notNullable()
      table.timestamps(true, true)
    })
  }

  async down() {
    this.schema.dropTable('maintenance')
    this.schema.dropTable('maintenance_request')
    this.schema.dropTable('maintenance_service_type')
    this.schema.dropTable('maintenance_status')
  }
}
