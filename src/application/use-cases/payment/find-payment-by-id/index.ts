import { Payment } from "../../../../domain/entities/payment/payment"
import { FindPaymentByIdRepository } from "../../../repositories/payment/find-payment-by-id-repository"
import { UseCase } from "../../base-use-case"
import { CustomError } from "../../custom-error"

interface Input {
    id: number
}

export class FindPaymentByIdUseCase implements UseCase<Input, Payment> {
    constructor(
        private findPaymentByIdRepository: FindPaymentByIdRepository
    ) {}

    async execute(input: Input) {
        try {
            const payment = await this.findPaymentByIdRepository.execute(
                input.id
            )

            if (!payment) {
                return {
                    success: false,
                    result: null,
                    error: new CustomError(404, "Payment not found."),
                }
            }

            return {
                success: payment !== null,
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
        return this.findPaymentByIdRepository.finish()
    }
}
