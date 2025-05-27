import { Repository } from "typeorm"
import { ProductModel } from "./model"
import { ProductRepository } from "../../../../../core/application/ports/product/repository"
import { Product } from "../../../../../core/domain/product"

export class ProductTypeORMRepository implements ProductRepository {
    constructor(private readonly repository: Repository<ProductModel>) {}

    findById(id: Product["id"]) {
        return this.repository.findOneBy({ id })
    }

    findFirst(props: Partial<Product>) {
        return this.repository.findOne({ where: props })
    }

    findAll(props: Partial<Product>) {
        return this.repository.find({ where: props })
    }

    insertAndSave(props: Product) {
        const product = this.repository.create(props)
        return this.repository.save(product)
    }

    patch(entity: Product) {
        return this.repository.save(entity)
    }

    async removeById(id: Product["id"]) {
        await this.repository.delete({ id })
    }
}
