import { makeUpdateProductUseCase } from "../../../../../../application/use-cases/product/update-product/make-update-product-use-case"
import { makeUpdateProductRepository } from "../../../../../../infrastructure/database/typeorm/product/update-product-repository/make-update-product-repository"

export const makeUpdateProductFactory = async () => {
    const updateProductRepository = await makeUpdateProductRepository()
    const useCase = makeUpdateProductUseCase(updateProductRepository)
    return useCase
}
