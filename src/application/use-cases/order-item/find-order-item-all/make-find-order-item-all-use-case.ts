import { FindOrderItemAllRepository } from "../../../ports/order-item/find-order-item-all-repository"
import { FindOrderItemAllUseCase } from "."

export const makeFindOrderItemAllUseCase = (
    repository: FindOrderItemAllRepository
) => new FindOrderItemAllUseCase(repository)
