import { UpdatePaymentUseCase } from "."
import { UpdatePaymentRepository } from "../../../repositories/payment/update-payment-repository"

export const makeUpdatePaymentUseCase = (
    repository: UpdatePaymentRepository
) => new UpdatePaymentUseCase(repository)
