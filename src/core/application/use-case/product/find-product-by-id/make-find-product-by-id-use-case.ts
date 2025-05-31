import { FindProductByIdUseCase } from "."
import { FindProductByIdRepository } from "../../../port/product/find-product-by-id-repository"

export const makeFindProductByIdUseCase = (
    repository: FindProductByIdRepository
) => new FindProductByIdUseCase(repository)
