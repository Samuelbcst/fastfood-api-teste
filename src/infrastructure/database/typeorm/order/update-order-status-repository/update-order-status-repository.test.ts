// Mock the OrderModel import from the correct path used in update-order-status-repository.ts
vi.mock("../model", () => ({
    OrderModel: {},
}))

import { describe, it, expect, vi, beforeEach } from "vitest"
import { TypeOrmUpdateOrderStatusRepository } from "./update-order-status-repository"

const mockOrder = { id: 1, status: "pending", statusUpdatedAt: new Date(), updatedAt: new Date() }

describe("TypeOrmUpdateOrderStatusRepository", () => {
    let repository: any
    let ormRepo: any
    let now: Date

    beforeEach(() => {
        now = new Date()
        ormRepo = {
            findOne: vi.fn(),
            save: vi.fn(),
            manager: { connection: { destroy: vi.fn() } },
        }
        repository = new TypeOrmUpdateOrderStatusRepository(ormRepo)
    })

    it("should return null if order not found", async () => {
        ormRepo.findOne.mockResolvedValue(null)
        const result = await repository.execute({ id: 1, status: "paid" })
        expect(result).toBeNull()
        expect(ormRepo.findOne).toHaveBeenCalledWith({ where: { id: 1 } })
    })

    it("should update status and timestamps", async () => {
        const order = { ...mockOrder }
        ormRepo.findOne.mockResolvedValue(order)
        ormRepo.save.mockResolvedValue(undefined)
        const result = await repository.execute({ id: 1, status: "paid" })
        expect(result).toMatchObject({ ...order, status: "paid" })
        expect(ormRepo.save).toHaveBeenCalledWith(expect.objectContaining({ status: "paid" }))
        expect(result.statusUpdatedAt).toBeInstanceOf(Date)
        expect(result.updatedAt).toBeInstanceOf(Date)
    })

    it("should call destroy on finish", async () => {
        await repository.finish()
        expect(ormRepo.manager.connection.destroy).toHaveBeenCalled()
    })
})

export {}
