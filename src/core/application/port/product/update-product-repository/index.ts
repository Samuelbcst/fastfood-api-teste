import { Product } from "../../../../domain/product"
import { RepositoryBase } from "../../repository-base"

export interface UpdateProductRepository extends RepositoryBase<{
    id: number
    name?: string
    description?: string
    price?: number
    categoryId?: number
}, Product | null> {}
