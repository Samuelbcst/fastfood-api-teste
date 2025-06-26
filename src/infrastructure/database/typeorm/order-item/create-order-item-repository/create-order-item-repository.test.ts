// Mock the OrderItemModel import from the correct path used in create-order-item-repository.ts
vi.mock("../model", () => ({
    OrderItemModel: {
        create: vi.fn(),
    },
}))

import { describe, it, expect, vi, beforeEach } from "vitest"
import { TypeOrmCreateOrderItemRepository } from "./create-order-item-repository"

const mockOrderItem = { orderId: 1, productId: 2, quantity: 3, price: 10 }

describe("TypeOrmCreateOrderItemRepository", () => {
    let repository: any
    let ormRepo: any
    let OrderItemModel: any

    beforeEach(async () => {
        ormRepo = {
            manager: { connection: { destroy: vi.fn() } },
        }
        OrderItemModel = (await vi.importMock("../model")).OrderItemModel
        repository = new TypeOrmCreateOrderItemRepository(ormRepo)
    })

    it("should create and save an order item", async () => {
        const save = vi.fn().mockResolvedValue(undefined)
        OrderItemModel.create.mockReturnValue({ ...mockOrderItem, save })
        await repository.create(mockOrderItem)
        expect(OrderItemModel.create).toHaveBeenCalledWith(mockOrderItem)
        expect(save).toHaveBeenCalled()
    })

    it("should call destroy on finish", async () => {
        await repository.finish()
        expect(ormRepo.manager.connection.destroy).toHaveBeenCalled()
    })
})

export {}
