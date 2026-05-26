import vine from '@vinejs/vine'

export const createTicketValidator = vine.create({
  title: vine.string().trim().minLength(3).maxLength(200),
  description: vine.string().trim().minLength(10).maxLength(5000),
})

export const createTicketCommentValidator = vine.create({
  comment: vine.string().trim().minLength(1).maxLength(5000),
})
