import { makeFindPaymentAllUseCase } from "../../../../../../core/application/use-case/payment/find-payment-all/make-find-payment-all-use-case"
import { makeFindPaymentAllRepository } from "../../../../../driven/persistence/typeorm/payment/find-payment-all-repository/make-find-payment-all-repository"

export const makeGetPaymentAllFactory = async () => {
    const repository = await makeFindPaymentAllRepository()
    const useCase = makeFindPaymentAllUseCase(repository)
    return useCase
}
