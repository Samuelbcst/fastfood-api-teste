// Mock the OrderModel import from the correct path used in create-order-repository.ts
vi.mock("../model", () => ({
    OrderModel: {
        create: vi.fn(),
    },
}))

import { describe, it, expect, vi, beforeEach } from "vitest"
import { TypeOrmCreateOrderRepository } from "./create-order-repository"

const mockOrder = { clientId: 1, total: 100, status: "pending" }

describe("TypeOrmCreateOrderRepository", () => {
    let repository: any
    let ormRepo: any
    let OrderModel: any

    beforeEach(async () => {
        ormRepo = {
            manager: { connection: { destroy: vi.fn() } },
        }
        OrderModel = (await vi.importMock("../model")).OrderModel
        repository = new TypeOrmCreateOrderRepository(ormRepo)
    })

    it("should create and save an order", async () => {
        const save = vi.fn().mockResolvedValue(undefined)
        OrderModel.create.mockReturnValue({ ...mockOrder, save })
        await repository.create(mockOrder)
        expect(OrderModel.create).toHaveBeenCalledWith(mockOrder)
        expect(save).toHaveBeenCalled()
    })

    it("should call destroy on finish", async () => {
        await repository.finish()
        expect(ormRepo.manager.connection.destroy).toHaveBeenCalled()
    })
})

export {}
