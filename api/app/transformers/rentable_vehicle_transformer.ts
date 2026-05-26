import RentableVehicle from "#models/rentable_vehicle";

export default class RentableVehicleTransformer {
    static transform(vehicle: RentableVehicle) {
        return {
            id: vehicle.id,
            year: vehicle.year,
            registration: vehicle.registration,
            mileage: Number(vehicle.mileage),
            dailyPrice: vehicle.dailyPrice ? Number(vehicle.dailyPrice) : null,
            available: vehicle.customerId === null,
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
        };
    }

    static transformCollection(vehicles: RentableVehicle[]) {
        return vehicles.map((v) => this.transform(v));
    }
}
