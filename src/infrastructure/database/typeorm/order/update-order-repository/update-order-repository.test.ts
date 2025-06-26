// Mock the OrderModel and OrderItemModel imports from the correct paths used in update-order-repository.ts
vi.mock("../model", () => ({
    OrderModel: {},
}))
vi.mock("../../order-item/model", () => ({
    // Use a class with a type annotation to avoid 'this' implicitly has type 'any'
    OrderItemModel: class OrderItemModel {},
}))

import { describe, it, expect, vi, beforeEach } from "vitest"
import { TypeOrmUpdateOrderRepository } from "./update-order-repository"

const mockOrder = { id: 1, clientId: 1, items: [], status: "pending", statusUpdatedAt: new Date(), totalAmount: 100, pickupCode: "ABC", updatedAt: new Date() }

// Helper to create mock items
const makeItems = () => [
    { id: 10, name: "item1", price: 5 },
    { id: 11, name: "item2", price: 10 },
]

describe("TypeOrmUpdateOrderRepository", () => {
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
        repository = new TypeOrmUpdateOrderRepository(ormRepo)
    })

    it("should return null if order not found", async () => {
        ormRepo.findOne.mockResolvedValue(null)
        const result = await repository.execute({ id: 1, clientId: 2 })
        expect(result).toBeNull()
        expect(ormRepo.findOne).toHaveBeenCalledWith({ where: { id: 1 }, relations: ["items"] })
    })

    it("should update all fields if provided", async () => {
        const order = { ...mockOrder }
        ormRepo.findOne.mockResolvedValue(order)
        ormRepo.save.mockResolvedValue(undefined)
        const items = makeItems()
        const result = await repository.execute({
            id: 1,
            clientId: 2,
            items,
            status: "paid",
            statusUpdatedAt: now,
            totalAmount: 200,
            pickupCode: "XYZ"
        })
        expect(result).toMatchObject({
            ...order,
            clientId: 2,
            status: "paid",
            statusUpdatedAt: now,
            totalAmount: 200,
            pickupCode: "XYZ",
        })
        expect(Array.isArray(result.items)).toBe(true)
        expect(ormRepo.save).toHaveBeenCalledWith(expect.objectContaining({ clientId: 2, status: "paid", totalAmount: 200, pickupCode: "XYZ" }))
    })

    it("should only update provided fields", async () => {
        const order = { ...mockOrder }
        ormRepo.findOne.mockResolvedValue(order)
        ormRepo.save.mockResolvedValue(undefined)
        const result = await repository.execute({ id: 1, status: "cancelled" })
        expect(result).toMatchObject({ ...order, status: "cancelled" })
        expect(ormRepo.save).toHaveBeenCalledWith(expect.objectContaining({ status: "cancelled" }))
    })

    it("should call destroy on finish", async () => {
        await repository.finish()
        expect(ormRepo.manager.connection.destroy).toHaveBeenCalled()
    })
})

export {}
