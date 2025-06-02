import { UpdateOrderItemUseCase } from "."
import { UpdateOrderItemRepository } from "../../../port/order-item/update-order-item-repository"

export const makeUpdateOrderItemUseCase = (
    repository: UpdateOrderItemRepository
) => new UpdateOrderItemUseCase(repository)
