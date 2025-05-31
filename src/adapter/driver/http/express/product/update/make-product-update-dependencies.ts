import { makeUpdateProductUseCase } from "../../../../../../core/application/use-case/product/update-product/make-update-product-use-case"
import { makeUpdateProductRepository } from "../../../../../driven/persistence/typeorm/product/update-product-repository/make-update-product-repository"

export const makeUpdateProductFactory = async () => {
    const updateProductRepository = await makeUpdateProductRepository()
    const useCase = makeUpdateProductUseCase(updateProductRepository)
    return useCase
}
