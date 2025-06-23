import { Repository } from "typeorm"
import { Product } from "../../../../../../core/domain/product/product"
import { ProductModel } from "../model"
import { FindProductByCategoryRepository } from "../../../../../../core/application/port/product/find-product-by-category-repository"


export class FindProductByCategoryTypeORMRepository implements FindProductByCategoryRepository {
    constructor(private readonly repository: Repository<ProductModel>) {}

    async execute(categoryId: number): Promise<Product[]> {
        return this.repository.findBy({ categoryId })
    }

    finish() {
        return this.repository.manager.connection.destroy()
    }
}
