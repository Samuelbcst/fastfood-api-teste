import { CreateOrderUseCase } from "."
import { CreateOrderRepository } from "../../../ports/order/create-order-repository"

export const makeCreateOrderUseCase = (
    repository: CreateOrderRepository
): CreateOrderUseCase => new CreateOrderUseCase(repository)
