import type { HttpContext } from '@adonisjs/core/http'
import TicketService from '#services/ticketService'
import { createTicketCommentValidator, createTicketValidator } from '#validators/ticket'
import TicketTransformer from '#transformers/ticket_transformer'
import TicketStatusTransformer from '#transformers/ticket_status_transformer'
import TicketCommentTransformer from '#transformers/ticket_comment_transformer'

const ticketErrors: Record<string, { status: number; message: string }> = {
  TICKET_NOT_FOUND: { status: 404, message: 'Ticket introuvable' },
  TICKET_FORBIDDEN: { status: 403, message: 'Accès refusé à ce ticket' },
  STATUS_NOT_FOUND: { status: 500, message: 'Statut par défaut introuvable' },
}

export default class TicketsController {
  private ticketService = new TicketService()

  private handleError(response: HttpContext['response'], error: unknown) {
    if (error instanceof Error && ticketErrors[error.message]) {
      const err = ticketErrors[error.message]
      return response.status(err.status).json({ message: err.message })
    }
    throw error
  }

  public async statuses({ response }: HttpContext) {
    const statuses = await this.ticketService.listStatuses()
    return response.json({
      data: TicketStatusTransformer.transformCollection(statuses),
    })
  }

  public async index({ auth, response }: HttpContext) {
    const user = auth.getUserOrFail()
    try {
      const tickets = await this.ticketService.listForUser(user.id, user.type)
      return response.json({
        data: TicketTransformer.transformCollection(tickets),
      })
    } catch (error) {
      return this.handleError(response, error)
    }
  }

  public async show({ auth, params, response }: HttpContext) {
    const user = auth.getUserOrFail()
    try {
      const ticket = await this.ticketService.findByIdForUser(
        Number(params.ticketId),
        user.id,
        user.type,
      )
      return response.json({
        data: TicketTransformer.transform(ticket, { includeComments: true }),
      })
    } catch (error) {
      return this.handleError(response, error)
    }
  }

  public async store({ auth, request, response }: HttpContext) {
    const user = auth.getUserOrFail()
    const payload = await request.validateUsing(createTicketValidator)

    try {
      const ticket = await this.ticketService.create(user.id, payload)
      return response.created({
        data: TicketTransformer.transform(ticket),
        message: 'Ticket créé avec succès',
      })
    } catch (error) {
      return this.handleError(response, error)
    }
  }

  public async storeComment({ auth, params, request, response }: HttpContext) {
    const user = auth.getUserOrFail()
    const payload = await request.validateUsing(createTicketCommentValidator)

    try {
      const comment = await this.ticketService.addComment(
        Number(params.ticketId),
        user.id,
        user.type,
        payload.comment,
      )
      return response.created({
        data: TicketCommentTransformer.transform(comment),
        message: 'Commentaire ajouté',
      })
    } catch (error) {
      return this.handleError(response, error)
    }
  }
}
