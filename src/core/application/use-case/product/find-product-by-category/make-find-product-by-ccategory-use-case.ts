import { FindProductByCategoryUseCase } from "."
import { FindProductByCategoryRepository } from "../../../port/product/find-product-by-category-repository"

export const makeFindProductByCategoryUseCase = (
    repository: FindProductByCategoryRepository
) => new FindProductByCategoryUseCase(repository)
