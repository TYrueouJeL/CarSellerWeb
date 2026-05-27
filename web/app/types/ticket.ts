export interface TicketStatus {
    id: number
    name: string
}

export interface TicketAuthor {
    id: number
    firstname: string
    lastname: string
    type?: string
}

export interface TicketComment {
    id: number
    comment: string
    createdAt: string
    ticketId: number
    authorId: number
    author?: TicketAuthor
}

export interface Ticket {
    id: number
    title: string
    description: string
    createdAt: string
    updatedAt: string | null
    statusId: number
    customerId: number
    technicianId: number | null
    status?: TicketStatus
    customer?: TicketAuthor & { email?: string }
    technician?: TicketAuthor & { email?: string }
    comments?: TicketComment[]
    commentsCount?: number
}

export interface CreateTicketPayload {
    title: string
    description: string
}

export interface CreateTicketCommentPayload {
    comment: string
}
