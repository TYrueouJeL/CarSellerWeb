import Brand from "#models/brand";

export default class BrandService {
    public async getAll() {
        return await Brand.query().orderBy('name');
    }

    public async findById(id: number) {
        return await Brand.query().where('id', id).first();
    }
}
