import { DeleteOrderUseCase } from "."
import { DeleteOrderRepository } from "../../../repositories/order/delete-order-repository"

export const makeDeleteOrderUseCase = (
    repository: DeleteOrderRepository
) => new DeleteOrderUseCase(repository)
