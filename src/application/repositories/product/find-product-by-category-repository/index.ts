import { Product } from "../../../../domain/entities/product/product"
import { RepositoryBase } from "../../repository-base"

export interface FindProductByCategoryRepository
    extends RepositoryBase<number, Product[] | null> {}
