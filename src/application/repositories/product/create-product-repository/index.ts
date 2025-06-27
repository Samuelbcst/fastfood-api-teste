import { Product } from "../../../../domain/entities/product/product"
import { BaseEntity } from "../../../../domain/entities/base-entity"

export interface CreateProductRepository {
    create(input: Omit<Product, keyof BaseEntity>): Promise<Product>
    finish(): Promise<void>
}
