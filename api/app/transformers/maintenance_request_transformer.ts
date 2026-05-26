import MaintenanceRequest from '#models/maintenance_request'
import MaintenanceServiceTypeTransformer from '#transformers/maintenance_service_type_transformer'
import UserVehicleTransformer from '#transformers/user_vehicle_transformer'

export default class MaintenanceRequestTransformer {
  static transform(request: MaintenanceRequest) {
    const requestDate = request.requestDate
    return {
      id: request.id,
      customerId: request.customerId,
      typeId: request.typeId,
      vehicleId: request.vehicleId,
      technicianId: request.technicianId,
      requestDate: requestDate.toISO(),
      approvedDate: request.approvedDate?.toISO() ?? null,
      createdAt: request.createdAt.toISO(),
      updatedAt: request.updatedAt.toISO(),
      statusLabel: request.approvedDate ? 'Approuvé' : 'En attente',
      serviceType: request.$preloaded.serviceType
        ? MaintenanceServiceTypeTransformer.transform(request.serviceType)
        : undefined,
      vehicle: request.$preloaded.userVehicle
        ? UserVehicleTransformer.transform(request.userVehicle)
        : undefined,
      technician: request.$preloaded.technician
        ? {
            id: request.technician.id,
            firstname: request.technician.firstname,
            lastname: request.technician.lastname,
          }
        : undefined,
      customer: request.$preloaded.customer
        ? {
            id: request.customer.id,
            firstname: request.customer.firstname,
            lastname: request.customer.lastname,
          }
        : undefined,
    }
  }

  static transformCollection(requests: MaintenanceRequest[]) {
    return requests.map((request) => this.transform(request))
  }

  static toAppointmentSummary(request: MaintenanceRequest) {
    const iso = request.requestDate.toISO()!
    const [date, timePart] = iso.split('T')
    const time = timePart ? timePart.slice(0, 5) : undefined

    return {
      id: request.id,
      date: date!,
      time,
      subject: request.$preloaded.serviceType?.name ?? 'Rendez-vous',
      status: request.approvedDate ? 'Approuvé' : 'En attente',
    }
  }
}
