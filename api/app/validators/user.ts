import vine from '@vinejs/vine'

/**
 * Shared rules for email and password.
 */
const email = () => vine.string().email().maxLength(254)
const password = () => vine.string().minLength(8).maxLength(32)

/**
 * Validator to use when performing self-signup
 */
export const signupValidator = vine.create({
  firstname: vine.string(),
  lastname: vine.string(),
  email: email().unique({ table: 'user', column: 'email' }),
  password: password(),
  passwordConfirmation: password().sameAs('password'),
})

/**
 * Validator to use before validating user credentials
 * during login
 */
export const loginValidator = vine.create({
  email: email(),
  password: vine.string(),
})

/**
 * Validator for updating account profile
 */
export const updateProfileValidator = vine.create({
  firstname: vine.string().trim(),
  lastname: vine.string().trim(),
  email: email(),
  phoneNumber: vine.string().trim().nullable().optional(),
  password: vine.string().minLength(8).maxLength(32).optional(),
  passwordConfirmation: vine.string().minLength(8).maxLength(32).optional(),
})
