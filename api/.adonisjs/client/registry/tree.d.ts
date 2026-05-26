/* eslint-disable prettier/prettier */
import type { routes } from './index.ts'

export interface ApiDefinition {
  auth: {
    newAccount: {
      store: typeof routes['auth.new_account.store']
    }
    accessToken: {
      store: typeof routes['auth.access_token.store']
      destroy: typeof routes['auth.access_token.destroy']
    }
  }
  profile: {
    profile: {
      show: typeof routes['profile.profile.show']
      dashboard: typeof routes['profile.profile.dashboard']
      update: typeof routes['profile.profile.update']
    }
  }
  salableVehicles: {
    index: typeof routes['salable_vehicles.index']
    show: typeof routes['salable_vehicles.show']
    purchase: typeof routes['salable_vehicles.purchase']
    store: typeof routes['salable_vehicles.store']
    update: typeof routes['salable_vehicles.update']
    delete: typeof routes['salable_vehicles.delete']
  }
  rentableVehicles: {
    index: typeof routes['rentable_vehicles.index']
    rentals: typeof routes['rentable_vehicles.rentals']
    checkAvailability: typeof routes['rentable_vehicles.check_availability']
    show: typeof routes['rentable_vehicles.show']
    rent: typeof routes['rentable_vehicles.rent']
    store: typeof routes['rentable_vehicles.store']
    update: typeof routes['rentable_vehicles.update']
    delete: typeof routes['rentable_vehicles.delete']
  }
  brands: {
    index: typeof routes['brands.index']
    show: typeof routes['brands.show']
  }
  models: {
    index: typeof routes['models.index']
    show: typeof routes['models.show']
  }
  maintenanceRequests: {
    serviceTypes: typeof routes['maintenance_requests.service_types']
    technicians: typeof routes['maintenance_requests.technicians']
    vehicles: typeof routes['maintenance_requests.vehicles']
    index: typeof routes['maintenance_requests.index']
    store: typeof routes['maintenance_requests.store']
    show: typeof routes['maintenance_requests.show']
  }
  tickets: {
    statuses: typeof routes['tickets.statuses']
    index: typeof routes['tickets.index']
    store: typeof routes['tickets.store']
    show: typeof routes['tickets.show']
    storeComment: typeof routes['tickets.store_comment']
  }
}
