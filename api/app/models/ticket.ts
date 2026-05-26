import { TicketSchema } from '#database/schema'
import { belongsTo, hasMany } from '@adonisjs/lucid/orm'
import type { BelongsTo, HasMany } from '@adonisjs/lucid/types/relations'
import User from './user.ts'
import TicketStatus from './ticket_status.ts'
import TicketComment from './ticket_comment.ts'

export default class Ticket extends TicketSchema {
  static table = 'ticket'

  @belongsTo(() => TicketStatus, { foreignKey: 'statusId' })
  declare ticketStatus: BelongsTo<typeof TicketStatus>

  @belongsTo(() => User, { foreignKey: 'customerId' })
  declare customer: BelongsTo<typeof User>

  @belongsTo(() => User, { foreignKey: 'technicianId' })
  declare technician: BelongsTo<typeof User>

  @hasMany(() => TicketComment)
  declare ticketComments: HasMany<typeof TicketComment>
}
