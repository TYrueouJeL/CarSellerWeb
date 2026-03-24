import { belongsTo } from '@adonisjs/lucid/orm';
import Vehicle from './vehicle.ts';
import User from './user.ts';
import type { BelongsTo } from '@adonisjs/lucid/types/relations';

export default class UserVehicle extends Vehicle {
    static table = 'vehicle'
    static where = { type: 'user_vehicle' }

    @belongsTo(() => User, { foreignKey: 'customerId' })
    declare customer: BelongsTo<typeof User>
}