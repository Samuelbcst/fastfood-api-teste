import { UpdateProductUseCase } from "."
import { UpdateProductRepository } from "../../../port/product/update-product-repository"

export const makeUpdateProductUseCase = (
    repository: UpdateProductRepository
) => new UpdateProductUseCase(repository)
