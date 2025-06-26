import { makeFindPaymentByIdUseCase } from "../../../../../../application/use-cases/payment/find-payment-by-id/make-find-payment-by-id-use-case"
import { makeFindPaymentByIdRepository } from "../../../../../../infrastructure/database/typeorm/payment/find-payment-by-id-repository/make-find-payment-by-id-repository"

export const makeGetPaymentByIdFactory = async () => {
    const repository = await makeFindPaymentByIdRepository()
    const useCase = makeFindPaymentByIdUseCase(repository)
    return useCase
}
