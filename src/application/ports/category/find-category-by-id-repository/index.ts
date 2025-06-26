import { Category } from "../../../../domain/entities/category/category"
import { RepositoryBase } from "../../repository-base"

export interface FindCategoryByIdRepository
    extends RepositoryBase<number, Category | null> {}
