import { BaseSeeder } from "@adonisjs/lucid/seeders";
import ModelFactory from "../../app/factory/modelFactory.ts";

export default class ModelSeeder extends BaseSeeder {
    async run() {
        await ModelFactory.createMany(10)
    }
}