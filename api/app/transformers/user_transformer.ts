import type User from '#models/user'
import { BaseTransformer } from '@adonisjs/core/transformers'

function parseRoles(roles: unknown): string[] {
  if (Array.isArray(roles)) {
    return roles.map(String)
  }
  if (typeof roles === 'string') {
    try {
      const parsed = JSON.parse(roles)
      return Array.isArray(parsed) ? parsed.map(String) : [roles]
    } catch {
      return [roles]
    }
  }
  return []
}

export default class UserTransformer extends BaseTransformer<User> {
  toObject() {
    const user = this.resource
    return {
      ...this.pick(user, [
        'id',
        'firstname',
        'lastname',
        'email',
        'phoneNumber',
        'type',
        'createdAt',
        'updatedAt',
      ]),
      roles: parseRoles(user.roles),
    }
  }
}
