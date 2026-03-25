import Vehicle from "#models/vehicle"
import Model from "#models/model"
import { faker } from '@faker-js/faker'
import ModelFactory from "./modelFactory.ts"

type VehicleType = {
    modelId?: number
    year?: number
    registration?: string
    mileage?: string
    type?: 'salable_vehicle' | 'rentable_vehicle' | 'user_vehicle'
    price?: number
    dailyPrice?: number
    customerId?: number
}

export default class VehicleFactory {
    static async getRandomModelId(): Promise<number> {
        const models = await Model.query().select('id')
        if (models.length === 0) {
            throw new Error('No models found in database')
        }
        const randomIndex = faker.number.int({ min: 0, max: models.length - 1 })
        return models[randomIndex].id
    }

    static async create(data: VehicleType = {}) {
        const modelId = data.modelId || await this.getRandomModelId()
        const vehicleType = data.type || 'salable_vehicle'
        
        const vehicleData: any = {
            modelId: modelId,
            year: data.year || faker.number.int({ min: 2000, max: 2025 }),
            registration: data.registration || `${faker.string.alpha({ length: 2, casing: 'upper' })}-${faker.number.int({ min: 1, max: 999 }).toString().padStart(3, '0')}-${faker.string.alpha({ length: 2, casing: 'upper' })}`,
            mileage: data.mileage || faker.number.int({ min: 0, max: 200000 }).toString(),
            type: vehicleType,
            customerId: data.customerId
        }

        if (vehicleType === 'rentable_vehicle') {
            vehicleData.dailyPrice = data.dailyPrice || faker.number.float({ min: 50, max: 200 })
        } else {
            vehicleData.price = data.price || faker.number.float({ min: 5000, max: 50000 })
        }

        return Vehicle.create(vehicleData)
    }

    static async createMany(count: number, type?: 'salable_vehicle' | 'rentable_vehicle' | 'user_vehicle', customerId?: number) {
        const vehicles = []
        for (let i = 0; i < count; i++) {
            vehicles.push(await this.create({ type: type, customerId: customerId }))
        }
        return vehicles
    }
}
