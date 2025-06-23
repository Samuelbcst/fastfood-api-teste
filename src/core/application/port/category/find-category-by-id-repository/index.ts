import { Category } from "../../../../domain/category/category"
import { RepositoryBase } from "../../repository-base"

export interface FindCategoryByIdRepository
    extends RepositoryBase<number, Category | null> {}
