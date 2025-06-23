import { Order } from "../../../../domain/order/order"
import { RepositoryBase } from "../../repository-base"

export interface FindOrderByStatusRepository
    extends RepositoryBase<string, Order[] | null> {}
