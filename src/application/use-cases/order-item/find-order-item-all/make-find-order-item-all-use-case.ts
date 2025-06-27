import { FindOrderItemAllRepository } from "../../../repositories/order-item/find-order-item-all-repository"
import { FindOrderItemAllUseCase } from "."

export const makeFindOrderItemAllUseCase = (
    repository: FindOrderItemAllRepository
) => new FindOrderItemAllUseCase(repository)
