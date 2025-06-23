import { BaseEntity } from "../../../../domain/base-entity"
import { OrderItem } from "../../../../domain/order-item/order-item"
import { CreateOrderItemRepository } from "../../../port/order-item/create-order-item-repository"
import { UseCase } from "../../base-use-case"
import { CustomError } from "../../custom-error"

type CreateOrderItemInput = Omit<OrderItem, keyof BaseEntity>

export class CreateOrderItemUseCase implements UseCase<CreateOrderItemInput, OrderItem> {
    constructor(private createOrderItemRepository: CreateOrderItemRepository) {}

    async execute(input: CreateOrderItemInput) {
        try {
            const created = await this.createOrderItemRepository.create(input)
            return {
                success: true,
                result: created,
            }
        } catch (error: unknown) {
            return {
                success: false,
                result: null,
                error: new CustomError(
                    400,
                    (error as Error | undefined)?.message ||
                        "Failed to create order item"
                ),
            }
        }
    }

    onFinish(): Promise<void> {
        return this.createOrderItemRepository.finish()
    }
}
