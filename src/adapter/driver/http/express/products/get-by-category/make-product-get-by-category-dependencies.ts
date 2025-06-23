import { FindProductByCategoryUseCase } from "../../../../../../core/application/use-case/product/find-product-by-category"
import { makeFindProductByCategoryRepository } from "../../../../../driven/persistence/typeorm/product/find-product-by-category-repository/make-find-product-by-category-repository"

export const makeGetProductByCategoryFactory = async () => {
    const repository = await makeFindProductByCategoryRepository()
    const useCase = new FindProductByCategoryUseCase(repository)
    return useCase
}
