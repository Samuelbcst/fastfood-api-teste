import { UpdateProductUseCase } from "."
import { UpdateProductRepository } from "../../../ports/product/update-product-repository"

export const makeUpdateProductUseCase = (
    repository: UpdateProductRepository
) => new UpdateProductUseCase(repository)
