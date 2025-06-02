import { Payment } from "../../../../domain/payment"
import { RepositoryBase } from "../../repository-base"

export interface DeletePaymentRepository extends RepositoryBase<{
    id: number
}, Payment | null> {}
