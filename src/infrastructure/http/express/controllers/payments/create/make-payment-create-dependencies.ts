import { makeCreatePaymentUseCase } from "../../../../../../application/use-cases/payment/create-payment/make-create-payment-use-case"
import { makeCreatePaymentRepository } from "../../../../../../infrastructure/database/typeorm/payment/create-payment-repository/make-create-payment-repository"
import { makeFindOrderByIdRepository } from "../../../../../../infrastructure/database/typeorm/order/find-order-by-id-repository/make-find-order-by-id-repository"

export const makeCreatePaymentFactory = async () => {
    const paymentRepository = await makeCreatePaymentRepository()
    const orderRepository = await makeFindOrderByIdRepository()
    const useCase = makeCreatePaymentUseCase(paymentRepository, orderRepository)
    return useCase
}
