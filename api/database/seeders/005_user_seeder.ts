import { BaseSeeder } from '@adonisjs/lucid/seeders'
import UserFactory from '../../app/factory/userFactory.ts'

export default class UserSeeder extends BaseSeeder {
  static environment = ['development', 'testing']

  async run() {
    await UserFactory.createMany(5)
    await UserFactory.create({
      email: 'admin@example.com',
      firstname: 'Admin',
      lastname: 'User',
      password: 'password123'
    })
  }
}
