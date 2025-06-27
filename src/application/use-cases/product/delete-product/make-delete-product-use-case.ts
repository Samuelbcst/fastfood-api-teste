import { DeleteProductUseCase } from "."
import { DeleteProductRepository } from "../../../repositories/product/delete-product-repository"

export const makeDeleteProductUseCase = (
    repository: DeleteProductRepository
) => new DeleteProductUseCase(repository)
