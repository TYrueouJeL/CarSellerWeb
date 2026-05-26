/* eslint-disable prettier/prettier */
import type { AdonisEndpoint } from '@tuyau/core/types'
import type { Registry } from './schema.d.ts'
import type { ApiDefinition } from './tree.d.ts'

const placeholder: any = {}

const routes = {
  'auth.new_account.store': {
    methods: ["POST"],
    pattern: '/auth/signup',
    tokens: [{"old":"/auth/signup","type":0,"val":"auth","end":""},{"old":"/auth/signup","type":0,"val":"signup","end":""}],
    types: placeholder as Registry['auth.new_account.store']['types'],
  },
  'auth.access_token.store': {
    methods: ["POST"],
    pattern: '/auth/login',
    tokens: [{"old":"/auth/login","type":0,"val":"auth","end":""},{"old":"/auth/login","type":0,"val":"login","end":""}],
    types: placeholder as Registry['auth.access_token.store']['types'],
  },
  'auth.access_token.destroy': {
    methods: ["POST"],
    pattern: '/auth/logout',
    tokens: [{"old":"/auth/logout","type":0,"val":"auth","end":""},{"old":"/auth/logout","type":0,"val":"logout","end":""}],
    types: placeholder as Registry['auth.access_token.destroy']['types'],
  },
  'profile.profile.show': {
    methods: ["GET","HEAD"],
    pattern: '/account/profile',
    tokens: [{"old":"/account/profile","type":0,"val":"account","end":""},{"old":"/account/profile","type":0,"val":"profile","end":""}],
    types: placeholder as Registry['profile.profile.show']['types'],
  },
  'profile.profile.dashboard': {
    methods: ["GET","HEAD"],
    pattern: '/account/dashboard',
    tokens: [{"old":"/account/dashboard","type":0,"val":"account","end":""},{"old":"/account/dashboard","type":0,"val":"dashboard","end":""}],
    types: placeholder as Registry['profile.profile.dashboard']['types'],
  },
  'profile.profile.update': {
    methods: ["PUT"],
    pattern: '/account/profile',
    tokens: [{"old":"/account/profile","type":0,"val":"account","end":""},{"old":"/account/profile","type":0,"val":"profile","end":""}],
    types: placeholder as Registry['profile.profile.update']['types'],
  },
  'salable_vehicles.index': {
    methods: ["GET","HEAD"],
    pattern: '/salablevehicle',
    tokens: [{"old":"/salablevehicle","type":0,"val":"salablevehicle","end":""}],
    types: placeholder as Registry['salable_vehicles.index']['types'],
  },
  'salable_vehicles.show': {
    methods: ["GET","HEAD"],
    pattern: '/salablevehicle/:vehicleId',
    tokens: [{"old":"/salablevehicle/:vehicleId","type":0,"val":"salablevehicle","end":""},{"old":"/salablevehicle/:vehicleId","type":1,"val":"vehicleId","end":""}],
    types: placeholder as Registry['salable_vehicles.show']['types'],
  },
  'salable_vehicles.purchase': {
    methods: ["POST"],
    pattern: '/salablevehicle/:vehicleId/purchase',
    tokens: [{"old":"/salablevehicle/:vehicleId/purchase","type":0,"val":"salablevehicle","end":""},{"old":"/salablevehicle/:vehicleId/purchase","type":1,"val":"vehicleId","end":""},{"old":"/salablevehicle/:vehicleId/purchase","type":0,"val":"purchase","end":""}],
    types: placeholder as Registry['salable_vehicles.purchase']['types'],
  },
  'salable_vehicles.store': {
    methods: ["POST"],
    pattern: '/salablevehicle',
    tokens: [{"old":"/salablevehicle","type":0,"val":"salablevehicle","end":""}],
    types: placeholder as Registry['salable_vehicles.store']['types'],
  },
  'salable_vehicles.update': {
    methods: ["PUT"],
    pattern: '/salablevehicle/:vehicleId',
    tokens: [{"old":"/salablevehicle/:vehicleId","type":0,"val":"salablevehicle","end":""},{"old":"/salablevehicle/:vehicleId","type":1,"val":"vehicleId","end":""}],
    types: placeholder as Registry['salable_vehicles.update']['types'],
  },
  'salable_vehicles.delete': {
    methods: ["DELETE"],
    pattern: '/salablevehicle/:vehicleId',
    tokens: [{"old":"/salablevehicle/:vehicleId","type":0,"val":"salablevehicle","end":""},{"old":"/salablevehicle/:vehicleId","type":1,"val":"vehicleId","end":""}],
    types: placeholder as Registry['salable_vehicles.delete']['types'],
  },
  'rentable_vehicles.index': {
    methods: ["GET","HEAD"],
    pattern: '/rentablevehicle',
    tokens: [{"old":"/rentablevehicle","type":0,"val":"rentablevehicle","end":""}],
    types: placeholder as Registry['rentable_vehicles.index']['types'],
  },
  'rentable_vehicles.rentals': {
    methods: ["GET","HEAD"],
    pattern: '/rentablevehicle/:vehicleId/rentals',
    tokens: [{"old":"/rentablevehicle/:vehicleId/rentals","type":0,"val":"rentablevehicle","end":""},{"old":"/rentablevehicle/:vehicleId/rentals","type":1,"val":"vehicleId","end":""},{"old":"/rentablevehicle/:vehicleId/rentals","type":0,"val":"rentals","end":""}],
    types: placeholder as Registry['rentable_vehicles.rentals']['types'],
  },
  'rentable_vehicles.check_availability': {
    methods: ["GET","HEAD"],
    pattern: '/rentablevehicle/:vehicleId/availability',
    tokens: [{"old":"/rentablevehicle/:vehicleId/availability","type":0,"val":"rentablevehicle","end":""},{"old":"/rentablevehicle/:vehicleId/availability","type":1,"val":"vehicleId","end":""},{"old":"/rentablevehicle/:vehicleId/availability","type":0,"val":"availability","end":""}],
    types: placeholder as Registry['rentable_vehicles.check_availability']['types'],
  },
  'rentable_vehicles.show': {
    methods: ["GET","HEAD"],
    pattern: '/rentablevehicle/:vehicleId',
    tokens: [{"old":"/rentablevehicle/:vehicleId","type":0,"val":"rentablevehicle","end":""},{"old":"/rentablevehicle/:vehicleId","type":1,"val":"vehicleId","end":""}],
    types: placeholder as Registry['rentable_vehicles.show']['types'],
  },
  'rentable_vehicles.rent': {
    methods: ["POST"],
    pattern: '/rentablevehicle/:vehicleId/rent',
    tokens: [{"old":"/rentablevehicle/:vehicleId/rent","type":0,"val":"rentablevehicle","end":""},{"old":"/rentablevehicle/:vehicleId/rent","type":1,"val":"vehicleId","end":""},{"old":"/rentablevehicle/:vehicleId/rent","type":0,"val":"rent","end":""}],
    types: placeholder as Registry['rentable_vehicles.rent']['types'],
  },
  'rentable_vehicles.store': {
    methods: ["POST"],
    pattern: '/rentablevehicle',
    tokens: [{"old":"/rentablevehicle","type":0,"val":"rentablevehicle","end":""}],
    types: placeholder as Registry['rentable_vehicles.store']['types'],
  },
  'rentable_vehicles.update': {
    methods: ["PUT"],
    pattern: '/rentablevehicle/:vehicleId',
    tokens: [{"old":"/rentablevehicle/:vehicleId","type":0,"val":"rentablevehicle","end":""},{"old":"/rentablevehicle/:vehicleId","type":1,"val":"vehicleId","end":""}],
    types: placeholder as Registry['rentable_vehicles.update']['types'],
  },
  'rentable_vehicles.delete': {
    methods: ["DELETE"],
    pattern: '/rentablevehicle/:vehicleId',
    tokens: [{"old":"/rentablevehicle/:vehicleId","type":0,"val":"rentablevehicle","end":""},{"old":"/rentablevehicle/:vehicleId","type":1,"val":"vehicleId","end":""}],
    types: placeholder as Registry['rentable_vehicles.delete']['types'],
  },
  'brands.index': {
    methods: ["GET","HEAD"],
    pattern: '/brand',
    tokens: [{"old":"/brand","type":0,"val":"brand","end":""}],
    types: placeholder as Registry['brands.index']['types'],
  },
  'brands.show': {
    methods: ["GET","HEAD"],
    pattern: '/brand/:brandId',
    tokens: [{"old":"/brand/:brandId","type":0,"val":"brand","end":""},{"old":"/brand/:brandId","type":1,"val":"brandId","end":""}],
    types: placeholder as Registry['brands.show']['types'],
  },
  'models.index': {
    methods: ["GET","HEAD"],
    pattern: '/model',
    tokens: [{"old":"/model","type":0,"val":"model","end":""}],
    types: placeholder as Registry['models.index']['types'],
  },
  'models.show': {
    methods: ["GET","HEAD"],
    pattern: '/model/:modelId',
    tokens: [{"old":"/model/:modelId","type":0,"val":"model","end":""},{"old":"/model/:modelId","type":1,"val":"modelId","end":""}],
    types: placeholder as Registry['models.show']['types'],
  },
  'maintenance_requests.service_types': {
    methods: ["GET","HEAD"],
    pattern: '/maintenance-request/types',
    tokens: [{"old":"/maintenance-request/types","type":0,"val":"maintenance-request","end":""},{"old":"/maintenance-request/types","type":0,"val":"types","end":""}],
    types: placeholder as Registry['maintenance_requests.service_types']['types'],
  },
  'maintenance_requests.technicians': {
    methods: ["GET","HEAD"],
    pattern: '/maintenance-request/technicians',
    tokens: [{"old":"/maintenance-request/technicians","type":0,"val":"maintenance-request","end":""},{"old":"/maintenance-request/technicians","type":0,"val":"technicians","end":""}],
    types: placeholder as Registry['maintenance_requests.technicians']['types'],
  },
  'maintenance_requests.vehicles': {
    methods: ["GET","HEAD"],
    pattern: '/maintenance-request/vehicles',
    tokens: [{"old":"/maintenance-request/vehicles","type":0,"val":"maintenance-request","end":""},{"old":"/maintenance-request/vehicles","type":0,"val":"vehicles","end":""}],
    types: placeholder as Registry['maintenance_requests.vehicles']['types'],
  },
  'maintenance_requests.index': {
    methods: ["GET","HEAD"],
    pattern: '/maintenance-request',
    tokens: [{"old":"/maintenance-request","type":0,"val":"maintenance-request","end":""}],
    types: placeholder as Registry['maintenance_requests.index']['types'],
  },
  'maintenance_requests.store': {
    methods: ["POST"],
    pattern: '/maintenance-request',
    tokens: [{"old":"/maintenance-request","type":0,"val":"maintenance-request","end":""}],
    types: placeholder as Registry['maintenance_requests.store']['types'],
  },
  'maintenance_requests.show': {
    methods: ["GET","HEAD"],
    pattern: '/maintenance-request/:requestId',
    tokens: [{"old":"/maintenance-request/:requestId","type":0,"val":"maintenance-request","end":""},{"old":"/maintenance-request/:requestId","type":1,"val":"requestId","end":""}],
    types: placeholder as Registry['maintenance_requests.show']['types'],
  },
  'tickets.statuses': {
    methods: ["GET","HEAD"],
    pattern: '/ticket/statuses',
    tokens: [{"old":"/ticket/statuses","type":0,"val":"ticket","end":""},{"old":"/ticket/statuses","type":0,"val":"statuses","end":""}],
    types: placeholder as Registry['tickets.statuses']['types'],
  },
  'tickets.index': {
    methods: ["GET","HEAD"],
    pattern: '/ticket',
    tokens: [{"old":"/ticket","type":0,"val":"ticket","end":""}],
    types: placeholder as Registry['tickets.index']['types'],
  },
  'tickets.store': {
    methods: ["POST"],
    pattern: '/ticket',
    tokens: [{"old":"/ticket","type":0,"val":"ticket","end":""}],
    types: placeholder as Registry['tickets.store']['types'],
  },
  'tickets.show': {
    methods: ["GET","HEAD"],
    pattern: '/ticket/:ticketId',
    tokens: [{"old":"/ticket/:ticketId","type":0,"val":"ticket","end":""},{"old":"/ticket/:ticketId","type":1,"val":"ticketId","end":""}],
    types: placeholder as Registry['tickets.show']['types'],
  },
  'tickets.store_comment': {
    methods: ["POST"],
    pattern: '/ticket/:ticketId/comments',
    tokens: [{"old":"/ticket/:ticketId/comments","type":0,"val":"ticket","end":""},{"old":"/ticket/:ticketId/comments","type":1,"val":"ticketId","end":""},{"old":"/ticket/:ticketId/comments","type":0,"val":"comments","end":""}],
    types: placeholder as Registry['tickets.store_comment']['types'],
  },
} as const satisfies Record<string, AdonisEndpoint>

export { routes }

export const registry = {
  routes,
  $tree: {} as ApiDefinition,
}

declare module '@tuyau/core/types' {
  export interface UserRegistry {
    routes: typeof routes
    $tree: ApiDefinition
  }
}
