import { Product } from "../../domain/product"
import { ProductRepository } from "../ports/product/repository"

export class ProductServices {
    constructor(private productRepository: ProductRepository) {}

    findById(id: number) {
        return this.productRepository.findById(id)
    }

    findFirst(props: Partial<Product>) {
        return this.productRepository.findFirst(props)
    }

    findAll(props: Partial<Product>) {
        return this.productRepository.findAll(props)
    }

    insertAndSave(entity: Product) {
        return this.productRepository.insertAndSave(entity)
    }

    patch(entity: Product) {
        return this.productRepository.patch(entity)
    }

    removeById(id: number) {
        return this.productRepository.removeById(id)
    }
}
