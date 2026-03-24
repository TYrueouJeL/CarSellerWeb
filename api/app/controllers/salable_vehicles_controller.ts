import type { HttpContext } from "@adonisjs/core/http";
import SalableVehicleService from "#services/salableVehicleService";
import { listSalableVehiclesValidator } from "#validators/salableVehicle";
import SalableVehicleTransformer from "#transformers/salable_vehicle_transformer";
import { ModelPaginatorContract } from "@adonisjs/lucid/types/model";
import SalableVehicle from "#models/salable_vehicle";

export default class SalableVehiclesController {
    private salableVehicleService = new SalableVehicleService();

    public async index({ request, response }: HttpContext) {
        const params = await request.validateUsing(listSalableVehiclesValidator);

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
            orderBy: params.order_by,
            orderDir: params.order_dir,
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
}