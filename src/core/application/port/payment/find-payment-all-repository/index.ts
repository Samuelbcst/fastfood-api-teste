import { Payment } from "../../../../domain/payment/payment"
import { RepositoryBase } from "../../repository-base"

export interface FindPaymentAllRepository extends RepositoryBase<void, Payment[]> {}
