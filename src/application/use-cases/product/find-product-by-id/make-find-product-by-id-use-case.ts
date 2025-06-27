import { FindProductByIdUseCase } from "."
import { FindProductByIdRepository } from "../../../repositories/product/find-product-by-id-repository"

export const makeFindProductByIdUseCase = (
    repository: FindProductByIdRepository
) => new FindProductByIdUseCase(repository)
