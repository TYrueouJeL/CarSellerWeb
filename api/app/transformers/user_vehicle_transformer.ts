import Vehicle from '#models/vehicle'

export default class UserVehicleTransformer {
    static transform(vehicle: Vehicle) {
        return {
            id: vehicle.id,
            year: vehicle.year,
            registration: vehicle.registration,
            mileage: Number(vehicle.mileage),
            price: vehicle.price ? Number(vehicle.price) : null,
            type: vehicle.type,
            customerId: vehicle.customerId,
            createdAt: vehicle.createdAt,
            updatedAt: vehicle.updatedAt,

            model: vehicle.$preloaded.model
                ? {
                      id: vehicle.model.id,
                      name: vehicle.model.name,
                      brand: vehicle.model.$preloaded.brand
                          ? {
                                id: vehicle.model.brand.id,
                                name: vehicle.model.brand.name,
                            }
                          : undefined,
                  }
                : undefined,
        }
    }

    static transformCollection(vehicles: Vehicle[]) {
        return vehicles.map((vehicle) => this.transform(vehicle))
    }
}
