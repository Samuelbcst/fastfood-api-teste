import { FindProductByCategoryUseCase } from "../../../../../../application/use-cases/product/find-product-by-category"
import { makeFindProductByCategoryRepository } from "../../../../../../infrastructure/database/typeorm/product/find-product-by-category-repository/make-find-product-by-category-repository"

export const makeGetProductByCategoryFactory = async () => {
    const repository = await makeFindProductByCategoryRepository()
    const useCase = new FindProductByCategoryUseCase(repository)
    return useCase
}
