import { PaymentModel } from "../model"
import { FindPaymentAllTypeORMRepository } from "./find-payment-all-repository"
import dataSource from "../../"

export const makeFindPaymentAllRepository = async () => {
    await dataSource.initialize()
    const productRepository = dataSource.getRepository(PaymentModel)
    return new FindPaymentAllTypeORMRepository(productRepository)
}
