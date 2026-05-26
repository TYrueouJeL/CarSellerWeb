import RentableVehicle from "#models/rentable_vehicle";
import { ModelPaginatorContract } from "@adonisjs/lucid/types/model";
import { CreateRentableVehicleDTO, UpdateRentableVehicleDTO } from "../dto/rentableVehicleDTO.ts";

interface ListOptions {
    page?: number;
    limit?: number;
    minPrice?: number;
    maxPrice?: number;
    modelId?: number;
    year?: number;
    minYear?: number;
    maxYear?: number;
    minMileage?: number;
    maxMileage?: number;
    available?: boolean;
    customerId?: number;
    brandIds?: string;
    modelIds?: string;
    orderBy?: "price" | "mileage" | "year" | "created_at";
    orderDir?: "asc" | "desc";
    preloads?: string[];
}

export default class RentableVehicleService {
    public async list(options: ListOptions = {}): Promise<
        ModelPaginatorContract<RentableVehicle> | RentableVehicle[]
    > {
        const {
            page,
            limit = 20,
            minPrice,
            maxPrice,
            modelId,
            year,
            minYear,
            maxYear,
            minMileage,
            maxMileage,
            available,
            customerId,
            brandIds,
            modelIds,
            orderBy = "created_at",
            orderDir = "desc",
            preloads = [],
        } = options;

        const query = RentableVehicle.query().where('type', 'rentable_vehicle');

        if (minPrice !== undefined) query.where("daily_price", ">=", minPrice);
        if (maxPrice !== undefined) query.where("daily_price", "<=", maxPrice);

        if (modelId !== undefined) query.where("model_id", modelId);

        if (year !== undefined) query.where("year", year);
        if (minYear !== undefined) query.where("year", ">=", minYear);
        if (maxYear !== undefined) query.where("year", "<=", maxYear);

        if (minMileage !== undefined) query.where("mileage", ">=", minMileage);
        if (maxMileage !== undefined) query.where("mileage", "<=", maxMileage);

        if (available === true) query.whereNull("customer_id");
        if (available === false) query.whereNotNull("customer_id");
        if (customerId !== undefined) query.where("customer_id", customerId);

        if (brandIds !== undefined) {
            const brandIdArray = brandIds.split(',').map(id => parseInt(id.trim())).filter(id => !isNaN(id));
            if (brandIdArray.length > 0) {
                if (brandIdArray.length === 1) {
                    query.whereHas('model', (modelQuery) => {
                        modelQuery.where('brandId', brandIdArray[0]);
                    });
                } else {
                    const placeholders = brandIdArray.map(() => '?').join(',');
                    query.whereRaw(`model_id IN (SELECT id FROM model WHERE brandId IN (${placeholders}))`, brandIdArray);
                }
            }
        }

        if (modelIds !== undefined) {
            const modelIdArray = modelIds.split(',').map(id => parseInt(id.trim())).filter(id => !isNaN(id));
            if (modelIdArray.length > 0) {
                if (modelIdArray.length === 1) {
                    query.where('modelId', modelIdArray[0]);
                } else {
                    const placeholders = modelIdArray.map(() => '?').join(',');
                    query.whereRaw(`model_id IN (${placeholders})`, modelIdArray);
                }
            }
        }

        const orderColumn = orderBy === "price" ? "daily_price" : orderBy;
        query.orderBy(orderColumn, orderDir);

        for (const preloadPath of preloads) {
            const parts = preloadPath.split('.');
            if (parts.length === 1) {
                query.preload(parts[0] as any);
            } else if (parts.length === 2) {
                query.preload(parts[0] as any, (modelQuery) => {
                    modelQuery.preload(parts[1] as any);
                });
            }
        }

        if (page !== undefined) {
            return await query.paginate(page, limit);
        }

        return await query;
    }

    public async findById(vehicleId: number, preloads: string[] = []): Promise<RentableVehicle | null> {
        const query = RentableVehicle.query().where('id', vehicleId).where('type', 'rentable_vehicle');

        for (const preloadPath of preloads) {
            const parts = preloadPath.split('.');
            if (parts.length === 1) {
                query.preload(parts[0] as any);
            } else if (parts.length === 2) {
                query.preload(parts[0] as any, (modelQuery) => {
                    modelQuery.preload(parts[1] as any);
                });
            }
        }

        return await query.first();
    }

    public async create(data: CreateRentableVehicleDTO): Promise<RentableVehicle> {
        return await RentableVehicle.create({ ...data, type: 'rentable_vehicle' });
    }

    public async update(vehicleId: number, data: UpdateRentableVehicleDTO): Promise<RentableVehicle> {
        const vehicle = await RentableVehicle.query()
            .where('id', vehicleId)
            .where('type', 'rentable_vehicle')
            .first();
        if (!vehicle) {
            throw new Error("Vehicle not found");
        }
        vehicle.merge(data);
        await vehicle.save();
        return vehicle;
    }

    public async delete(vehicleId: number): Promise<void> {
        const vehicle = await RentableVehicle.query()
            .where('id', vehicleId)
            .where('type', 'rentable_vehicle')
            .first();
        if (!vehicle) {
            throw new Error("Vehicle not found");
        }
        await vehicle.delete();
    }
}
