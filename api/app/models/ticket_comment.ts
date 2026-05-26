import { TicketCommentSchema } from '#database/schema'
import { belongsTo } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import User from './user.ts'
import Ticket from './ticket.ts'

export default class TicketComment extends TicketCommentSchema {
  static table = 'ticket_comment'

  @belongsTo(() => User, { foreignKey: 'authorId' })
  declare author: BelongsTo<typeof User>

  @belongsTo(() => Ticket)
  declare ticket: BelongsTo<typeof Ticket>
}
