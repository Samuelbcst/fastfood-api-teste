import { FindProductAllRepository } from "../../../repositories/product/find-product-all-repository"
import { FindProductAllUseCase } from "."

export const makeFindProductAllUseCase = (
    repository: FindProductAllRepository
) => new FindProductAllUseCase(repository)
