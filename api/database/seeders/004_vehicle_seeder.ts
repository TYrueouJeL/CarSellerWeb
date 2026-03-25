import { BaseSeeder } from '@adonisjs/lucid/seeders'
import VehicleFactory from '../../app/factory/vehicleFactory.ts'

export default class VehicleSeeder extends BaseSeeder {
  static environment = ['development', 'testing']

  async run() {
    await VehicleFactory.createMany(10, 'salable_vehicle')
    await VehicleFactory.createMany(5, 'rentable_vehicle')
  }
}