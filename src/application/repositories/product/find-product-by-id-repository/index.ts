import { Product } from "../../../../domain/entities/product/product"
import { RepositoryBase } from "../../repository-base"

export interface FindProductByIdRepository
    extends RepositoryBase<number, Product | null> {}
