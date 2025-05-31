import { DeleteProductUseCase } from "."
import { DeleteProductRepository } from "../../../port/product/delete-product-repository"

export const makeDeleteProductUseCase = (
    repository: DeleteProductRepository
) => new DeleteProductUseCase(repository)
