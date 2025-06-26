// Hoist the mock for OrderItemModel to avoid TypeORM metadata errors
vi.mock("../model", () => ({
    OrderItemModel: class {}
}))

import { describe, it, expect, vi, beforeEach } from "vitest"
import { FindOrderItemAllTypeORMRepository } from "./find-order-item-all-repository"

describe("FindOrderItemAllTypeORMRepository", () => {
    let repository: any
    let ormRepo: any

    beforeEach(() => {
        ormRepo = {
            find: vi.fn(),
            manager: { connection: { destroy: vi.fn() } },
        }
        repository = new FindOrderItemAllTypeORMRepository(ormRepo)
    })

    it("should return all order items", async () => {
        const mockOrderItems = [
            { id: 1, orderId: 1, productId: 2, quantity: 3, price: 10 },
            { id: 2, orderId: 1, productId: 3, quantity: 1, price: 20 },
        ]
        ormRepo.find.mockResolvedValue(mockOrderItems)
        const result = await repository.execute()
        expect(result).toEqual(mockOrderItems)
        expect(ormRepo.find).toHaveBeenCalled()
    })

    it("should call destroy on finish", async () => {
        await repository.finish()
        expect(ormRepo.manager.connection.destroy).toHaveBeenCalled()
    })
})

export {}
