import { Category } from "../../../../domain/category"
import { RepositoryBase } from "../../repository-base"

export interface FindCategoryAllRepository
    extends RepositoryBase<void, Category[]> {}
