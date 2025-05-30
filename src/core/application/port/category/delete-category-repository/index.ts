import { Category } from "../../../../domain/category"
import { RepositoryBase } from "../../repository-base"

export interface DeleteCategoryRepository extends RepositoryBase<{
    id: number
}, Category | null> {}
