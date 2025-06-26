import { Category } from "../../../../domain/entities/category/category"
import { RepositoryBase } from "../../repository-base"

export interface UpdateCategoryRepository extends RepositoryBase<{
    id: number
    name?: string
    description?: string
}, Category | null> {}
