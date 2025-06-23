import { Product } from "../../../../domain/product/product"
import { RepositoryBase } from "../../repository-base"

export interface FindProductByCategoryRepository
    extends RepositoryBase<number, Product[] | null> {}
