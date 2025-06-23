import { Repository } from "typeorm"
import { Product } from "../../../../../../core/domain/product/product"
import { ProductModel } from "../model"
import { FindProductByIdRepository } from "../../../../../../core/application/port/product/find-product-by-id-repository"

export class FindProductByIdTypeORMRepository
    implements FindProductByIdRepository
{
    constructor(private readonly repository: Repository<ProductModel>) {}

    execute(id: Product["id"]) {
        return this.repository.findOneBy({ id })
    }

    finish() {
        return this.repository.manager.connection.destroy()
    }
}
