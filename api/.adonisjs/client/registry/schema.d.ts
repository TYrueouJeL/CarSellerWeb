/* eslint-disable prettier/prettier */
/// <reference path="../manifest.d.ts" />

import type { ExtractBody, ExtractErrorResponse, ExtractQuery, ExtractQueryForGet, ExtractResponse } from '@tuyau/core/types'
import type { InferInput, SimpleError } from '@vinejs/vine/types'

export type ParamValue = string | number | bigint | boolean

export interface Registry {
  'auth.new_account.store': {
    methods: ["POST"]
    pattern: '/auth/signup'
    types: {
      body: ExtractBody<InferInput<(typeof import('#validators/user').signupValidator)>>
      paramsTuple: []
      params: {}
      query: ExtractQuery<InferInput<(typeof import('#validators/user').signupValidator)>>
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/new_account_controller').default['store']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/new_account_controller').default['store']>>> | { status: 422; response: { errors: SimpleError[] } }
    }
  }
  'auth.access_token.store': {
    methods: ["POST"]
    pattern: '/auth/login'
    types: {
      body: ExtractBody<InferInput<(typeof import('#validators/user').loginValidator)>>
      paramsTuple: []
      params: {}
      query: ExtractQuery<InferInput<(typeof import('#validators/user').loginValidator)>>
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/access_token_controller').default['store']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/access_token_controller').default['store']>>> | { status: 422; response: { errors: SimpleError[] } }
    }
  }
  'auth.access_token.destroy': {
    methods: ["POST"]
    pattern: '/auth/logout'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/access_token_controller').default['destroy']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/access_token_controller').default['destroy']>>>
    }
  }
  'profile.profile.show': {
    methods: ["GET","HEAD"]
    pattern: '/account/profile'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/profile_controller').default['show']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/profile_controller').default['show']>>>
    }
  }
  'profile.profile.dashboard': {
    methods: ["GET","HEAD"]
    pattern: '/account/dashboard'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/profile_controller').default['dashboard']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/profile_controller').default['dashboard']>>>
    }
  }
  'profile.profile.update': {
    methods: ["PUT"]
    pattern: '/account/profile'
    types: {
      body: ExtractBody<InferInput<(typeof import('#validators/user').updateProfileValidator)>>
      paramsTuple: []
      params: {}
      query: ExtractQuery<InferInput<(typeof import('#validators/user').updateProfileValidator)>>
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/profile_controller').default['update']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/profile_controller').default['update']>>> | { status: 422; response: { errors: SimpleError[] } }
    }
  }
  'salable_vehicles.index': {
    methods: ["GET","HEAD"]
    pattern: '/salablevehicle'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: ExtractQueryForGet<InferInput<(typeof import('#validators/salableVehicle').listSalableVehiclesValidator)>>
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/salable_vehicles_controller').default['index']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/salable_vehicles_controller').default['index']>>> | { status: 422; response: { errors: SimpleError[] } }
    }
  }
  'salable_vehicles.show': {
    methods: ["GET","HEAD"]
    pattern: '/salablevehicle/:vehicleId'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { vehicleId: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/salable_vehicles_controller').default['show']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/salable_vehicles_controller').default['show']>>>
    }
  }
  'salable_vehicles.purchase': {
    methods: ["POST"]
    pattern: '/salablevehicle/:vehicleId/purchase'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { vehicleId: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/salable_vehicles_controller').default['purchase']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/salable_vehicles_controller').default['purchase']>>>
    }
  }
  'salable_vehicles.store': {
    methods: ["POST"]
    pattern: '/salablevehicle'
    types: {
      body: ExtractBody<InferInput<(typeof import('#validators/salableVehicle').createSalableVehicleValidator)>>
      paramsTuple: []
      params: {}
      query: ExtractQuery<InferInput<(typeof import('#validators/salableVehicle').createSalableVehicleValidator)>>
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/salable_vehicles_controller').default['store']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/salable_vehicles_controller').default['store']>>> | { status: 422; response: { errors: SimpleError[] } }
    }
  }
  'salable_vehicles.update': {
    methods: ["PUT"]
    pattern: '/salablevehicle/:vehicleId'
    types: {
      body: ExtractBody<InferInput<(typeof import('#validators/salableVehicle').updateSalableVehicleValidator)>>
      paramsTuple: [ParamValue]
      params: { vehicleId: ParamValue }
      query: ExtractQuery<InferInput<(typeof import('#validators/salableVehicle').updateSalableVehicleValidator)>>
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/salable_vehicles_controller').default['update']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/salable_vehicles_controller').default['update']>>> | { status: 422; response: { errors: SimpleError[] } }
    }
  }
  'salable_vehicles.delete': {
    methods: ["DELETE"]
    pattern: '/salablevehicle/:vehicleId'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { vehicleId: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/salable_vehicles_controller').default['delete']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/salable_vehicles_controller').default['delete']>>>
    }
  }
  'rentable_vehicles.index': {
    methods: ["GET","HEAD"]
    pattern: '/rentablevehicle'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: ExtractQueryForGet<InferInput<(typeof import('#validators/rentableVehicle').listRentableVehiclesValidator)>>
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/rentable_vehicles_controller').default['index']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/rentable_vehicles_controller').default['index']>>> | { status: 422; response: { errors: SimpleError[] } }
    }
  }
  'rentable_vehicles.rentals': {
    methods: ["GET","HEAD"]
    pattern: '/rentablevehicle/:vehicleId/rentals'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { vehicleId: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/rentable_vehicles_controller').default['rentals']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/rentable_vehicles_controller').default['rentals']>>>
    }
  }
  'rentable_vehicles.check_availability': {
    methods: ["GET","HEAD"]
    pattern: '/rentablevehicle/:vehicleId/availability'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { vehicleId: ParamValue }
      query: ExtractQueryForGet<InferInput<(typeof import('#validators/rental').checkAvailabilityValidator)>>
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/rentable_vehicles_controller').default['checkAvailability']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/rentable_vehicles_controller').default['checkAvailability']>>> | { status: 422; response: { errors: SimpleError[] } }
    }
  }
  'rentable_vehicles.show': {
    methods: ["GET","HEAD"]
    pattern: '/rentablevehicle/:vehicleId'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { vehicleId: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/rentable_vehicles_controller').default['show']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/rentable_vehicles_controller').default['show']>>>
    }
  }
  'rentable_vehicles.rent': {
    methods: ["POST"]
    pattern: '/rentablevehicle/:vehicleId/rent'
    types: {
      body: ExtractBody<InferInput<(typeof import('#validators/rental').rentVehicleValidator)>>
      paramsTuple: [ParamValue]
      params: { vehicleId: ParamValue }
      query: ExtractQuery<InferInput<(typeof import('#validators/rental').rentVehicleValidator)>>
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/rentable_vehicles_controller').default['rent']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/rentable_vehicles_controller').default['rent']>>> | { status: 422; response: { errors: SimpleError[] } }
    }
  }
  'rentable_vehicles.store': {
    methods: ["POST"]
    pattern: '/rentablevehicle'
    types: {
      body: ExtractBody<InferInput<(typeof import('#validators/rentableVehicle').createRentableVehicleValidator)>>
      paramsTuple: []
      params: {}
      query: ExtractQuery<InferInput<(typeof import('#validators/rentableVehicle').createRentableVehicleValidator)>>
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/rentable_vehicles_controller').default['store']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/rentable_vehicles_controller').default['store']>>> | { status: 422; response: { errors: SimpleError[] } }
    }
  }
  'rentable_vehicles.update': {
    methods: ["PUT"]
    pattern: '/rentablevehicle/:vehicleId'
    types: {
      body: ExtractBody<InferInput<(typeof import('#validators/rentableVehicle').updateRentableVehicleValidator)>>
      paramsTuple: [ParamValue]
      params: { vehicleId: ParamValue }
      query: ExtractQuery<InferInput<(typeof import('#validators/rentableVehicle').updateRentableVehicleValidator)>>
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/rentable_vehicles_controller').default['update']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/rentable_vehicles_controller').default['update']>>> | { status: 422; response: { errors: SimpleError[] } }
    }
  }
  'rentable_vehicles.delete': {
    methods: ["DELETE"]
    pattern: '/rentablevehicle/:vehicleId'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { vehicleId: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/rentable_vehicles_controller').default['delete']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/rentable_vehicles_controller').default['delete']>>>
    }
  }
  'brands.index': {
    methods: ["GET","HEAD"]
    pattern: '/brand'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/brands_controller').default['index']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/brands_controller').default['index']>>>
    }
  }
  'brands.show': {
    methods: ["GET","HEAD"]
    pattern: '/brand/:brandId'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { brandId: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/brands_controller').default['show']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/brands_controller').default['show']>>>
    }
  }
  'models.index': {
    methods: ["GET","HEAD"]
    pattern: '/model'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/models_controller').default['index']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/models_controller').default['index']>>>
    }
  }
  'models.show': {
    methods: ["GET","HEAD"]
    pattern: '/model/:modelId'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { modelId: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/models_controller').default['show']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/models_controller').default['show']>>>
    }
  }
  'maintenance_requests.service_types': {
    methods: ["GET","HEAD"]
    pattern: '/maintenance-request/types'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/maintenance_requests_controller').default['serviceTypes']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/maintenance_requests_controller').default['serviceTypes']>>>
    }
  }
  'maintenance_requests.technicians': {
    methods: ["GET","HEAD"]
    pattern: '/maintenance-request/technicians'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/maintenance_requests_controller').default['technicians']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/maintenance_requests_controller').default['technicians']>>>
    }
  }
  'maintenance_requests.vehicles': {
    methods: ["GET","HEAD"]
    pattern: '/maintenance-request/vehicles'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/maintenance_requests_controller').default['vehicles']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/maintenance_requests_controller').default['vehicles']>>>
    }
  }
  'maintenance_requests.index': {
    methods: ["GET","HEAD"]
    pattern: '/maintenance-request'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/maintenance_requests_controller').default['index']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/maintenance_requests_controller').default['index']>>>
    }
  }
  'maintenance_requests.store': {
    methods: ["POST"]
    pattern: '/maintenance-request'
    types: {
      body: ExtractBody<InferInput<(typeof import('#validators/maintenance_request').createMaintenanceRequestValidator)>>
      paramsTuple: []
      params: {}
      query: ExtractQuery<InferInput<(typeof import('#validators/maintenance_request').createMaintenanceRequestValidator)>>
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/maintenance_requests_controller').default['store']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/maintenance_requests_controller').default['store']>>> | { status: 422; response: { errors: SimpleError[] } }
    }
  }
  'maintenance_requests.show': {
    methods: ["GET","HEAD"]
    pattern: '/maintenance-request/:requestId'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { requestId: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/maintenance_requests_controller').default['show']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/maintenance_requests_controller').default['show']>>>
    }
  }
  'tickets.statuses': {
    methods: ["GET","HEAD"]
    pattern: '/ticket/statuses'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/tickets_controller').default['statuses']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/tickets_controller').default['statuses']>>>
    }
  }
  'tickets.index': {
    methods: ["GET","HEAD"]
    pattern: '/ticket'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/tickets_controller').default['index']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/tickets_controller').default['index']>>>
    }
  }
  'tickets.store': {
    methods: ["POST"]
    pattern: '/ticket'
    types: {
      body: ExtractBody<InferInput<(typeof import('#validators/ticket').createTicketValidator)>>
      paramsTuple: []
      params: {}
      query: ExtractQuery<InferInput<(typeof import('#validators/ticket').createTicketValidator)>>
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/tickets_controller').default['store']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/tickets_controller').default['store']>>> | { status: 422; response: { errors: SimpleError[] } }
    }
  }
  'tickets.show': {
    methods: ["GET","HEAD"]
    pattern: '/ticket/:ticketId'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { ticketId: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/tickets_controller').default['show']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/tickets_controller').default['show']>>>
    }
  }
  'tickets.store_comment': {
    methods: ["POST"]
    pattern: '/ticket/:ticketId/comments'
    types: {
      body: ExtractBody<InferInput<(typeof import('#validators/ticket').createTicketCommentValidator)>>
      paramsTuple: [ParamValue]
      params: { ticketId: ParamValue }
      query: ExtractQuery<InferInput<(typeof import('#validators/ticket').createTicketCommentValidator)>>
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/tickets_controller').default['storeComment']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/tickets_controller').default['storeComment']>>> | { status: 422; response: { errors: SimpleError[] } }
    }
  }
}
