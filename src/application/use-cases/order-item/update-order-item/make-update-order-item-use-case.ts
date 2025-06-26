import { UpdateOrderItemUseCase } from "."
import { UpdateOrderItemRepository } from "../../../ports/order-item/update-order-item-repository"

export const makeUpdateOrderItemUseCase = (
    repository: UpdateOrderItemRepository
) => new UpdateOrderItemUseCase(repository)
