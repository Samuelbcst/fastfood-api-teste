import { UpdateOrderUseCase } from "."
import { UpdateOrderRepository } from "../../../repositories/order/update-order-repository"

export const makeUpdateOrderUseCase = (
    repository: UpdateOrderRepository
) => new UpdateOrderUseCase(repository)
