import { CreatePaymentUseCase } from "."
import { CreatePaymentRepository } from "../../../repositories/payment/create-payment-repository"
import { FindOrderByIdRepository } from '../../../repositories/order/find-order-by-id-repository'

export const makeCreatePaymentUseCase = (
    paymentRepository: CreatePaymentRepository,
    orderRepository: FindOrderByIdRepository
): CreatePaymentUseCase => new CreatePaymentUseCase(paymentRepository, orderRepository)
