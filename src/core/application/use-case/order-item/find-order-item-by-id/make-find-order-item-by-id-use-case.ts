import { FindOrderItemByIdUseCase } from "."
import { FindOrderItemByIdRepository } from "../../../port/order-item/find-order-item-by-id-repository"

export const makeFindOrderItemByIdUseCase = (
    repository: FindOrderItemByIdRepository
) => new FindOrderItemByIdUseCase(repository)
