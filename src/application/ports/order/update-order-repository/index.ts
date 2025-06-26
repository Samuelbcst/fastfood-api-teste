import { Order } from '../../../../domain/entities/order/order'
import { RepositoryBase } from "../../repository-base"

export interface UpdateOrderRepository extends RepositoryBase<{
    id: number
    clientId?: string | number
    items?: Order["items"]
    status?: Order["status"]
    createdAt?: Date
    statusUpdatedAt?: Date
    totalAmount?: number
    pickupCode?: string
}, Order | null> {}