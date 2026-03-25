import User from "#models/user"
import { faker } from '@faker-js/faker'
import VehicleFactory from "./vehicleFactory.ts"

type UserType = {
    firstname?: string
    lastname?: string
    email?: string
    password?: string
    roles?: JSON
    type?: string
}

export default class UserFactory {
    static async create(data: UserType = {}) {
        const user = await User.create({
            firstname: data.firstname || faker.person.firstName(),
            lastname: data.lastname || faker.person.lastName(),
            email: data.email || faker.internet.email(),
            password: data.password || 'password123',
            roles: JSON.stringify(['customer']),
            type: 'customer'
        })

        await VehicleFactory.createMany(5, 'user_vehicle', user.id);
    }

    static async createMany(count: number) {
        const users = []
        for (let i = 0; i < count; i++) {
            users.push(await this.create())
        }
        return users
    }
}
