import { Repository } from "typeorm/repository/Repository"
import { CreateProductRepository } from "../../../../../application/repositories/product/create-product-repository"
import { BaseEntity } from "../../../../../domain/entities/base-entity"
import { Product } from "../../../../../domain/entities/product/product"
import { ProductModel } from "../model"

export class TypeOrmCreateProductRepository
    implements CreateProductRepository
{
    constructor(private readonly repository: Repository<ProductModel>) {}

    async create({ name, description, price, categoryId, active }: Omit<Product, keyof BaseEntity>) {
        const product = ProductModel.create({ name, description, price, categoryId, active })
        await product.save()
        return product
    }

    finish() {
        return this.repository.manager.connection.destroy()
    }
}
