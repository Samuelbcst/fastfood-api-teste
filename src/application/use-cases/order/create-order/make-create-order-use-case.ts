import { CreateOrderUseCase } from "."
import { CreateOrderRepository } from "../../../repositories/order/create-order-repository"

export const makeCreateOrderUseCase = (
    repository: CreateOrderRepository
): CreateOrderUseCase => new CreateOrderUseCase(repository)
