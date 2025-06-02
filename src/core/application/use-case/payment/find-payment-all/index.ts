import { FindPaymentAllRepository } from "../../../port/payment/find-payment-all-repository"
import { Payment } from "../../../../domain/payment"
import { UseCase } from "../../base-use-case"

export class FindPaymentAllUseCase implements UseCase<void, Payment[]> {
    constructor(private findPaymentAllRepository: FindPaymentAllRepository) {}

    async execute() {
        try {
            const payments = await this.findPaymentAllRepository.execute()
            return {
                success: true,
                result: payments,
            }
        } catch (error) {
            return {
                success: false,
                result: [],
            }
        }
    }

    onFinish(): Promise<void> {
        return this.findPaymentAllRepository.finish()
    }
}
