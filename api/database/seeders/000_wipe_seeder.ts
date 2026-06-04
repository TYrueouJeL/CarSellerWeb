import { BaseSeeder } from "@adonisjs/lucid/seeders";
import db from '@adonisjs/lucid/services/db'

export default class WipeSeeder extends BaseSeeder {
    async run() {
        // Nettoyage dans l'ordre inverse des dépendances
        await db.from('ticket_comment').delete()
        await db.from('ticket').delete()
        await db.from('rental').delete()
        await db.from('maintenance').delete()
        await db.from('maintenance_request').delete()
        await db.from('vehicle').delete()
        await db.from('model').delete()
        await db.from('brand').delete()
        await db.from('category').delete()
        await db.from('user').delete()
        await db.from('maintenance_status').delete()
        await db.from('maintenance_service_type').delete()
        await db.from('ticket_status').delete()
    }
}