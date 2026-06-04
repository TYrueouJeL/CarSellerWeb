import { BaseSeeder } from '@adonisjs/lucid/seeders'
import UserFactory from '../../app/factory/userFactory.ts'
import User from '#models/user'

export default class UserSeeder extends BaseSeeder {

  async run() {
    await UserFactory.createMany(5)
    await User.create({
      email: 'admin@admin.com',
      firstname: 'Admin',
      lastname: 'User',
      password: 'password123',
      roles: JSON.stringify(['ROLE_ADMIN']),
      type: 'technician'
    })
    await User.create({
      email: 'technician@technician.com',
      firstname: 'Technician',
      lastname: 'User',
      password: 'password123',
      roles: JSON.stringify(['ROLE_TECHNICIAN']),
      type: 'technician'
    })
    await User.create({
      email: 'manager@manager.com',
      firstname: 'Manager',
      lastname: 'User',
      password: 'password123',
      roles: JSON.stringify(['ROLE_MANAGER']),
      type: 'technician'
    })
    await User.create({
      email: 'customer@customer.com',
      firstname: 'Customer',
      lastname: 'User',
      password: 'password123',
      roles: JSON.stringify(['ROLE_CUSTOMER']),
      type: 'customer'
    })
  }
}
