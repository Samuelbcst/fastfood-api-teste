import { Order } from "../../../../domain/entities/order/order"
import { RepositoryBase } from "../../repository-base"

export interface FindOrderAllRepository
    extends RepositoryBase<void, Order[]> {}
