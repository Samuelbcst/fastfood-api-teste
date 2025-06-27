import { DeletePaymentUseCase } from "."
import { DeletePaymentRepository } from "../../../repositories/payment/delete-payment-repository"

export const makeDeletePaymentUseCase = (
    repository: DeletePaymentRepository
) => new DeletePaymentUseCase(repository)
