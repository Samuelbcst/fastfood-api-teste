import { Product } from "../../../../../core/domain/product"
import { BaseEntity } from "../../../../domain/base-entity"

export interface CreateProductRepository {
    create(input: Omit<Product, keyof BaseEntity>): Promise<Product>
    finish(): Promise<void>
}
