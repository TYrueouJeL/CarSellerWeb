// app/validators/salable_vehicle_validator.ts
import vine from "@vinejs/vine";

export const listSalableVehiclesValidator = vine.create({
    page: vine.number().min(1).optional(),
    limit: vine.number().min(1).max(100).optional(),

    min_price: vine.number().min(0).optional(),
    max_price: vine.number().min(0).optional(),

    model_id: vine.number().optional(),
    year: vine.number().optional(),
    min_year: vine.number().optional(),
    max_year: vine.number().optional(),
    min_mileage: vine.number().min(0).optional(),
    max_mileage: vine.number().min(0).optional(),

    available: vine.boolean().optional(),
    customer_id: vine.number().optional(),

    order_by: vine
    .enum(["price", "mileage", "year", "created_at"])
    .optional(),
    order_dir: vine.enum(["asc", "desc"]).optional(),
});