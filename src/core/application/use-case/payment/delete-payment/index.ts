import { Payment } from "../../../../domain/payment"
import { UseCase } from "../../base-use-case"
import { CustomError } from "../../custom-error"
import { DeletePaymentRepository } from "../../../port/payment/delete-payment-repository"

interface Input {
    id: number
}

export class DeletePaymentUseCase implements UseCase<Input, Payment | null> {
    constructor(private deletePaymentRepository: DeletePaymentRepository) {}

    async execute(input: Input) {
        try {
            const deleted = await this.deletePaymentRepository.execute(input)
            if (!deleted) {
                return {
                    success: false,
                    result: null,
                    error: new CustomError(404, "Payment not found."),
                }
            }
            return {
                success: true,
                result: deleted,
            }
        } catch (error) {
            return {
                success: false,
                result: null,
            }
        }
    }

    onFinish(): Promise<void> {
        return this.deletePaymentRepository.finish()
    }
}
