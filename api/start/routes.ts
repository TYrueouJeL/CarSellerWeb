/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import { middleware } from '#start/kernel'
import router from '@adonisjs/core/services/router'
import { controllers } from '#generated/controllers'

router.get('/', () => {
  return { hello: 'world' }
})

router
  .group(() => {
    router.post('signup', [controllers.NewAccount, 'store'])
    router.post('login', [controllers.AccessToken, 'store'])
    router.post('logout', [controllers.AccessToken, 'destroy']).use(middleware.auth())
  })
  .prefix('auth')
  .as('auth')

router
  .group(() => {
    router.get('/profile', [controllers.Profile, 'show'])
    router.get('/dashboard', [controllers.Profile, 'dashboard'])
    router.put('/profile', [controllers.Profile, 'update'])
  })
  .prefix('account')
  .as('profile')
  .use(middleware.auth())

router
  .group(() => {
    router.get('/', [controllers.SalableVehicles, 'index'])
    router.get('/:vehicleId', [controllers.SalableVehicles, 'show'])
    router.post('/:vehicleId/purchase', [controllers.SalableVehicles, 'purchase']).use(middleware.auth())
    router.post('/', [controllers.SalableVehicles, 'store'])
    router.put('/:vehicleId', [controllers.SalableVehicles, 'update'])
    router.delete('/:vehicleId', [controllers.SalableVehicles, 'delete'])
  })
  .prefix('salablevehicle')

router
  .group(() => {
    router.get('/', [controllers.RentableVehicles, 'index'])
    router.get('/:vehicleId/rentals', [controllers.RentableVehicles, 'rentals'])
    router.get('/:vehicleId/availability', [controllers.RentableVehicles, 'checkAvailability'])
    router.get('/:vehicleId', [controllers.RentableVehicles, 'show'])
    router.post('/:vehicleId/rent', [controllers.RentableVehicles, 'rent']).use(middleware.auth())
    router.post('/', [controllers.RentableVehicles, 'store'])
    router.put('/:vehicleId', [controllers.RentableVehicles, 'update'])
    router.delete('/:vehicleId', [controllers.RentableVehicles, 'delete'])
  })
  .prefix('rentablevehicle')

router
  .group(() => {
    router.get('/', [controllers.Brands, 'index'])
    router.get('/:brandId', [controllers.Brands, 'show'])
  })
  .prefix('brand')

router
  .group(() => {
    router.get('/', [controllers.Models, 'index'])
    router.get('/:modelId', [controllers.Models, 'show'])
  })
  .prefix('model')

router
  .group(() => {
    router.get('/types', [controllers.MaintenanceRequests, 'serviceTypes'])
    router.get('/technicians', [controllers.MaintenanceRequests, 'technicians'])
    router.get('/vehicles', [controllers.MaintenanceRequests, 'vehicles'])
    router.get('/', [controllers.MaintenanceRequests, 'index'])
    router.post('/', [controllers.MaintenanceRequests, 'store'])
    router.get('/:requestId', [controllers.MaintenanceRequests, 'show'])
  })
  .prefix('maintenance-request')
  .use(middleware.auth())

router
  .group(() => {
    router.get('/statuses', [controllers.Tickets, 'statuses'])
    router.get('/', [controllers.Tickets, 'index'])
    router.post('/', [controllers.Tickets, 'store'])
    router.get('/:ticketId', [controllers.Tickets, 'show'])
    router.post('/:ticketId/comments', [controllers.Tickets, 'storeComment'])
  })
  .prefix('ticket')
  .use(middleware.auth())
