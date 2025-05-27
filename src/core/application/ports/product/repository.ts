import { Product } from "../../../domain/product"
import { RepositoryBase } from "../repository-base"

export interface ProductRepository extends RepositoryBase<Product> {}
