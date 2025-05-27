// src/core/application/use-cases/category/list-categories.ts

import { CategoryRepository } from "../../ports/category/repository";
import { Category } from "../../../domain/category";

export class ListCategories {
    constructor(private categoryRepository: CategoryRepository) {}

    async execute(props?: Partial<Category>): Promise<Category[]> {
        return this.categoryRepository.findAll(props ?? {});
    }
}
