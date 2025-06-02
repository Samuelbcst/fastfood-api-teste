import { PaymentModel } from "../model"
import { DeletePaymentTypeORMRepository } from "./delete-payment-repository"
import dataSource from "../../"

export const makeDeletePaymentRepository = async () => {
    await dataSource.initialize()
    const paymentRepository = dataSource.getRepository(PaymentModel)
    return new DeletePaymentTypeORMRepository(paymentRepository)
}
