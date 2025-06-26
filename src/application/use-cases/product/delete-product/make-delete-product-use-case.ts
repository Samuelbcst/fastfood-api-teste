import { DeleteProductUseCase } from "."
import { DeleteProductRepository } from "../../../ports/product/delete-product-repository"

export const makeDeleteProductUseCase = (
    repository: DeleteProductRepository
) => new DeleteProductUseCase(repository)
