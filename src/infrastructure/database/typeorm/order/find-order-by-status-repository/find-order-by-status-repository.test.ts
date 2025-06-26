// Mock the OrderModel import from the correct path used in find-order-by-status-repository.ts
vi.mock("../model", () => ({
    OrderModel: {},
}))

import { describe, it, expect, vi, beforeEach } from "vitest"
import { FindOrderByStatusTypeORMRepository } from "./find-order-by-status-repository"

describe("FindOrderByStatusTypeORMRepository", () => {
    let repository: any
    let ormRepo: any

    beforeEach(() => {
        ormRepo = {
            find: vi.fn(),
            manager: { connection: { destroy: vi.fn() } },
        }
        repository = new FindOrderByStatusTypeORMRepository(ormRepo)
    })

    it("should return all orders with the given status and items relation", async () => {
        const mockOrders = [
            { id: 1, clientId: 1, total: 100, status: "pending", items: [] },
            { id: 2, clientId: 2, total: 200, status: "pending", items: [] },
        ]
        ormRepo.find.mockResolvedValue(mockOrders)
        const result = await repository.execute("pending")
        expect(result).toEqual(mockOrders)
        expect(ormRepo.find).toHaveBeenCalledWith({ where: { status: "pending" }, relations: ["items"] })
    })

    it("should call destroy on finish", async () => {
        await repository.finish()
        expect(ormRepo.manager.connection.destroy).toHaveBeenCalled()
    })
})

export {}
