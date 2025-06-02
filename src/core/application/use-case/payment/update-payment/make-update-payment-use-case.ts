import { UpdatePaymentUseCase } from "."
import { UpdatePaymentRepository } from "../../../port/payment/update-payment-repository"

export const makeUpdatePaymentUseCase = (
    repository: UpdatePaymentRepository
) => new UpdatePaymentUseCase(repository)
