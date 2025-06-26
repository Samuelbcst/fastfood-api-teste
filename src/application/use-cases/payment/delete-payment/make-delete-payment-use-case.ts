import { DeletePaymentUseCase } from "."
import { DeletePaymentRepository } from "../../../ports/payment/delete-payment-repository"

export const makeDeletePaymentUseCase = (
    repository: DeletePaymentRepository
) => new DeletePaymentUseCase(repository)
