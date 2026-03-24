import Vehicle from './vehicle.ts';

export default class RentableVehicle extends Vehicle {
    static table = 'vehicle'
    static where = { type: 'rentable_vehicle' }
}