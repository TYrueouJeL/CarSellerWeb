// app/transformers/salable_vehicle_transformer.ts
import SalableVehicle from "#models/salable_vehicle";

export default class SalableVehicleTransformer {
  static transform(vehicle: SalableVehicle) {
    return {
      id: vehicle.id,
      year: vehicle.year,
      registration: vehicle.registration,
      mileage: Number(vehicle.mileage),
      price: vehicle.price ? Number(vehicle.price) : null,
      available: vehicle.customerId === null,
      createdAt: vehicle.createdAt,
      updatedAt: vehicle.updatedAt,

      model: vehicle.$preloaded.model
        ? {
            id: vehicle.model.id,
            name: vehicle.model.name,
          }
        : undefined,
    };
  } 

  static transformCollection(vehicles: SalableVehicle[]) {
    return vehicles.map((v) => this.transform(v));
  }
}