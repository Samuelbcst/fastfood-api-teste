import { BaseEntity } from "../../../../domain/base-entity"
import { Payment } from "../../../../domain/payment"
import { CreatePaymentRepository } from "../../../port/payment/create-payment-repository"
import { UseCase } from "../../base-use-case"
import { CustomError } from "../../custom-error"

type CreatePaymentInput = Omit<Payment, keyof BaseEntity>

export class CreatePaymentUseCase implements UseCase<Payment, void> {
    constructor(private createPaymentRepository: CreatePaymentRepository) {}

    async execute(input: CreatePaymentInput) {
        try {
            await this.createPaymentRepository.create(input)
            return {
                success: true,
                result: null,
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

    onFinish(): Promise<void> {
        return this.createPaymentRepository.finish()
    }
}
