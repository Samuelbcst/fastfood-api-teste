import { Repository } from "typeorm"
import { Product } from "../../../../../domain/entities/product/product"
import { ProductModel } from "../model"
import { FindProductAllRepository } from "../../../../../application/repositories/product/find-product-all-repository"

export class FindProductAllTypeORMRepository
    implements FindProductAllRepository
{
    constructor(private readonly repository: Repository<ProductModel>) {}

    execute(): Promise<Product[]> {
        return this.repository.find()
    }

    finish() {
        return this.repository.manager.connection.destroy()
    }
}
