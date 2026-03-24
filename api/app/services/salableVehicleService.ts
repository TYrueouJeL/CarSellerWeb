import SalableVehicle from "#models/salable_vehicle";
import { ModelPaginatorContract } from "@adonisjs/lucid/types/model";

interface ListOptions {
    page?: number;
    limit?: number;
    // Prix
    minPrice?: number;
    maxPrice?: number;
    // Véhicule
    modelId?: number;
    year?: number;
    minYear?: number;
    maxYear?: number;
    minMileage?: number;
    maxMileage?: number;
    // Disponibilité
    available?: boolean;
    customerId?: number;
    // Tri
    orderBy?: "price" | "mileage" | "year" | "created_at";
    orderDir?: "asc" | "desc";
    // Relations
    preloads?: string[];
}

export default class SalableVehicleService {
    public async list(options: ListOptions = {}): Promise<
    ModelPaginatorContract<SalableVehicle> | SalableVehicle[]> {
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
            orderBy = "created_at",
            orderDir = "desc",
            preloads = [],
        } = options;

        const query = SalableVehicle.query();

        // Prix
        if (minPrice !== undefined) query.where("price", ">=", minPrice);
        if (maxPrice !== undefined) query.where("price", "<=", maxPrice);

        // Modèle
        if (modelId !== undefined) query.where("model_id", modelId);

        // Année
        if (year !== undefined) query.where("year", year);
        if (minYear !== undefined) query.where("year", ">=", minYear);
        if (maxYear !== undefined) query.where("year", "<=", maxYear);

        // Kilométrage
        if (minMileage !== undefined) query.where("mileage", ">=", minMileage);
        if (maxMileage !== undefined) query.where("mileage", "<=", maxMileage);

        // Disponibilité (pas encore vendu/loué)
        if (available === true) query.whereNull("customer_id");
        if (available === false) query.whereNotNull("customer_id");
        if (customerId !== undefined) query.where("customer_id", customerId);

        // Tri
        query.orderBy(orderBy, orderDir);

        // Relations
        for (const relation of preloads) {
            query.preload(relation as any);
        }

        // Pagination optionnelle
        if (page !== undefined) {
            return await query.paginate(page, limit);
        }

        return await query;
    }
}