import Rental from '#models/rental'
import RentableVehicle from '#models/rentable_vehicle'
import { DateTime } from 'luxon'

export interface RentalPeriod {
    startDate: string
    endDate: string
}

export default class RentalService {
    public async listByVehicle(vehicleId: number): Promise<RentalPeriod[]> {
        const rentals = await Rental.query()
            .where('vehicle_id', vehicleId)
            .orderBy('start_date', 'asc')

        return rentals.map((rental) => ({
            startDate: rental.startDate.toISODate()!,
            endDate: rental.endDate.toISODate()!,
        }))
    }

    public async create(vehicleId: number, userId: number, startDate: string, endDate: string) {
        const vehicle = await RentableVehicle.query()
            .where('id', vehicleId)
            .where('type', 'rentable_vehicle')
            .first()

        if (!vehicle) {
            throw new Error('VEHICLE_NOT_FOUND')
        }

        if (!vehicle.dailyPrice) {
            throw new Error('VEHICLE_NOT_RENTABLE')
        }

        const start = DateTime.fromISO(startDate, { zone: 'utc' }).startOf('day')
        const end = DateTime.fromISO(endDate, { zone: 'utc' }).startOf('day')
        const today = DateTime.utc().startOf('day')

        if (!start.isValid || !end.isValid) {
            throw new Error('INVALID_DATES')
        }

        if (start < today) {
            throw new Error('START_DATE_IN_PAST')
        }

        if (end < start) {
            throw new Error('END_DATE_BEFORE_START')
        }

        const days = Math.floor(end.diff(start, 'days').days) + 1
        if (days < 1) {
            throw new Error('INVALID_RENTAL_DURATION')
        }

        const available = await this.isAvailable(vehicleId, startDate, endDate)
        if (!available) {
            throw new Error('DATES_NOT_AVAILABLE')
        }

        const dailyPrice = Number(vehicle.dailyPrice)
        const totalPrice = dailyPrice * days

        const rental = await Rental.create({
            vehicleId,
            userId,
            startDate: start,
            endDate: end,
            totalPrice: totalPrice.toFixed(2),
        })

        await rental.load('vehicle', (vehicleQuery) => {
            vehicleQuery.preload('model', (modelQuery) => {
                modelQuery.preload('brand')
            })
        })

        return { rental, days, dailyPrice, totalPrice }
    }

    public async isAvailable(vehicleId: number, startDate: string, endDate: string): Promise<boolean> {
        const overlapping = await Rental.query()
            .where('vehicle_id', vehicleId)
            .where('start_date', '<=', endDate)
            .where('end_date', '>=', startDate)
            .first()

        return !overlapping
    }
}
