import { Category } from "../../../../domain/category/category"
import { BaseEntity } from "../../../../domain/base-entity"

export interface CreateCategoryRepository {
    create(input: Omit<Category, keyof BaseEntity>): Promise<Category>
    finish(): Promise<void>
}
