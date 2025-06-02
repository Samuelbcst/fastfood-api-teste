import { makeCreatePaymentUseCase } from "../../../../../../core/application/use-case/payment/create-payment/make-create-payment-use-case"
import { makeCreatePaymentRepository } from "../../../../../driven/persistence/typeorm/payment/create-payment-repository/make-create-payment-repository"

export const makeCreatePaymentFactory = async () => {
    const repository = await makeCreatePaymentRepository()
    const useCase = makeCreatePaymentUseCase(repository)
    return useCase
}
