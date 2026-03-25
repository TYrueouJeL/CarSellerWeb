import { BaseSeeder } from "@adonisjs/lucid/seeders";
import db from '@adonisjs/lucid/services/db'

export default class WipeSeeder extends BaseSeeder {
    async run() {
        await db.from('vehicle').delete()
        await db.from('model').delete()
        await db.from('category').delete()
        await db.from('brand').delete()
        await db.from('user').delete()
    }
}