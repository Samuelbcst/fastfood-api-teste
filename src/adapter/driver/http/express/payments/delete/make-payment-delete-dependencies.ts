import { makeDeletePaymentUseCase } from "../../../../../../core/application/use-case/payment/delete-payment/make-delete-payment-use-case"
import { makeDeletePaymentRepository } from "../../../../../driven/persistence/typeorm/payment/delete-payment-repository/make-delete-payment-repository"

export const makeDeletePaymentFactory = async () => {
    const deletePaymentRepository = await makeDeletePaymentRepository()
    const useCase = makeDeletePaymentUseCase(deletePaymentRepository)
    return useCase
}
