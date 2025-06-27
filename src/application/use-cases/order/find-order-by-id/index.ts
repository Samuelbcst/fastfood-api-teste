import { FindOrderByIdRepository } from '../../../repositories/order/find-order-by-id-repository'
import { Order } from '../../../../domain/entities/order/order'
import { UseCase } from '../../base-use-case'
import { CustomError } from '../../custom-error'

interface Input {
    id: number
}

export class FindOrderByIdUseCase implements UseCase<Input, Order> {
    constructor(private readonly repository: FindOrderByIdRepository) {}

    async execute(input: Input) {
        try {
            const order = await this.repository.execute(input.id)
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
                error: new CustomError(400, (error as Error)?.message || 'Failed to find order'),
            }
        }
    }

    onFinish(): Promise<void> {
        return this.repository.finish()
    }
}
