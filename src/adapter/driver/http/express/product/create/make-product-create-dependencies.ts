import { makeCreateProductUseCase } from "../../../../../../core/application/use-case/product/create-product/make-create-product-use-case"
import { makeCreateProductRepository } from "../../../../../driven/persistence/typeorm/product/create-product-repository/make-create-product-repository"

export const makeCreateProductFactory = async () => {
    const repository = await makeCreateProductRepository()
    const useCase = makeCreateProductUseCase(repository)
    return useCase
}
