import { FindProductByCategoryUseCase } from "."
import { FindProductByCategoryRepository } from "../../../ports/product/find-product-by-category-repository"

export const makeFindProductByCategoryUseCase = (
    repository: FindProductByCategoryRepository
) => new FindProductByCategoryUseCase(repository)
