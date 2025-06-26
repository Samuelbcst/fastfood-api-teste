import { FindOrderAllRepository } from '../../../ports/order/find-order-all-repository'
import { Order } from '../../../../domain/entities/order/order'
import { UseCase } from '../../base-use-case'
import { CustomError } from '../../custom-error'

export class FindOrderAllUseCase implements UseCase<void, Order[]> {
    constructor(private readonly repository: FindOrderAllRepository) {}

    async execute() {
        try {
            const orders = await this.repository.execute()
            return {
                success: true,
                result: orders,
            }
        } catch (error) {
            return {
                success: false,
                result: [],
                error: new CustomError(400, (error as Error)?.message || 'Failed to find orders'),
            }
        }
    }

    onFinish(): Promise<void> {
        return this.repository.finish()
    }
}
