import Model from "#models/model"
import Brand from "#models/brand"
import Category from "#models/category"
import { faker } from '@faker-js/faker'

type ModelType = {
    name?: string
    brandId?: number
    categoryId?: number
}

export default class ModelFactory {
    static async getRandomBrandId(): Promise<number> {
        const brands = await Brand.query().select('id')
        if (brands.length === 0) {
            throw new Error('No brands found in database')
        }
        const randomIndex = faker.number.int({ min: 0, max: brands.length - 1 })
        return brands[randomIndex].id
    }

    static async getRandomCategoryId(): Promise<number> {
        const categories = await Category.query().select('id')
        if (categories.length === 0) {
            throw new Error('No categories found in database')
        }
        const randomIndex = faker.number.int({ min: 0, max: categories.length - 1 })
        return categories[randomIndex].id
    }

    static async create(data: ModelType = {}) {
        const brandId = data.brandId || await this.getRandomBrandId()
        const categoryId = data.categoryId || await this.getRandomCategoryId()
        
        return Model.create({
            name: data.name || faker.vehicle.model(),
            brandId: brandId,
            categoryId: categoryId
        })
    }

    static async createMany(count: number) {
        const models = []
        for (let i = 0; i < count; i++) {
            models.push(await this.create())
        }
        return models
    }
}
