import { OrderItem } from '../../../../domain/entities/order-item/order-item'
import { RepositoryBase } from "../../repository-base"

export interface UpdateOrderItemRepository extends RepositoryBase<{
    id: number
    orderId?: string | number
    productId?: string | number
    productName?: string
    unitPrice?: number
    quantity?: number
}, OrderItem | null> {}