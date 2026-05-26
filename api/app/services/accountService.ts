import User from '#models/user'
import UserVehicle from '#models/user_vehicle'
import Rental from '#models/rental'
import MaintenanceRequest from '#models/maintenance_request'

export interface UpdateProfileData {
  firstname: string
  lastname: string
  email: string
  phoneNumber?: string | null
  password?: string
}

export default class AccountService {
  public async getDashboard(userId: number) {
    const user = await User.findOrFail(userId)

    const vehicles = await UserVehicle.query()
      .where('customer_id', userId)
      .where('type', 'user_vehicle')
      .preload('model', (modelQuery) => {
        modelQuery.preload('brand')
      })
      .orderBy('created_at', 'desc')

    const rentals = await Rental.query()
      .where('user_id', userId)
      .preload('vehicle', (vehicleQuery) => {
        vehicleQuery.preload('model', (modelQuery) => {
          modelQuery.preload('brand')
        })
      })
      .orderBy('start_date', 'desc')

    const maintenanceRequests = await MaintenanceRequest.query()
      .where('customer_id', userId)
      .preload('serviceType')
      .orderBy('request_date', 'desc')
      .limit(10)

    return { user, vehicles, rentals, maintenanceRequests }
  }

  public async updateProfile(userId: number, data: UpdateProfileData): Promise<User> {
    const user = await User.findOrFail(userId)

    const emailTaken = await User.query()
      .where('email', data.email)
      .whereNot('id', userId)
      .first()

    if (emailTaken) {
      throw new Error('EMAIL_ALREADY_USED')
    }

    user.merge({
      firstname: data.firstname,
      lastname: data.lastname,
      email: data.email,
      phoneNumber: data.phoneNumber ?? null,
    })

    if (data.password) {
      user.password = data.password
    }

    await user.save()
    return user
  }
}
