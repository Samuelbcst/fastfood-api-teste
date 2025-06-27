import { UpdateProductUseCase } from "."
import { UpdateProductRepository } from "../../../repositories/product/update-product-repository"

export const makeUpdateProductUseCase = (
    repository: UpdateProductRepository
) => new UpdateProductUseCase(repository)
