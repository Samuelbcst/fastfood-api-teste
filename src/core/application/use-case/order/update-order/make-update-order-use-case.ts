import { UpdateOrderUseCase } from "."
import { UpdateOrderRepository } from "../../../port/order/update-order-repository"

export const makeUpdateOrderUseCase = (
    repository: UpdateOrderRepository
) => new UpdateOrderUseCase(repository)
