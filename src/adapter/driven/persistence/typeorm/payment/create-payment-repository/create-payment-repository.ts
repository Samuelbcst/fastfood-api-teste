import { Repository } from "typeorm/repository/Repository"
import { CreatePaymentRepository } from "../../../../../../core/application/port/payment/create-payment-repository"
import { BaseEntity } from "../../../../../../core/domain/base-entity"
import { Payment } from "../../../../../../core/domain/payment/payment"
import { PaymentModel } from "../model"

export class TypeOrmCreatePaymentRepository implements CreatePaymentRepository {
    constructor(private readonly repository: Repository<PaymentModel>) {}

    async create({ orderId, amount, paymentStatus, paidAt }: Omit<Payment, keyof BaseEntity>) {
        const payment = this.repository.create({ orderId, amount, paymentStatus, paidAt })
        await this.repository.save(payment)
        return payment
    }

    async finish() {
        console.log("Finishing TypeOrmCreatePaymentRepository")
        // await this.repository.manager.connection.destroy()
    }
}
