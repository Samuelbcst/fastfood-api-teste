import { Repository } from "typeorm/repository/Repository"
import { CreateProductRepository } from "../../../../../../core/application/port/product/create-product-repository"
import { BaseEntity } from "../../../../../../core/domain/base-entity"
import { Product } from "../../../../../../core/domain/product/product"
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
