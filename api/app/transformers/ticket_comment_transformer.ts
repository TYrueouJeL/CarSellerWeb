import TicketComment from '#models/ticket_comment'

export default class TicketCommentTransformer {
  static transform(comment: TicketComment) {
    return {
      id: comment.id,
      comment: comment.comment,
      createdAt: comment.createdAt.toISO(),
      ticketId: comment.ticketId,
      authorId: comment.authorId,
      author: comment.$preloaded.author
        ? {
            id: comment.author.id,
            firstname: comment.author.firstname,
            lastname: comment.author.lastname,
            type: comment.author.type,
          }
        : undefined,
    }
  }

  static transformCollection(comments: TicketComment[]) {
    return comments.map((comment) => this.transform(comment))
  }
}
