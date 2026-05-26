import Rental from '#models/rental'

export default class RentalTransformer {
    static transform(rental: Rental, extras?: { days?: number; dailyPrice?: number }) {
        return {
            id: rental.id,
            vehicleId: rental.vehicleId,
            userId: rental.userId,
            startDate: rental.startDate.toISODate(),
            endDate: rental.endDate.toISODate(),
            totalPrice: Number(rental.totalPrice),
            days: extras?.days,
            dailyPrice: extras?.dailyPrice,
            createdAt: rental.createdAt,
            updatedAt: rental.updatedAt,
            vehicle: rental.$preloaded.vehicle
                ? {
                      id: rental.vehicle.id,
                      registration: rental.vehicle.registration,
                      model: rental.vehicle.$preloaded.model
                          ? {
                                name: rental.vehicle.model.name,
                                brand: rental.vehicle.model.$preloaded.brand
                                    ? { name: rental.vehicle.model.brand.name }
                                    : undefined,
                            }
                          : undefined,
                  }
                : undefined,
        }
    }

    static transformPeriods(periods: { startDate: string; endDate: string }[]) {
        return periods
    }
}
