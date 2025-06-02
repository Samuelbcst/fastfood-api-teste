import { Order } from '../../../../domain/order'
import { UpdateOrderRepository } from '../../../port/order/update-order-repository'
import { UseCase } from '../../base-use-case'
import { CustomError } from '../../custom-error'

interface Input {
    id: number
    // add other updatable fields as needed
}

export class UpdateOrderUseCase implements UseCase<Input, Order> {
    constructor(private readonly repository: UpdateOrderRepository) {}

    async execute(input: Input) {
        try {
            const order = await this.repository.execute(input)
            if (!order) {
                return {
                    success: false,
                    result: null,
                    error: new CustomError(404, 'Order not found.'),
                }
            }
            return {
                success: true,
                result: order,
            }
        } catch (error) {
            return {
                success: false,
                result: null,
                error: new CustomError(400, (error as Error)?.message || 'Failed to update order'),
            }
        }
    }

    onFinish(): Promise<void> {
        return this.repository.finish()
    }
}
