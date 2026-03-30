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
}
