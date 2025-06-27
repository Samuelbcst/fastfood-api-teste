import { FindOrderItemByIdUseCase } from "."
import { FindOrderItemByIdRepository } from "../../../repositories/order-item/find-order-item-by-id-repository"

export const makeFindOrderItemByIdUseCase = (
    repository: FindOrderItemByIdRepository
) => new FindOrderItemByIdUseCase(repository)
