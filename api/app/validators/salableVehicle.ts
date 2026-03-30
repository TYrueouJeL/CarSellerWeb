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

export const createSalableVehicleValidator = vine.create({
    modelId: vine.number(),
    year: vine.number(),
    registration: vine.string().regex(/^[A-Z]{2}-\d{3}-[A-Z]{2}$/),
    mileage: vine.string(),
    price: vine.string(),
});

export const updateSalableVehicleValidator = vine.create({
    modelId: vine.number().optional(),
    year: vine.number().optional(),
    registration: vine.string().regex(/^[A-Z]{2}-\d{3}-[A-Z]{2}$/).optional(),
    mileage: vine.string().optional(),
    price: vine.string().optional(),
});