import { makeUpdateOrderStatusUseCase } from "../../../../../../application/use-cases/order/update-order-status/make-update-order-status-use-case"
import { makeUpdateOrderStatusRepository } from "../../../../../../infrastructure/database/typeorm/order/update-order-status-repository/make-update-order-status-repository"


export const makeUpdateOrderStatusFactory = async () => {
    const repository = await makeUpdateOrderStatusRepository();
    const useCase = makeUpdateOrderStatusUseCase(repository);
    return useCase;
}
