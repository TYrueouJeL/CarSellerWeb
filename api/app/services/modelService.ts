import Model from "#models/model";

export default class ModelService {
    public async getAll(brandId?: number) {
        let query = Model.query().preload('brand').orderBy('name');
        
        if (brandId) {
            query = query.where('brandId', brandId);
        }
        
        return await query;
    }

    public async findById(id: number) {
        return await Model.query().where('id', id).preload('brand').first();
    }
}
