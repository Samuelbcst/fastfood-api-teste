import { Product } from "../../../../domain/product/product"
import { RepositoryBase } from "../../repository-base"

export interface FindProductByIdRepository
    extends RepositoryBase<number, Product | null> {}
