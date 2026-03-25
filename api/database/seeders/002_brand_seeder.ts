import { BaseSeeder } from "@adonisjs/lucid/seeders";
import BrandFactory from "../../app/factory/brandFactory.ts";

export default class BrandSeeder extends BaseSeeder {
    async run() {
        await BrandFactory.createMany(10)
    }
}