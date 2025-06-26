// Mock the OrderModel import from the correct path used in find-order-by-id-repository.ts
vi.mock("../model", () => ({
    OrderModel: {},
}))

import { describe, it, expect, vi, beforeEach } from "vitest"
import { TypeOrmFindOrderByIdRepository } from "./find-order-by-id-repository"

const mockOrder = { id: 1, clientId: 1, total: 100, status: "pending", items: [] }

describe("TypeOrmFindOrderByIdRepository", () => {
    let repository: any
    let ormRepo: any

    beforeEach(() => {
        ormRepo = {
            findOne: vi.fn(),
            manager: { connection: { destroy: vi.fn() } },
        }
        repository = new TypeOrmFindOrderByIdRepository(ormRepo)
    })

    it("should return the order with items if found", async () => {
        ormRepo.findOne.mockResolvedValue(mockOrder)
        const result = await repository.execute(1)
        expect(result).toEqual(mockOrder)
        expect(ormRepo.findOne).toHaveBeenCalledWith({ where: { id: 1 }, relations: ["items"] })
    })

    it("should return null if not found", async () => {
        ormRepo.findOne.mockResolvedValue(null)
        const result = await repository.execute(2)
        expect(result).toBeNull()
        expect(ormRepo.findOne).toHaveBeenCalledWith({ where: { id: 2 }, relations: ["items"] })
    })

    it("should call destroy on finish", async () => {
        await repository.finish()
        expect(ormRepo.manager.connection.destroy).toHaveBeenCalled()
    })
})

export {}
