import { DeleteOrderItemUseCase } from "./index"
import { DeleteOrderItemRepository } from "../../../ports/order-item/delete-order-item-repository"

export const makeDeleteOrderItemUseCase = (
    repository: DeleteOrderItemRepository
) => new DeleteOrderItemUseCase(repository)
