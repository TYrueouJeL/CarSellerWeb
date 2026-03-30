import '@adonisjs/core/types/http'

type ParamValue = string | number | bigint | boolean

export type ScannedRoutes = {
  ALL: {
    'auth.new_account.store': { paramsTuple?: []; params?: {} }
    'auth.access_token.store': { paramsTuple?: []; params?: {} }
    'auth.access_token.destroy': { paramsTuple?: []; params?: {} }
    'profile.profile.show': { paramsTuple?: []; params?: {} }
    'salable_vehicles.index': { paramsTuple?: []; params?: {} }
    'salable_vehicles.show': { paramsTuple: [ParamValue]; params: {'vehicleId': ParamValue} }
    'salable_vehicles.store': { paramsTuple?: []; params?: {} }
    'salable_vehicles.update': { paramsTuple: [ParamValue]; params: {'vehicleId': ParamValue} }
    'salable_vehicles.delete': { paramsTuple: [ParamValue]; params: {'vehicleId': ParamValue} }
  }
  GET: {
    'profile.profile.show': { paramsTuple?: []; params?: {} }
    'salable_vehicles.index': { paramsTuple?: []; params?: {} }
    'salable_vehicles.show': { paramsTuple: [ParamValue]; params: {'vehicleId': ParamValue} }
  }
  HEAD: {
    'profile.profile.show': { paramsTuple?: []; params?: {} }
    'salable_vehicles.index': { paramsTuple?: []; params?: {} }
    'salable_vehicles.show': { paramsTuple: [ParamValue]; params: {'vehicleId': ParamValue} }
  }
  POST: {
    'auth.new_account.store': { paramsTuple?: []; params?: {} }
    'auth.access_token.store': { paramsTuple?: []; params?: {} }
    'auth.access_token.destroy': { paramsTuple?: []; params?: {} }
    'salable_vehicles.store': { paramsTuple?: []; params?: {} }
  }
  PUT: {
    'salable_vehicles.update': { paramsTuple: [ParamValue]; params: {'vehicleId': ParamValue} }
  }
  DELETE: {
    'salable_vehicles.delete': { paramsTuple: [ParamValue]; params: {'vehicleId': ParamValue} }
  }
}
declare module '@adonisjs/core/types/http' {
  export interface RoutesList extends ScannedRoutes {}
}