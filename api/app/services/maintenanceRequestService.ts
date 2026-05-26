import Maintenance from '#models/maintenance'
import MaintenanceRequest from '#models/maintenance_request'
import MaintenanceServiceType from '#models/maintenance_service_type'
import MaintenanceStatus from '#models/maintenance_status'
import User from '#models/user'
import UserVehicle from '#models/user_vehicle'
import { DateTime } from 'luxon'

export interface CreateMaintenanceRequestData {
  typeId: number
  vehicleId: number
  technicianId: number
  requestDate: string
}

export default class MaintenanceRequestService {
  public async listServiceTypes() {
    return MaintenanceServiceType.query().orderBy('name', 'asc')
  }

  public async listTechnicians() {
    return User.query().where('type', 'technician').orderBy('lastname', 'asc')
  }

  public async listCustomerVehicles(customerId: number) {
    return UserVehicle.query()
      .where('customer_id', customerId)
      .where('type', 'user_vehicle')
      .preload('model', (modelQuery) => {
        modelQuery.preload('brand')
      })
      .orderBy('created_at', 'desc')
  }

  public async listForUser(userId: number, userType: string) {
    const query = MaintenanceRequest.query()
      .preload('serviceType')
      .preload('userVehicle', (vehicleQuery) => {
        vehicleQuery.preload('model', (modelQuery) => {
          modelQuery.preload('brand')
        })
      })
      .preload('technician')
      .orderBy('request_date', 'desc')

    if (userType === 'technician') {
      query.where('technician_id', userId)
    } else {
      query.where('customer_id', userId)
    }

    return query
  }

  public async findByIdForUser(requestId: number, userId: number, userType: string) {
    const request = await MaintenanceRequest.query()
      .where('id', requestId)
      .preload('serviceType')
      .preload('userVehicle', (vehicleQuery) => {
        vehicleQuery.preload('model', (modelQuery) => {
          modelQuery.preload('brand')
        })
      })
      .preload('technician')
      .preload('customer')
      .first()

    if (!request) {
      throw new Error('REQUEST_NOT_FOUND')
    }

    if (userType === 'technician' && request.technicianId !== userId) {
      throw new Error('REQUEST_FORBIDDEN')
    }
    if (userType !== 'technician' && request.customerId !== userId) {
      throw new Error('REQUEST_FORBIDDEN')
    }

    return request
  }

  public async create(customerId: number, data: CreateMaintenanceRequestData) {
    const requestDate = DateTime.fromISO(data.requestDate, { setZone: true })
    if (!requestDate.isValid) {
      throw new Error('INVALID_DATE')
    }

    if (requestDate < DateTime.now()) {
      throw new Error('DATE_IN_PAST')
    }

    const vehicle = await UserVehicle.query()
      .where('id', data.vehicleId)
      .where('customer_id', customerId)
      .where('type', 'user_vehicle')
      .first()

    if (!vehicle) {
      throw new Error('VEHICLE_NOT_FOUND')
    }

    const serviceType = await MaintenanceServiceType.find(data.typeId)
    if (!serviceType) {
      throw new Error('TYPE_NOT_FOUND')
    }

    const technician = await User.query()
      .where('id', data.technicianId)
      .where('type', 'technician')
      .first()

    if (!technician) {
      throw new Error('TECHNICIAN_NOT_FOUND')
    }

    const request = await MaintenanceRequest.create({
      customerId,
      typeId: data.typeId,
      vehicleId: data.vehicleId,
      technicianId: data.technicianId,
      requestDate,
    })

    const pendingStatus = await MaintenanceStatus.query().where('name', 'En attente').first()
    if (!pendingStatus) {
      throw new Error('STATUS_NOT_FOUND')
    }

    await Maintenance.create({
      customerId,
      technicianId: data.technicianId,
      maintenanceStatusId: pendingStatus.id,
      maintenanceRequestId: request.id,
      typeId: data.typeId,
      vehicleId: data.vehicleId,
      date: requestDate,
    })

    await request.load('serviceType')
    await request.load('userVehicle', (vehicleQuery) => {
      vehicleQuery.preload('model', (modelQuery) => {
        modelQuery.preload('brand')
      })
    })
    await request.load('technician')

    return request
  }
}
