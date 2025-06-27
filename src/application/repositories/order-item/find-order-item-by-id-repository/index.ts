import { OrderItem } from '../../../../domain/entities/order-item/order-item'
import { RepositoryBase } from "../../repository-base"

export interface FindOrderItemByIdRepository
    extends RepositoryBase<number, OrderItem | null> {}



