import { Repository } from "typeorm"
import { Product } from "../../../../../domain/entities/product/product"
import { ProductModel } from "../model"
import { UpdateProductRepository } from "../../../../../application/ports/product/update-product-repository"

export class UpdateProductTypeORMRepository
    implements UpdateProductRepository
{
    constructor(private readonly repository: Repository<ProductModel>) {}

    async execute(param: { id: Product["id"]; name?: Product["name"]; description?: Product["description"]; price?: Product["price"]; categoryId?: Product["categoryId"] }): Promise<Product | null> {
        const { id, name, description, price, categoryId } = param;
        const product = await this.repository.findOneBy({ id });
        if (!product) return null;
        if (name !== undefined) product.name = name;
        if (description !== undefined) product.description = description;
        if (price !== undefined) product.price = price;
        if (categoryId !== undefined) product.categoryId = categoryId;
        product.updatedAt = new Date();
        await this.repository.save(product);
        return product;
    }

    finish() {
        return this.repository.manager.connection.destroy()
    }
}
