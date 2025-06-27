import { UpdateOrderItemUseCase } from "."
import { UpdateOrderItemRepository } from "../../../repositories/order-item/update-order-item-repository"

export const makeUpdateOrderItemUseCase = (
    repository: UpdateOrderItemRepository
) => new UpdateOrderItemUseCase(repository)
