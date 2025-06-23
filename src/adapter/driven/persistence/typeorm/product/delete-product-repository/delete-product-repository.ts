import { Repository } from "typeorm"
import { Product } from "../../../../../../core/domain/product/product"
import { ProductModel } from "../model"
import { DeleteProductRepository } from "../../../../../../core/application/port/product/delete-product-repository"

export class DeleteProductTypeORMRepository implements DeleteProductRepository {
    constructor(private readonly repository: Repository<ProductModel>) {}

    async execute(param: { id: Product["id"] }): Promise<Product | null> {
        const { id } = param;
        const product = await this.repository.findOneBy({ id });
        if (!product) return null;
        await this.repository.remove(product);
        return product;
    }

    finish() {
        return this.repository.manager.connection.destroy()
    }
}
