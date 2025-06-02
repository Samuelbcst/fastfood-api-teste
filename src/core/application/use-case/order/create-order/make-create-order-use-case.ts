import { CreateOrderUseCase } from "."
import { CreateOrderRepository } from "../../../port/order/create-order-repository"

export const makeCreateOrderUseCase = (
    repository: CreateOrderRepository
): CreateOrderUseCase => new CreateOrderUseCase(repository)
