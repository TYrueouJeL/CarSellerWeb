import { BaseSeeder } from "@adonisjs/lucid/seeders";
import CategoryFactory from "../../app/factory/categoryFactory.ts";

export default class CategorySeeder extends BaseSeeder {
    async run() {
        await CategoryFactory.createMany(5)
    }
}