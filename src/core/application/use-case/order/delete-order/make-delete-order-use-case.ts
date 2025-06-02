import { DeleteOrderUseCase } from "."
import { DeleteOrderRepository } from "../../../port/order/delete-order-repository"

export const makeDeleteOrderUseCase = (
    repository: DeleteOrderRepository
) => new DeleteOrderUseCase(repository)
