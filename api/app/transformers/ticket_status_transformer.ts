import TicketStatus from '#models/ticket_status'

export default class TicketStatusTransformer {
  static transform(status: TicketStatus) {
    return {
      id: status.id,
      name: status.name,
    }
  }

  static transformCollection(statuses: TicketStatus[]) {
    return statuses.map((status) => this.transform(status))
  }
}
