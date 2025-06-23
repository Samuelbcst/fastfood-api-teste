import { PaymentModel } from "../model"
import { UpdatePaymentTypeORMRepository } from "./update-payment-repository"
import dataSource from "../../"

export const makeUpdatePaymentRepository = async () => {
    if (!dataSource.isInitialized) {
        await dataSource.initialize()
    }
    const paymentRepository = dataSource.getRepository(PaymentModel)
    return new UpdatePaymentTypeORMRepository(paymentRepository)
}
