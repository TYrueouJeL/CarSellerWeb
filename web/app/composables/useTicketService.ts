import type {
    CreateTicketCommentPayload,
    CreateTicketPayload,
    Ticket,
    TicketComment,
    TicketStatus,
} from '~/types/ticket'
import { useApiClient } from '~/services/api'

export const useTicketService = () => {
    const api = useApiClient()

    function listStatuses() {
        return api<{ data: TicketStatus[] }>('/ticket/statuses')
    }

    function list() {
        return api<{ data: Ticket[] }>('/ticket')
    }

    function findById(id: number) {
        return api<{ data: Ticket }>(`/ticket/${id}`)
    }

    function create(body: CreateTicketPayload) {
        return api<{ data: Ticket; message: string }>('/ticket', {
            method: 'POST',
            body,
        })
    }

    function addComment(ticketId: number, body: CreateTicketCommentPayload) {
        return api<{ data: TicketComment; message: string }>(`/ticket/${ticketId}/comments`, {
            method: 'POST',
            body,
        })
    }

    return { listStatuses, list, findById, create, addComment }
}
