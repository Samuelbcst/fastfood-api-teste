import { makeDeletePaymentUseCase } from "../../../../../../application/use-cases/payment/delete-payment/make-delete-payment-use-case"
import { makeDeletePaymentRepository } from "../../../../../../infrastructure/database/typeorm/payment/delete-payment-repository/make-delete-payment-repository"

export const makeDeletePaymentFactory = async () => {
    const deletePaymentRepository = await makeDeletePaymentRepository()
    const useCase = makeDeletePaymentUseCase(deletePaymentRepository)
    return useCase
}
