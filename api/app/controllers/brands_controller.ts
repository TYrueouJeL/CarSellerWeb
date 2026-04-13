import type { HttpContext } from "@adonisjs/core/http";
import BrandService from "#services/brandService";

export default class BrandsController {
    private brandService = new BrandService();

    public async index({ response }: HttpContext) {
        const brands = await this.brandService.getAll();
        return response.json({
            data: brands
        });
    }

    public async show({ response, params }: HttpContext) {
        const brand = await this.brandService.findById(params.brandId);
        
        if (!brand) {
            return response.notFound({ message: "Brand not found" });
        }

        return response.json({
            data: brand
        });
    }
}
