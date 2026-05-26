import Ticket from '#models/ticket'
import TicketComment from '#models/ticket_comment'
import TicketStatus from '#models/ticket_status'
import { DateTime } from 'luxon'

export default class TicketService {
  public async listStatuses() {
    return TicketStatus.query().orderBy('id', 'asc')
  }

  public async listForUser(userId: number, userType: string) {
    const query = Ticket.query()
      .preload('ticketStatus')
      .preload('customer')
      .preload('technician')
      .preload('ticketComments')
      .orderBy('created_at', 'desc')

    if (userType === 'technician') {
      query.where((builder) => {
        builder.where('technician_id', userId).orWhereNull('technician_id')
      })
    } else {
      query.where('customer_id', userId)
    }

    return query
  }

  public async findByIdForUser(ticketId: number, userId: number, userType: string) {
    const ticket = await Ticket.query()
      .where('id', ticketId)
      .preload('ticketStatus')
      .preload('customer')
      .preload('technician')
      .preload('ticketComments', (commentsQuery) => {
        commentsQuery.preload('author').orderBy('created_at', 'asc')
      })
      .first()

    if (!ticket) {
      throw new Error('TICKET_NOT_FOUND')
    }

    if (!this.canAccess(ticket, userId, userType)) {
      throw new Error('TICKET_FORBIDDEN')
    }

    return ticket
  }

  public async create(customerId: number, data: { title: string; description: string }) {
    const openStatus = await TicketStatus.query().where('name', 'Ouvert').first()
    if (!openStatus) {
      throw new Error('STATUS_NOT_FOUND')
    }

    const ticket = await Ticket.create({
      title: data.title,
      description: data.description,
      customerId,
      statusId: openStatus.id,
      createdAt: DateTime.now(),
    })

    await ticket.load('ticketStatus')
    await ticket.load('customer')

    return ticket
  }

  public async addComment(ticketId: number, authorId: number, userType: string, comment: string) {
    const ticket = await this.findByIdForUser(ticketId, authorId, userType)

    const ticketComment = await TicketComment.create({
      ticketId: ticket.id,
      authorId,
      comment,
      createdAt: DateTime.now(),
    })

    await ticketComment.load('author')

    return ticketComment
  }

  private canAccess(ticket: Ticket, userId: number, userType: string): boolean {
    if (ticket.customerId === userId) {
      return true
    }
    if (userType === 'technician') {
      return ticket.technicianId === null || ticket.technicianId === userId
    }
    return false
  }
}
