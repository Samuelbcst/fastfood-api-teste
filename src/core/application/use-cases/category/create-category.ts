// src/core/application/use-cases/category/create-category.ts

import { CategoryRepository } from "../../ports/category/repository";
import { Category } from "../../../domain/category";

export class CreateCategory {
    constructor(private categoryRepository: CategoryRepository) {}

    async execute(category: Category): Promise<Category> {
        const exists = await this.categoryRepository.findFirst({ name: category.name });
        if (exists) {
            throw new Error("Category already exists.");
        }
        return this.categoryRepository.insertAndSave(category);
    }
}
