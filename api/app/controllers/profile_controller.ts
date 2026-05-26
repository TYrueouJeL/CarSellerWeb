import UserTransformer from '#transformers/user_transformer'
import UserVehicleTransformer from '#transformers/user_vehicle_transformer'
import RentalTransformer from '#transformers/rental_transformer'
import MaintenanceRequestTransformer from '#transformers/maintenance_request_transformer'
import AccountService from '#services/accountService'
import { updateProfileValidator } from '#validators/user'
import type { HttpContext } from '@adonisjs/core/http'

const profileErrors: Record<string, { status: number; message: string }> = {
  EMAIL_ALREADY_USED: { status: 422, message: 'Cet email est déjà utilisé' },
}

export default class ProfileController {
  private accountService = new AccountService()

  async show({ auth, serialize }: HttpContext) {
    return serialize({
      user: UserTransformer.transform(auth.getUserOrFail()),
    })
  }

  async dashboard({ auth, serialize }: HttpContext) {
    const userId = auth.getUserOrFail().id
    const { user, vehicles, rentals, maintenanceRequests } =
      await this.accountService.getDashboard(userId)

    return serialize({
      user: UserTransformer.transform(user),
      vehicles: vehicles.map((vehicle) => UserVehicleTransformer.transform(vehicle)),
      rentals: rentals.map((rental) => RentalTransformer.transform(rental)),
      appointments: maintenanceRequests.map((request) =>
        MaintenanceRequestTransformer.toAppointmentSummary(request),
      ),
    })
  }

  async update({ auth, request, serialize, response }: HttpContext) {
    const payload = await request.validateUsing(updateProfileValidator)
    const userId = auth.getUserOrFail().id

    if (payload.password && payload.password !== payload.passwordConfirmation) {
      return response.unprocessableEntity({
        message: 'La confirmation du mot de passe ne correspond pas',
      })
    }

    try {
      const user = await this.accountService.updateProfile(userId, {
        firstname: payload.firstname,
        lastname: payload.lastname,
        email: payload.email,
        phoneNumber: payload.phoneNumber,
        password: payload.password,
      })

      return serialize({
        user: UserTransformer.transform(user),
        message: 'Profil mis à jour avec succès',
      })
    } catch (error) {
      if (error instanceof Error && profileErrors[error.message]) {
        const err = profileErrors[error.message]
        return response.status(err.status).json({ message: err.message })
      }
      throw error
    }
  }
}
