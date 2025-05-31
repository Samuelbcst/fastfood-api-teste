import { Product } from "../../../../domain/product"
import { RepositoryBase } from "../../repository-base"

export interface DeleteProductRepository extends RepositoryBase<{
    id: number
}, Product | null> {}
