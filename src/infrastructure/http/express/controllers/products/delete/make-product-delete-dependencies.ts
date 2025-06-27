import { makeDeleteProductUseCase } from "../../../../../../application/use-cases/product/delete-product/make-delete-product-use-case"
import { makeDeleteProductRepository } from "../../../../../../infrastructure/database/typeorm/product/delete-product-repository/make-delete-product-repository"

export const makeDeleteProductFactory = async () => {
    const deleteProductRepository = await makeDeleteProductRepository()
    const useCase = makeDeleteProductUseCase(deleteProductRepository)
    return useCase
}
