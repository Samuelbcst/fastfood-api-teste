import { Repository } from "typeorm"
import { Payment } from "../../../../../domain/entities/payment/payment"
import { PaymentModel } from "../model"
import { UpdatePaymentRepository as IUpdatePaymentRepository } from "../../../../../application/repositories/payment/update-payment-repository/index"

export class UpdatePaymentTypeORMRepository implements IUpdatePaymentRepository {
    constructor(private readonly repository: Repository<PaymentModel>) {}

    async execute(param: { id: Payment["id"]; orderId?: Payment["orderId"]; paymentStatus?: Payment["paymentStatus"]; paidAt?: Payment["paidAt"] }): Promise<Payment | null> {
        const { id, orderId, paymentStatus, paidAt } = param;
        const payment = await this.repository.findOneBy({ id });
        if (!payment) return null;
        if (orderId !== undefined) payment.orderId = orderId;
        if (paymentStatus !== undefined) payment.paymentStatus = paymentStatus;
        if (paidAt !== undefined) payment.paidAt = paidAt;
        payment.updatedAt = new Date();
        await this.repository.save(payment);
        return payment;
    }

    finish() {
        return this.repository.manager.connection.destroy()
    }
}
