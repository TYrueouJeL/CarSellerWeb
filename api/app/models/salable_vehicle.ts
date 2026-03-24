import Vehicle from './vehicle.ts'

export default class SalableVehicle extends Vehicle {
    static table = 'vehicle'
    static where = { type: 'salable_vehicle' }
}