import { Order } from "../../../../domain/entities/order/order"
import { RepositoryBase } from "../../repository-base"

export interface FindOrderByStatusRepository
    extends RepositoryBase<string, Order[] | null> {}
