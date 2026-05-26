import '@adonisjs/core/types/http'

type ParamValue = string | number | bigint | boolean

export type ScannedRoutes = {
  ALL: {
    'auth.new_account.store': { paramsTuple?: []; params?: {} }
    'auth.access_token.store': { paramsTuple?: []; params?: {} }
    'auth.access_token.destroy': { paramsTuple?: []; params?: {} }
    'profile.profile.show': { paramsTuple?: []; params?: {} }
    'profile.profile.dashboard': { paramsTuple?: []; params?: {} }
    'profile.profile.update': { paramsTuple?: []; params?: {} }
    'salable_vehicles.index': { paramsTuple?: []; params?: {} }
    'salable_vehicles.show': { paramsTuple: [ParamValue]; params: {'vehicleId': ParamValue} }
    'salable_vehicles.purchase': { paramsTuple: [ParamValue]; params: {'vehicleId': ParamValue} }
    'salable_vehicles.store': { paramsTuple?: []; params?: {} }
    'salable_vehicles.update': { paramsTuple: [ParamValue]; params: {'vehicleId': ParamValue} }
    'salable_vehicles.delete': { paramsTuple: [ParamValue]; params: {'vehicleId': ParamValue} }
    'rentable_vehicles.index': { paramsTuple?: []; params?: {} }
    'rentable_vehicles.rentals': { paramsTuple: [ParamValue]; params: {'vehicleId': ParamValue} }
    'rentable_vehicles.check_availability': { paramsTuple: [ParamValue]; params: {'vehicleId': ParamValue} }
    'rentable_vehicles.show': { paramsTuple: [ParamValue]; params: {'vehicleId': ParamValue} }
    'rentable_vehicles.rent': { paramsTuple: [ParamValue]; params: {'vehicleId': ParamValue} }
    'rentable_vehicles.store': { paramsTuple?: []; params?: {} }
    'rentable_vehicles.update': { paramsTuple: [ParamValue]; params: {'vehicleId': ParamValue} }
    'rentable_vehicles.delete': { paramsTuple: [ParamValue]; params: {'vehicleId': ParamValue} }
    'brands.index': { paramsTuple?: []; params?: {} }
    'brands.show': { paramsTuple: [ParamValue]; params: {'brandId': ParamValue} }
    'models.index': { paramsTuple?: []; params?: {} }
    'models.show': { paramsTuple: [ParamValue]; params: {'modelId': ParamValue} }
    'maintenance_requests.service_types': { paramsTuple?: []; params?: {} }
    'maintenance_requests.technicians': { paramsTuple?: []; params?: {} }
    'maintenance_requests.vehicles': { paramsTuple?: []; params?: {} }
    'maintenance_requests.index': { paramsTuple?: []; params?: {} }
    'maintenance_requests.store': { paramsTuple?: []; params?: {} }
    'maintenance_requests.show': { paramsTuple: [ParamValue]; params: {'requestId': ParamValue} }
    'tickets.statuses': { paramsTuple?: []; params?: {} }
    'tickets.index': { paramsTuple?: []; params?: {} }
    'tickets.store': { paramsTuple?: []; params?: {} }
    'tickets.show': { paramsTuple: [ParamValue]; params: {'ticketId': ParamValue} }
    'tickets.store_comment': { paramsTuple: [ParamValue]; params: {'ticketId': ParamValue} }
  }
  GET: {
    'profile.profile.show': { paramsTuple?: []; params?: {} }
    'profile.profile.dashboard': { paramsTuple?: []; params?: {} }
    'salable_vehicles.index': { paramsTuple?: []; params?: {} }
    'salable_vehicles.show': { paramsTuple: [ParamValue]; params: {'vehicleId': ParamValue} }
    'rentable_vehicles.index': { paramsTuple?: []; params?: {} }
    'rentable_vehicles.rentals': { paramsTuple: [ParamValue]; params: {'vehicleId': ParamValue} }
    'rentable_vehicles.check_availability': { paramsTuple: [ParamValue]; params: {'vehicleId': ParamValue} }
    'rentable_vehicles.show': { paramsTuple: [ParamValue]; params: {'vehicleId': ParamValue} }
    'brands.index': { paramsTuple?: []; params?: {} }
    'brands.show': { paramsTuple: [ParamValue]; params: {'brandId': ParamValue} }
    'models.index': { paramsTuple?: []; params?: {} }
    'models.show': { paramsTuple: [ParamValue]; params: {'modelId': ParamValue} }
    'maintenance_requests.service_types': { paramsTuple?: []; params?: {} }
    'maintenance_requests.technicians': { paramsTuple?: []; params?: {} }
    'maintenance_requests.vehicles': { paramsTuple?: []; params?: {} }
    'maintenance_requests.index': { paramsTuple?: []; params?: {} }
    'maintenance_requests.show': { paramsTuple: [ParamValue]; params: {'requestId': ParamValue} }
    'tickets.statuses': { paramsTuple?: []; params?: {} }
    'tickets.index': { paramsTuple?: []; params?: {} }
    'tickets.show': { paramsTuple: [ParamValue]; params: {'ticketId': ParamValue} }
  }
  HEAD: {
    'profile.profile.show': { paramsTuple?: []; params?: {} }
    'profile.profile.dashboard': { paramsTuple?: []; params?: {} }
    'salable_vehicles.index': { paramsTuple?: []; params?: {} }
    'salable_vehicles.show': { paramsTuple: [ParamValue]; params: {'vehicleId': ParamValue} }
    'rentable_vehicles.index': { paramsTuple?: []; params?: {} }
    'rentable_vehicles.rentals': { paramsTuple: [ParamValue]; params: {'vehicleId': ParamValue} }
    'rentable_vehicles.check_availability': { paramsTuple: [ParamValue]; params: {'vehicleId': ParamValue} }
    'rentable_vehicles.show': { paramsTuple: [ParamValue]; params: {'vehicleId': ParamValue} }
    'brands.index': { paramsTuple?: []; params?: {} }
    'brands.show': { paramsTuple: [ParamValue]; params: {'brandId': ParamValue} }
    'models.index': { paramsTuple?: []; params?: {} }
    'models.show': { paramsTuple: [ParamValue]; params: {'modelId': ParamValue} }
    'maintenance_requests.service_types': { paramsTuple?: []; params?: {} }
    'maintenance_requests.technicians': { paramsTuple?: []; params?: {} }
    'maintenance_requests.vehicles': { paramsTuple?: []; params?: {} }
    'maintenance_requests.index': { paramsTuple?: []; params?: {} }
    'maintenance_requests.show': { paramsTuple: [ParamValue]; params: {'requestId': ParamValue} }
    'tickets.statuses': { paramsTuple?: []; params?: {} }
    'tickets.index': { paramsTuple?: []; params?: {} }
    'tickets.show': { paramsTuple: [ParamValue]; params: {'ticketId': ParamValue} }
  }
  POST: {
    'auth.new_account.store': { paramsTuple?: []; params?: {} }
    'auth.access_token.store': { paramsTuple?: []; params?: {} }
    'auth.access_token.destroy': { paramsTuple?: []; params?: {} }
    'salable_vehicles.purchase': { paramsTuple: [ParamValue]; params: {'vehicleId': ParamValue} }
    'salable_vehicles.store': { paramsTuple?: []; params?: {} }
    'rentable_vehicles.rent': { paramsTuple: [ParamValue]; params: {'vehicleId': ParamValue} }
    'rentable_vehicles.store': { paramsTuple?: []; params?: {} }
    'maintenance_requests.store': { paramsTuple?: []; params?: {} }
    'tickets.store': { paramsTuple?: []; params?: {} }
    'tickets.store_comment': { paramsTuple: [ParamValue]; params: {'ticketId': ParamValue} }
  }
  PUT: {
    'profile.profile.update': { paramsTuple?: []; params?: {} }
    'salable_vehicles.update': { paramsTuple: [ParamValue]; params: {'vehicleId': ParamValue} }
    'rentable_vehicles.update': { paramsTuple: [ParamValue]; params: {'vehicleId': ParamValue} }
  }
  DELETE: {
    'salable_vehicles.delete': { paramsTuple: [ParamValue]; params: {'vehicleId': ParamValue} }
    'rentable_vehicles.delete': { paramsTuple: [ParamValue]; params: {'vehicleId': ParamValue} }
  }
}
declare module '@adonisjs/core/types/http' {
  export interface RoutesList extends ScannedRoutes {}
}