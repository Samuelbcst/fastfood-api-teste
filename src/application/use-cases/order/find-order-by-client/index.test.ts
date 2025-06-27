import { describe, it, expect, vi, beforeEach } from "vitest"
import { FindOrderByClientUseCase } from "."
import type { FindOrderByClientRepository } from "../../../repositories/order/find-order-by-client-repository"
import { CustomError } from "../../custom-error"
import { OrderStatus } from "../../../../domain/entities/order/order"

describe("FindOrderByClientUseCase", () => {
    let repository: FindOrderByClientRepository
    let useCase: FindOrderByClientUseCase
    const input = { clientId: 1 }
    const orders = [
        { id: 1, items: [], status: OrderStatus.RECEIVED, createdAt: new Date(), updatedAt: new Date(), statusUpdatedAt: new Date(), totalAmount: 100 },
        { id: 2, items: [], status: OrderStatus.FINISHED, createdAt: new Date(), updatedAt: new Date(), statusUpdatedAt: new Date(), totalAmount: 200 },
    ]

    beforeEach(() => {
        repository = {
            execute: vi.fn().mockResolvedValue(orders),
            finish: vi.fn().mockResolvedValue(undefined),
        }
        useCase = new FindOrderByClientUseCase(repository)
    })

    it("should return success true and all orders for the client", async () => {
        const result = await useCase.execute(input)
        expect(result.success).toBe(true)
        expect(result.result).toEqual(orders)
        expect(repository.execute).toHaveBeenCalledWith(input.clientId)
    })

    it("should return success false and CustomError when no orders found", async () => {
        repository.execute = vi.fn().mockResolvedValue([])
        useCase = new FindOrderByClientUseCase(repository)
        const result = await useCase.execute(input)
        expect(result.success).toBe(false)
        expect(result.result).toEqual([])
        expect(result.error).toBeInstanceOf(CustomError)
        expect(result.error?.message).toBe("No orders found for this client.")
    })

    it("should return success false and CustomError on repository error", async () => {
        repository.execute = vi.fn().mockRejectedValue(new Error("fail"))
        useCase = new FindOrderByClientUseCase(repository)
        const result = await useCase.execute(input)
        expect(result.success).toBe(false)
        expect(result.result).toEqual([])
        expect(result.error).toBeInstanceOf(CustomError)
        expect(result.error?.message).toBe("fail")
    })

    it("should call finish on repository when onFinish is called", async () => {
        await useCase.onFinish()
        expect(repository.finish).toHaveBeenCalled()
    })
})
