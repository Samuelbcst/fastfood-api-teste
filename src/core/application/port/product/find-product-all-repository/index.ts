import { Product } from "../../../../domain/product/product"
import { RepositoryBase } from "../../repository-base"

export interface FindProductAllRepository
    extends RepositoryBase<void, Product[]> {}
