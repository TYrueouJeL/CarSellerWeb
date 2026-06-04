import { BaseSeeder } from '@adonisjs/lucid/seeders'
import Ticket from '#models/ticket'
import TicketStatus from '#models/ticket_status'
import User from '#models/user'
import { faker } from '@faker-js/faker'

export default class TicketSeeder extends BaseSeeder {
  async run() {
    const customers = await User.query().where('type', 'customer').select('id')
    const technicians = await User.query().where('type', 'technician').select('id')
    const statuses = await TicketStatus.all()

    if (customers.length === 0 || technicians.length === 0 || statuses.length === 0) {
      console.log('Skipping ticket seeder: missing required data')
      return
    }

    for (let i = 0; i < 20; i++) {
      const customer = customers[faker.number.int({ min: 0, max: customers.length - 1 })]
      const technician = technicians[faker.number.int({ min: 0, max: technicians.length - 1 })]
      const status = statuses[faker.number.int({ min: 0, max: statuses.length - 1 })]

      await Ticket.create({
        customerId: customer.id,
        technicianId: technician.id,
        statusId: status.id,
        title: faker.lorem.sentence(),
        description: faker.lorem.paragraph()
      })
    }
  }
}
