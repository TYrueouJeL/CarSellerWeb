import type { HttpContext } from "@adonisjs/core/http";
import SalableVehicleService from "#services/salableVehicleService";
import { createSalableVehicleValidator, listSalableVehiclesValidator, updateSalableVehicleValidator } from "#validators/salableVehicle";
import SalableVehicleTransformer from "#transformers/salable_vehicle_transformer";
import { ModelPaginatorContract } from "@adonisjs/lucid/types/model";
import SalableVehicle from "#models/salable_vehicle";

export default class SalableVehiclesController {
    private salableVehicleService = new SalableVehicleService();

    public async index({ request, response }: HttpContext) {
        const params = await request.validateUsing(listSalableVehiclesValidator);
        const preloadsParam = request.qs().preloads;
        const preloads = preloadsParam 
            ? (Array.isArray(preloadsParam) ? preloadsParam : [preloadsParam])
            : [];

        const result = await this.salableVehicleService.list({
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
            const paginated = result as ModelPaginatorContract<SalableVehicle>;
            return response.json({
                data: SalableVehicleTransformer.transformCollection(paginated.all()),
                meta: paginated.getMeta(),
            });
        }

        return response.json({
            data: SalableVehicleTransformer.transformCollection(result)
        })
    }

    public async show({ response, params, request }: HttpContext) {
        const vehicleId = params.vehicleId;
        const preloads = request.qs().preloads ? request.qs().preloads.split(',') : [];
        const vehicle = await this.salableVehicleService.findById(vehicleId, preloads)

        if (!vehicle) {
            return response.notFound({ message: "Vehicle not found" })
        }

        return response.json({
            data: SalableVehicleTransformer.transform(vehicle),
        })
    }

    public async store({ request, response }: HttpContext) {
        const data = await request.validateUsing(createSalableVehicleValidator);
        const vehicle = await this.salableVehicleService.create(data);
        return response.created({
            data: SalableVehicleTransformer.transform(vehicle),
        })
    }

    public async update({ request, response, params }: HttpContext) {
        const data = await request.validateUsing(updateSalableVehicleValidator);
        const vehicle = await this.salableVehicleService.update(params.vehicleId, data);
        return response.ok({
            data: SalableVehicleTransformer.transform(vehicle),
        })
    }

    public async delete({ response, params }: HttpContext) {
        const vehicleId = params.vehicleId;
        await this.salableVehicleService.delete(vehicleId);
        return response.noContent();
    }
}
