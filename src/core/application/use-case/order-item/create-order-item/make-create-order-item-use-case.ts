import { CreateOrderItemUseCase } from "."
import { CreateOrderItemRepository } from "../../../port/order-item/create-order-item-repository"

export const makeCreateOrderItemUseCase = (
    repository: CreateOrderItemRepository
): CreateOrderItemUseCase => new CreateOrderItemUseCase(repository)
