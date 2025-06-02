import { BaseEntity } from "../../../../domain/base-entity"
import { Order } from "../../../../domain/order"
import { CreateOrderRepository } from "../../../port/order/create-order-repository"
import { UseCase } from "../../base-use-case"
import { CustomError } from "../../custom-error"

type CreateOrderInput = Omit<Order, keyof BaseEntity>

export class CreateOrderUseCase implements UseCase<CreateOrderInput, Order> {
    constructor(private createOrderRepository: CreateOrderRepository) {}

    async execute(input: CreateOrderInput) {
        try {
            const created = await this.createOrderRepository.create(input)
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
                        "Failed to create order"
                ),
            }
        }
    }

    onFinish(): Promise<void> {
        return this.createOrderRepository.finish()
    }
}
