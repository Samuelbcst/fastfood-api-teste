//src/core/application/services/category.ts

import { Category } from "../../../domain/category"
import { CategoryRepository } from "../../ports/category/repository"

export class CategoryServices {
    constructor(private categoryRepository: CategoryRepository) {}

    findById(id: number) {
        return this.categoryRepository.findById(id)
    }

    findFirst(props: Partial<Category>) {
        return this.categoryRepository.findFirst(props)
    }

    findAll(props: Partial<Category>) {
        return this.categoryRepository.findAll(props)
    }

    insertAndSave(entity: Category) {
        return this.categoryRepository.insertAndSave(entity)
    }

    patch(entity: Category) {
        return this.categoryRepository.patch(entity)
    }

    removeById(id: number) {
        return this.categoryRepository.removeById(id)
    }
}
