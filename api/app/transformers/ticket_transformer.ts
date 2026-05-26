import Ticket from '#models/ticket'
import TicketCommentTransformer from '#transformers/ticket_comment_transformer'
import TicketStatusTransformer from '#transformers/ticket_status_transformer'

export default class TicketTransformer {
  static transform(ticket: Ticket, options?: { includeComments?: boolean }) {
    return {
      id: ticket.id,
      title: ticket.title,
      description: ticket.description,
      createdAt: ticket.createdAt.toISO(),
      updatedAt: ticket.updatedAt?.toISO() ?? null,
      statusId: ticket.statusId,
      customerId: ticket.customerId,
      technicianId: ticket.technicianId,
      status: ticket.$preloaded.ticketStatus
        ? TicketStatusTransformer.transform(ticket.ticketStatus)
        : undefined,
      customer: ticket.$preloaded.customer
        ? {
            id: ticket.customer.id,
            firstname: ticket.customer.firstname,
            lastname: ticket.customer.lastname,
            email: ticket.customer.email,
          }
        : undefined,
      technician: ticket.$preloaded.technician
        ? {
            id: ticket.technician.id,
            firstname: ticket.technician.firstname,
            lastname: ticket.technician.lastname,
            email: ticket.technician.email,
          }
        : undefined,
      comments:
        options?.includeComments && ticket.$preloaded.ticketComments
          ? TicketCommentTransformer.transformCollection(ticket.ticketComments)
          : undefined,
      commentsCount: ticket.$preloaded.ticketComments
        ? ticket.ticketComments.length
        : undefined,
    }
  }

  static transformCollection(tickets: Ticket[]) {
    return tickets.map((ticket) => this.transform(ticket))
  }
}
