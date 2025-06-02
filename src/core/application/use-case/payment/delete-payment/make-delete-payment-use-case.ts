import { DeletePaymentUseCase } from "."
import { DeletePaymentRepository } from "../../../port/payment/delete-payment-repository"

export const makeDeletePaymentUseCase = (
    repository: DeletePaymentRepository
) => new DeletePaymentUseCase(repository)
