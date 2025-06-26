import { Category } from "../../../../domain/entities/category/category"
import { RepositoryBase } from "../../repository-base"

export interface FindCategoryAllRepository
    extends RepositoryBase<void, Category[]> {}
