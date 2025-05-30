import { Category } from "../../../../domain/category"
import { RepositoryBase } from "../../repository-base"

export interface FindCategoryByIdRepository
    extends RepositoryBase<number, Category | null> {}
