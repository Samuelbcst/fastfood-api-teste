// src/core/application/use-cases/category/delete-category.ts

import { CategoryRepository } from "../../ports/category/repository";

export class DeleteCategory {
    constructor(private categoryRepository: CategoryRepository) {}

    async execute(id: number): Promise<void> {
        const category = await this.categoryRepository.findById(id);
        if (!category) {
            throw new Error("Category not found.");
        }
        await this.categoryRepository.removeById(id);
    }
}
