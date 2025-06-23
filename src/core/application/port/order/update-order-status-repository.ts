import { Order } from '../../../domain/order/order';
import { RepositoryBase } from '../repository-base';

export interface UpdateOrderStatusRepository extends RepositoryBase<{ id: number; status: string }, Order | null> {}
