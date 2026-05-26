import type { HttpContext } from '@adonisjs/core/http'
import MaintenanceRequestService from '#services/maintenanceRequestService'
import { createMaintenanceRequestValidator } from '#validators/maintenance_request'
import MaintenanceRequestTransformer from '#transformers/maintenance_request_transformer'
import MaintenanceServiceTypeTransformer from '#transformers/maintenance_service_type_transformer'
import UserVehicleTransformer from '#transformers/user_vehicle_transformer'
const requestErrors: Record<string, { status: number; message: string }> = {
  REQUEST_NOT_FOUND: { status: 404, message: 'Demande introuvable' },
  REQUEST_FORBIDDEN: { status: 403, message: 'Accès refusé' },
  INVALID_DATE: { status: 422, message: 'Date ou heure invalide' },
  DATE_IN_PAST: { status: 422, message: 'La date doit être dans le futur' },
  VEHICLE_NOT_FOUND: { status: 404, message: 'Véhicule introuvable ou non autorisé' },
  TYPE_NOT_FOUND: { status: 404, message: 'Type de prestation introuvable' },
  TECHNICIAN_NOT_FOUND: { status: 404, message: 'Technicien introuvable' },
  STATUS_NOT_FOUND: { status: 500, message: 'Statut par défaut introuvable' },
}

export default class MaintenanceRequestsController {
  private maintenanceRequestService = new MaintenanceRequestService()

  private handleError(response: HttpContext['response'], error: unknown) {
    if (error instanceof Error && requestErrors[error.message]) {
      const err = requestErrors[error.message]
      return response.status(err.status).json({ message: err.message })
    }
    throw error
  }

  public async serviceTypes({ response }: HttpContext) {
    const types = await this.maintenanceRequestService.listServiceTypes()
    return response.json({
      data: MaintenanceServiceTypeTransformer.transformCollection(types),
    })
  }

  public async technicians({ response }: HttpContext) {
    const technicians = await this.maintenanceRequestService.listTechnicians()
    return response.json({
      data: technicians.map((technician) => ({
        id: technician.id,
        firstname: technician.firstname,
        lastname: technician.lastname,
        email: technician.email,
      })),
    })
  }

  public async vehicles({ auth, response }: HttpContext) {
    const user = auth.getUserOrFail()
    const vehicles = await this.maintenanceRequestService.listCustomerVehicles(user.id)
    return response.json({
      data: UserVehicleTransformer.transformCollection(vehicles),
    })
  }

  public async index({ auth, response }: HttpContext) {
    const user = auth.getUserOrFail()
    try {
      const requests = await this.maintenanceRequestService.listForUser(user.id, user.type)
      return response.json({
        data: MaintenanceRequestTransformer.transformCollection(requests),
      })
    } catch (error) {
      return this.handleError(response, error)
    }
  }

  public async show({ auth, params, response }: HttpContext) {
    const user = auth.getUserOrFail()
    try {
      const request = await this.maintenanceRequestService.findByIdForUser(
        Number(params.requestId),
        user.id,
        user.type,
      )
      return response.json({
        data: MaintenanceRequestTransformer.transform(request),
      })
    } catch (error) {
      return this.handleError(response, error)
    }
  }

  public async store({ auth, request, response }: HttpContext) {
    const user = auth.getUserOrFail()
    const payload = await request.validateUsing(createMaintenanceRequestValidator)

    try {
      const maintenanceRequest = await this.maintenanceRequestService.create(user.id, payload)
      return response.created({
        data: MaintenanceRequestTransformer.transform(maintenanceRequest),
        message: 'Demande de rendez-vous enregistrée',
      })
    } catch (error) {
      return this.handleError(response, error)
    }
  }
}
