import { BaseSeeder } from '@adonisjs/lucid/seeders'
import MaintenanceStatus from '#models/maintenance_status'
import MaintenanceServiceType from '#models/maintenance_service_type'
import User from '#models/user'

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
        roles: JSON.stringify(['technician']),
        type: 'technician',
      })
    }
  }
}
