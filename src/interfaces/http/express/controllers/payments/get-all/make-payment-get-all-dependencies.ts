import { makeFindPaymentAllUseCase } from "../../../../../../application/use-cases/payment/find-payment-all/make-find-payment-all-use-case"
import { makeFindPaymentAllRepository } from "../../../../../../infrastructure/database/typeorm/payment/find-payment-all-repository/make-find-payment-all-repository"

export const makeGetPaymentAllFactory = async () => {
    const repository = await makeFindPaymentAllRepository()
    const useCase = makeFindPaymentAllUseCase(repository)
    return useCase
}
