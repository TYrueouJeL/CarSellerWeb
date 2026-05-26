import MaintenanceServiceType from '#models/maintenance_service_type'

export default class MaintenanceServiceTypeTransformer {
  static transform(type: MaintenanceServiceType) {
    return {
      id: type.id,
      name: type.name,
      description: type.description,
      price: Number(type.price),
      duration: type.duration,
    }
  }

  static transformCollection(types: MaintenanceServiceType[]) {
    return types.map((type) => this.transform(type))
  }
}
