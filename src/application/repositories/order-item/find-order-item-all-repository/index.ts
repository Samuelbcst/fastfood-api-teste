import { OrderItem } from '../../../../domain/entities/order-item/order-item'
import { RepositoryBase } from "../../repository-base"

export interface FindOrderItemAllRepository
    extends RepositoryBase<void, OrderItem[]> {}

