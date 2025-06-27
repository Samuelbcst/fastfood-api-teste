import { FindProductByCategoryUseCase } from "."
import { FindProductByCategoryRepository } from "../../../repositories/product/find-product-by-category-repository"

export const makeFindProductByCategoryUseCase = (
    repository: FindProductByCategoryRepository
) => new FindProductByCategoryUseCase(repository)
