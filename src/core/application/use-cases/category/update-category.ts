// src/core/application/use-cases/category/update-category.ts

import { CategoryRepository } from "../../ports/category/repository";
import { Category } from "../../../domain/category";

export class UpdateCategory {
    constructor(private categoryRepository: CategoryRepository) {}

    async execute(id: number, data: Partial<Category>): Promise<Category> {
        const category = await this.categoryRepository.findById(id);
        if (!category) {
            throw new Error("Category not found.");
        }
        const updated = { ...category, ...data };
        return this.categoryRepository.patch(updated as Category);
    }
}
