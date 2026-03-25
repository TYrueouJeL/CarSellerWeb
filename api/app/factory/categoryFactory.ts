import Category from "#models/category"
import { faker } from '@faker-js/faker'

type CategoryType = {
    name?: string
}


// liste:
//        { name: 'Berline' },
    //   { name: 'SUV' },
    //   { name: 'Compacte' },
    //   { name: 'Citadine' },
    //   { name: 'Monospace' },
    //   { name: 'Cabriolet' },
    //   { name: 'Coupé' },
    //   { name: 'Break' },
    //   { name: 'Pickup' },
    //   { name: 'Utilitaire' },
    //   { name: 'Sportive' },
    //   { name: 'Électrique' },
    //   { name: 'Hybride' }

export default class CategoryFactory {
    static async create(data: CategoryType = {}) {
        return Category.create({
            name: data.name || faker.vehicle.type()
        })
    }

    static async createMany(count: number) {
        const categories = []
        for (let i = 0; i < count; i++) {
            categories.push(await this.create())
        }
        return categories
    }
}