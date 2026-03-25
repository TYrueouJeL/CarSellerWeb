import Brand from "#models/brand"
import { faker } from '@faker-js/faker'

type BrandType = {
    name?: string
}

export default class BrandFactory {
    static async create(data: BrandType = {}) {
        return Brand.create({
            name: data.name || faker.vehicle.manufacturer()
        })
    }

    static async createMany(count: number) {
        const brands = []
        for (let i = 0; i < count; i++) {
            brands.push(await this.create())
        }
        return brands
    }
}