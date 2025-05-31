import { makeDeleteProductUseCase } from "../../../../../../core/application/use-case/product/delete-product/make-delete-product-use-case"
import { makeDeleteProductRepository } from "../../../../../driven/persistence/typeorm/product/delete-product-repository/make-delete-product-repository"

export const makeDeleteProductFactory = async () => {
    const deleteProductRepository = await makeDeleteProductRepository()
    const useCase = makeDeleteProductUseCase(deleteProductRepository)
    return useCase
}
