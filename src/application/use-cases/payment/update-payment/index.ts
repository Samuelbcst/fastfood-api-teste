import { Payment } from "../../../../domain/entities/payment/payment"
import { UpdatePaymentRepository } from "../../../repositories/payment/update-payment-repository"
import { UseCase } from "../../base-use-case"
import { CustomError } from "../../custom-error"

interface Input {
    id: number
    amount?: number
    status?: string
}

export class UpdatePaymentUseCase implements UseCase<Input, Payment> {
    constructor(
        private updatePaymentRepository: UpdatePaymentRepository
    ) {}

    async execute(input: Input) {
        try {
            const payment = await this.updatePaymentRepository.execute(input)

            if (!payment) {
                return {
                    success: false,
                    result: null,
                    error: new CustomError(404, "Payment not found."),
                }
            }

            return {
                success: true,
                result: payment,
            }
        } catch (error) {
            return {
                success: false,
                result: null,
            }
        }
    }

    onFinish(): Promise<void> {
        return this.updatePaymentRepository.finish()
    }
}
