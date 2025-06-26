import { UpdatePaymentUseCase } from "."
import { UpdatePaymentRepository } from "../../../ports/payment/update-payment-repository"

export const makeUpdatePaymentUseCase = (
    repository: UpdatePaymentRepository
) => new UpdatePaymentUseCase(repository)
