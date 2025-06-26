// Mock the OrderModel import from the correct path used in delete-order-repository.ts
vi.mock("../model", () => ({
    OrderModel: {},
}))

import { describe, it, expect, vi, beforeEach } from "vitest"
import { DeleteOrderTypeORMRepository } from "./delete-order-repository"

const mockOrder = { id: 1, clientId: 1, total: 100, status: "pending" }

describe("DeleteOrderTypeORMRepository", () => {
    let repository: any
    let ormRepo: any

    beforeEach(() => {
        ormRepo = {
            findOneBy: vi.fn(),
            remove: vi.fn(),
            manager: { connection: { destroy: vi.fn() } },
        }
        repository = new DeleteOrderTypeORMRepository(ormRepo)
    })

    it("should return null if order not found", async () => {
        ormRepo.findOneBy.mockResolvedValue(null)
        const result = await repository.execute({ id: 1 })
        expect(result).toBeNull()
        expect(ormRepo.findOneBy).toHaveBeenCalledWith({ id: 1 })
    })

    it("should remove and return the order if found", async () => {
        ormRepo.findOneBy.mockResolvedValue(mockOrder)
        ormRepo.remove.mockResolvedValue(undefined)
        const result = await repository.execute({ id: 1 })
        expect(result).toEqual(mockOrder)
        expect(ormRepo.remove).toHaveBeenCalledWith(mockOrder)
    })

    it("should call destroy on finish", async () => {
        await repository.finish()
        expect(ormRepo.manager.connection.destroy).toHaveBeenCalled()
    })
})

export {}
