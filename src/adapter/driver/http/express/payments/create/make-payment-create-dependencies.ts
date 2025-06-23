import { makeCreatePaymentUseCase } from "../../../../../../core/application/use-case/payment/create-payment/make-create-payment-use-case"
import { makeCreatePaymentRepository } from "../../../../../driven/persistence/typeorm/payment/create-payment-repository/make-create-payment-repository"
import { makeFindOrderByIdRepository } from "../../../../../driven/persistence/typeorm/order/find-order-by-id-repository/make-find-order-by-id-repository"

export const makeCreatePaymentFactory = async () => {
    const paymentRepository = await makeCreatePaymentRepository()
    const orderRepository = await makeFindOrderByIdRepository()
    const useCase = makeCreatePaymentUseCase(paymentRepository, orderRepository)
    return useCase
}
