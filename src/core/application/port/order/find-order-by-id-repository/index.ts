import { Order } from "../../../../domain/order"
import { RepositoryBase } from "../../repository-base"

export interface FindOrderByIdRepository
    extends RepositoryBase<number, Order | null> {}
