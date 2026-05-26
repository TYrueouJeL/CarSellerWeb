import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  async up() {
    this.schema.createTable('ticket_status', (table) => {
      table.increments('id')
      table.string('name').notNullable()
      table.timestamps(true, true)
    })

    this.schema.createTable('ticket', (table) => {
      table.increments('id')
      table.string('title').notNullable()
      table.text('description').notNullable()
      table.timestamp('created_at', { useTz: true }).notNullable().defaultTo(this.now())
      table
        .integer('status_id')
        .unsigned()
        .notNullable()
        .references('ticket_status.id')
        .onDelete('RESTRICT')
      table
        .integer('customer_id')
        .unsigned()
        .notNullable()
        .references('user.id')
        .onDelete('CASCADE')
      table
        .integer('technician_id')
        .unsigned()
        .nullable()
        .references('user.id')
        .onDelete('SET NULL')
      table.timestamp('updated_at', { useTz: true }).nullable()
    })

    this.schema.createTable('ticket_comment', (table) => {
      table.increments('id')
      table.text('comment').notNullable()
      table.timestamp('created_at', { useTz: true }).notNullable().defaultTo(this.now())
      table
        .integer('author_id')
        .unsigned()
        .notNullable()
        .references('user.id')
        .onDelete('CASCADE')
      table
        .integer('ticket_id')
        .unsigned()
        .notNullable()
        .references('ticket.id')
        .onDelete('CASCADE')
      table.timestamp('updated_at', { useTz: true }).nullable()
    })
  }

  async down() {
    this.schema.dropTable('ticket_comment')
    this.schema.dropTable('ticket')
    this.schema.dropTable('ticket_status')
  }
}
