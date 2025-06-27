import { Category } from "../../../../domain/entities/category/category"
import { BaseEntity } from "../../../../domain/entities/base-entity"

export interface CreateCategoryRepository {
    create(input: Omit<Category, keyof BaseEntity>): Promise<Category>
    finish(): Promise<void>
}
