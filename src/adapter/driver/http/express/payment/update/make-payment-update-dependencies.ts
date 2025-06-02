import { makeUpdatePaymentUseCase } from "../../../../../../core/application/use-case/payment/update-payment/make-update-payment-use-case"
import { makeUpdatePaymentRepository } from "../../../../../driven/persistence/typeorm/payment/update-payment-repository/make-update-payment-repository"

export const makeUpdatePaymentFactory = async () => {
    const updatePaymentRepository = await makeUpdatePaymentRepository()
    const useCase = makeUpdatePaymentUseCase(updatePaymentRepository)
    return useCase
}
