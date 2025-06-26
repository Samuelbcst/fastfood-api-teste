import { UpdateOrderUseCase } from "."
import { UpdateOrderRepository } from "../../../ports/order/update-order-repository"

export const makeUpdateOrderUseCase = (
    repository: UpdateOrderRepository
) => new UpdateOrderUseCase(repository)
