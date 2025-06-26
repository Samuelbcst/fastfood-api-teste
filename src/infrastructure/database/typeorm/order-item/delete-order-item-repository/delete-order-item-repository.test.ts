// Mock the OrderItemModel import from the correct path used in delete-order-item-repository.ts
vi.mock("../model", () => ({
    OrderItemModel: {},
}))

import { describe, it, expect, vi, beforeEach } from "vitest"
import { DeleteOrderItemTypeORMRepository } from "./delete-order-item-repository"

const mockOrderItem = { id: 1, orderId: 1, productId: 2, quantity: 3, price: 10 }

describe("DeleteOrderItemTypeORMRepository", () => {
    let repository: any
    let ormRepo: any

    beforeEach(() => {
        ormRepo = {
            findOneBy: vi.fn(),
            remove: vi.fn(),
            manager: { connection: { destroy: vi.fn() } },
        }
        repository = new DeleteOrderItemTypeORMRepository(ormRepo)
    })

    it("should return null if order item not found", async () => {
        ormRepo.findOneBy.mockResolvedValue(null)
        const result = await repository.execute({ id: 1 })
        expect(result).toBeNull()
        expect(ormRepo.findOneBy).toHaveBeenCalledWith({ id: 1 })
    })

    it("should remove and return the order item if found", async () => {
        ormRepo.findOneBy.mockResolvedValue(mockOrderItem)
        ormRepo.remove.mockResolvedValue(undefined)
        const result = await repository.execute({ id: 1 })
        expect(result).toEqual(mockOrderItem)
        expect(ormRepo.remove).toHaveBeenCalledWith(mockOrderItem)
    })

    it("should call destroy on finish", async () => {
        await repository.finish()
        expect(ormRepo.manager.connection.destroy).toHaveBeenCalled()
    })
})

export {}
