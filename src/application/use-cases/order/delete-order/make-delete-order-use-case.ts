import { DeleteOrderUseCase } from "."
import { DeleteOrderRepository } from "../../../ports/order/delete-order-repository"

export const makeDeleteOrderUseCase = (
    repository: DeleteOrderRepository
) => new DeleteOrderUseCase(repository)
