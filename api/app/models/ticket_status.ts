import { TicketStatusSchema } from '#database/schema'
import { hasMany } from '@adonisjs/lucid/orm'
import type { HasMany } from '@adonisjs/lucid/types/relations'
import Ticket from './ticket.ts'

export default class TicketStatus extends TicketStatusSchema {
  static table = 'ticket_status'

  @hasMany(() => Ticket)
  declare tickets: HasMany<typeof Ticket>
}
