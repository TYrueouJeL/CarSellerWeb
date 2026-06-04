import { BaseSeeder } from '@adonisjs/lucid/seeders'
import Maintenance from '#models/maintenance'
import MaintenanceRequest from '#models/maintenance_request'
import MaintenanceStatus from '#models/maintenance_status'
import MaintenanceServiceType from '#models/maintenance_service_type'
import User from '#models/user'
import UserVehicle from '#models/user_vehicle'
import { faker } from '@faker-js/faker'
import { DateTime } from 'luxon'

export default class extends BaseSeeder {
  async run() {
    const statuses = ['En attente', 'Approuvé', 'En cours', 'Terminé', 'Annulé']
    for (const name of statuses) {
      await MaintenanceStatus.firstOrCreate({ name }, { name })
    }

    const types = [
      {
        name: 'Contrôle technique',
        description: 'Contrôle réglementaire du véhicule (pollution, freins, éclairage…).',
        price: '79.9',
        duration: 45,
      },
      {
        name: 'Vidange',
        description: 'Remplacement huile moteur et filtre à huile.',
        price: '89.0',
        duration: 60,
      },
      {
        name: 'Joint de culasse',
        description: 'Remplacement du joint de culasse et contrôles associés.',
        price: '650.0',
        duration: 480,
      },
      {
        name: 'Révision complète',
        description: 'Contrôle des points de sécurité et remplacement des consommables.',
        price: '199.0',
        duration: 120,
      },
      {
        name: 'Diagnostic électronique',
        description: 'Lecture des codes défaut et rapport détaillé.',
        price: '59.0',
        duration: 30,
      },
    ]

    for (const type of types) {
      await MaintenanceServiceType.firstOrCreate({ name: type.name }, type)
    }

    const technicianCount = await User.query().where('type', 'technician').count('* as total')
    if (Number(technicianCount[0].$extras.total) === 0) {
      await User.create({
        firstname: 'Marc',
        lastname: 'Garage',
        email: 'technicien@carseller.fr',
        password: 'password123',
        roles: JSON.stringify(['ROLE_TECHNICIAN']),
        type: 'technician',
      })
    }

    await this.seedMaintenanceRequests()
  }

  private async seedMaintenanceRequests() {
    const vehicles = await UserVehicle.query()
      .where('type', 'user_vehicle')
      .whereNotNull('customerId')
      .select('id', 'customerId')

    const technicians = await User.query().where('type', 'technician').select('id')
    const serviceTypes = await MaintenanceServiceType.all()
    const statuses = await MaintenanceStatus.all()
    const statusByName = new Map(statuses.map((s) => [s.name, s.id]))

    if (vehicles.length === 0 || technicians.length === 0 || serviceTypes.length === 0) {
      console.log('Skipping maintenance requests seeder: missing required data')
      return
    }

    const approvedMaintenanceStatuses = ['Approuvé', 'En cours', 'Terminé', 'Annulé']

    for (let i = 0; i < 25; i++) {
      const vehicle = vehicles[faker.number.int({ min: 0, max: vehicles.length - 1 })]
      const technician = technicians[faker.number.int({ min: 0, max: technicians.length - 1 })]
      const serviceType = serviceTypes[faker.number.int({ min: 0, max: serviceTypes.length - 1 })]

      const requestDate = DateTime.fromJSDate(
        faker.date.between({
          from: DateTime.now().minus({ months: 2 }).toJSDate(),
          to: DateTime.now().plus({ months: 2 }).toJSDate(),
        })
      )

      const isApproved = faker.datatype.boolean({ probability: 0.55 })
      const approvedDate = isApproved
        ? requestDate.plus({ days: faker.number.int({ min: 1, max: 5 }) })
        : null

      const maintenanceStatusName = approvedDate
        ? faker.helpers.arrayElement(approvedMaintenanceStatuses)
        : 'En attente'

      const maintenanceStatusId = statusByName.get(maintenanceStatusName)
      if (!maintenanceStatusId || !vehicle.customerId) {
        continue
      }

      const request = await MaintenanceRequest.create({
        customerId: vehicle.customerId,
        typeId: serviceType.id,
        vehicleId: vehicle.id,
        technicianId: technician.id,
        requestDate,
        approvedDate,
      })

      await Maintenance.create({
        customerId: vehicle.customerId,
        technicianId: technician.id,
        maintenanceStatusId,
        maintenanceRequestId: request.id,
        typeId: serviceType.id,
        vehicleId: vehicle.id,
        date: requestDate,
      })
    }
  }
}
