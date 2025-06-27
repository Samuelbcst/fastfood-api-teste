import { Category } from "../../../../domain/entities/category/category"
import { RepositoryBase } from "../../repository-base"

export interface DeleteCategoryRepository extends RepositoryBase<{
    id: number
}, Category | null> {}
