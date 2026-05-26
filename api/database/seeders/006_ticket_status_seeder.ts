import { BaseSeeder } from '@adonisjs/lucid/seeders'
import TicketStatus from '#models/ticket_status'

export default class extends BaseSeeder {
  async run() {
    const statuses = ['Ouvert', 'En cours', 'En attente', 'Résolu', 'Fermé']

    for (const name of statuses) {
      await TicketStatus.firstOrCreate({ name }, { name })
    }
  }
}
