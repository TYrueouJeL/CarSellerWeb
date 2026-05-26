import type { HttpContext } from "@adonisjs/core/http";
import RentableVehicleService from "#services/rentableVehicleService";
import RentalService from "#services/rentalService";
import { createRentableVehicleValidator, listRentableVehiclesValidator, updateRentableVehicleValidator } from "#validators/rentableVehicle";
import { rentVehicleValidator, checkAvailabilityValidator } from "#validators/rental";
import RentableVehicleTransformer from "#transformers/rentable_vehicle_transformer";
import RentalTransformer from "#transformers/rental_transformer";
import { ModelPaginatorContract } from "@adonisjs/lucid/types/model";
import RentableVehicle from "#models/rentable_vehicle";

const rentalErrors: Record<string, { status: number; message: string }> = {
    VEHICLE_NOT_FOUND: { status: 404, message: 'Véhicule introuvable' },
    VEHICLE_NOT_RENTABLE: { status: 400, message: 'Ce véhicule n\'est pas louable' },
    INVALID_DATES: { status: 422, message: 'Dates invalides' },
    START_DATE_IN_PAST: { status: 422, message: 'La date de début ne peut pas être dans le passé' },
    END_DATE_BEFORE_START: { status: 422, message: 'La date de fin doit être après la date de début' },
    INVALID_RENTAL_DURATION: { status: 422, message: 'La durée de location doit être d\'au moins 1 jour' },
    DATES_NOT_AVAILABLE: { status: 409, message: 'Le véhicule n\'est pas disponible pour ces dates' },
}

export default class RentableVehiclesController {
    private rentableVehicleService = new RentableVehicleService();
    private rentalService = new RentalService();

    public async index({ request, response }: HttpContext) {
        const params = await request.validateUsing(listRentableVehiclesValidator);
        const preloadsParam = request.qs().preloads;
        const preloads = preloadsParam
            ? (Array.isArray(preloadsParam) ? preloadsParam : [preloadsParam])
            : [];

        const result = await this.rentableVehicleService.list({
            page: params.page,
            limit: params.limit,
            minPrice: params.min_price,
            maxPrice: params.max_price,
            modelId: params.model_id,
            year: params.year,
            minYear: params.min_year,
            maxYear: params.max_year,
            minMileage: params.min_mileage,
            maxMileage: params.max_mileage,
            available: params.available,
            customerId: params.customer_id,
            brandIds: params.brand_ids,
            modelIds: params.model_ids,
            orderBy: params.order_by,
            orderDir: params.order_dir,
            preloads,
        });

        if (result && typeof result === 'object' && 'getMeta' in result) {
            const paginated = result as ModelPaginatorContract<RentableVehicle>;
            return response.json({
                data: RentableVehicleTransformer.transformCollection(paginated.all()),
                meta: paginated.getMeta(),
            });
        }

        return response.json({
            data: RentableVehicleTransformer.transformCollection(result)
        })
    }

    public async show({ response, params, request }: HttpContext) {
        const vehicleId = params.vehicleId;
        const preloads = request.qs().preloads ? request.qs().preloads.split(',') : [];
        const vehicle = await this.rentableVehicleService.findById(vehicleId, preloads)

        if (!vehicle) {
            return response.notFound({ message: "Vehicle not found" })
        }

        const bookedPeriods = await this.rentalService.listByVehicle(vehicleId)

        return response.json({
            data: {
                ...RentableVehicleTransformer.transform(vehicle),
                bookedPeriods,
            },
        })
    }

    public async rentals({ response, params }: HttpContext) {
        const periods = await this.rentalService.listByVehicle(params.vehicleId)
        return response.json({ data: RentalTransformer.transformPeriods(periods) })
    }

    public async checkAvailability({ request, response, params }: HttpContext) {
        const { startDate, endDate } = await request.validateUsing(checkAvailabilityValidator)
        const available = await this.rentalService.isAvailable(params.vehicleId, startDate, endDate)
        return response.json({ data: { available } })
    }

    public async rent({ request, response, auth, params }: HttpContext) {
        const user = auth.getUserOrFail()
        const { startDate, endDate } = await request.validateUsing(rentVehicleValidator)

        try {
            const result = await this.rentalService.create(params.vehicleId, user.id, startDate, endDate)
            return response.created({
                data: RentalTransformer.transform(result.rental, {
                    days: result.days,
                    dailyPrice: result.dailyPrice,
                }),
                message: 'Location confirmée',
            })
        } catch (error) {
            if (error instanceof Error && rentalErrors[error.message]) {
                const { status, message } = rentalErrors[error.message]
                return response.status(status).json({ message })
            }
            throw error
        }
    }

    public async store({ request, response }: HttpContext) {
        const data = await request.validateUsing(createRentableVehicleValidator);
        const vehicle = await this.rentableVehicleService.create(data);
        return response.created({
            data: RentableVehicleTransformer.transform(vehicle),
        })
    }

    public async update({ request, response, params }: HttpContext) {
        const data = await request.validateUsing(updateRentableVehicleValidator);
        const vehicle = await this.rentableVehicleService.update(params.vehicleId, data);
        return response.ok({
            data: RentableVehicleTransformer.transform(vehicle),
        })
    }

    public async delete({ response, params }: HttpContext) {
        const vehicleId = params.vehicleId;
        await this.rentableVehicleService.delete(vehicleId);
        return response.noContent();
    }
}
