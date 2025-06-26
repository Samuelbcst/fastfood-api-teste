import { BaseEntity } from "../../../../domain/entities/base-entity"
import { Payment, PaymentStatus } from "../../../../domain/entities/payment/payment"
import { CreatePaymentRepository } from "../../../ports/payment/create-payment-repository"
import { UseCase } from "../../base-use-case"
import { CustomError } from "../../custom-error"
import { FindOrderByIdRepository } from '../../../ports/order/find-order-by-id-repository'


type CreatePaymentInput = Omit<Payment, keyof BaseEntity>

export class CreatePaymentUseCase implements UseCase<CreatePaymentInput, Payment> {
    constructor(
        private createPaymentRepository: CreatePaymentRepository,
        private findOrderByIdRepository: FindOrderByIdRepository
    ) {}

    async execute(input: CreatePaymentInput) {
        try {
            
            const order = await this.findOrderByIdRepository.execute(input.orderId)
            if (!order) {
                return {
                    success: false,
                    result: null,
                    error: new CustomError(404, 'Order not found'),
                }
            }
            
            if (Number(input.amount) !== Number(order.totalAmount)) {
                return {
                    success: false,
                    result: null,
                    error: new CustomError(400, 'Payment amount must match order total'),
                }
            }

            const paymentStatus = input.paymentStatus === PaymentStatus.PAID && Number(input.amount) === Number(order.totalAmount)
                ? PaymentStatus.PAID
                : PaymentStatus.NOT_PAID
            const created = await this.createPaymentRepository.create({ ...input, paymentStatus })
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
                        "Failed to create payment"
                ),
            }
        }
    }

    async onFinish(): Promise<void> {
        await this.createPaymentRepository.finish()
        await this.findOrderByIdRepository.finish()
    }
}
