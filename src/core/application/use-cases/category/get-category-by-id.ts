// src/core/application/use-cases/category/get-category-by-id.ts

import { CategoryRepository } from "../../ports/category/repository";
import { Category } from "../../../domain/category";

export class GetCategoryById {
    constructor(private categoryRepository: CategoryRepository) {}

    async execute(id: number): Promise<Category> {
        const category = await this.categoryRepository.findById(id);
        if (!category) {
            throw new Error("Category not found.");
        }
        return category;
    }
}
