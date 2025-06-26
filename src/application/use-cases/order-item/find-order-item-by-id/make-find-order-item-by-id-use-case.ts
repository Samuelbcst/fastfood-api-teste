import { FindOrderItemByIdUseCase } from "."
import { FindOrderItemByIdRepository } from "../../../ports/order-item/find-order-item-by-id-repository"

export const makeFindOrderItemByIdUseCase = (
    repository: FindOrderItemByIdRepository
) => new FindOrderItemByIdUseCase(repository)
