import type { HttpContext } from "@adonisjs/core/http";
import ModelService from "#services/modelService";

export default class ModelsController {
    private modelService = new ModelService();

    public async index({ response, request }: HttpContext) {
        const brandId = request.qs().brandId ? parseInt(request.qs().brandId) : undefined;
        const models = await this.modelService.getAll(brandId);
        return response.json({
            data: models
        });
    }

    public async show({ response, params }: HttpContext) {
        const model = await this.modelService.findById(params.modelId);
        
        if (!model) {
            return response.notFound({ message: "Model not found" });
        }

        return response.json({
            data: model
        });
    }
}
