// Mock the OrderModel import from the correct path used in find-order-all-repository.ts
vi.mock("../model", () => ({
    OrderModel: {},
}))

import { describe, it, expect, vi, beforeEach } from "vitest"
import { FindOrderAllTypeORMRepository } from "./find-order-all-repository"

describe("FindOrderAllTypeORMRepository", () => {
    let repository: any
    let ormRepo: any

    beforeEach(() => {
        ormRepo = {
            find: vi.fn(),
            manager: { connection: { destroy: vi.fn() } },
        }
        repository = new FindOrderAllTypeORMRepository(ormRepo)
    })

    it("should return all orders with items relation", async () => {
        const mockOrders = [
            { id: 1, clientId: 1, total: 100, status: "pending", items: [] },
            { id: 2, clientId: 2, total: 200, status: "paid", items: [] },
        ]
        ormRepo.find.mockResolvedValue(mockOrders)
        const result = await repository.execute()
        expect(result).toEqual(mockOrders)
        expect(ormRepo.find).toHaveBeenCalledWith({ relations: ["items"] })
    })

    it("should call destroy on finish", async () => {
        await repository.finish()
        expect(ormRepo.manager.connection.destroy).toHaveBeenCalled()
    })
})

export {}
