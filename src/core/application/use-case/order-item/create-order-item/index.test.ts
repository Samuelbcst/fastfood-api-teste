import { describe, it, expect, vi } from "vitest"
import { CreateOrderItemUseCase } from "./index"

const mockRepository = {
    create: vi.fn(),
    finish: vi.fn(),
}

describe("CreateOrderItemUseCase", () => {
    it("should return success on create", async () => {
        mockRepository.create.mockResolvedValueOnce({})
        const useCase = new CreateOrderItemUseCase(mockRepository as any)
        const result = await useCase.execute({ orderId: 1, productId: 2, productName: "prod", unitPrice: 10, quantity: 2 })
        expect(result.success).toBe(true)
        expect(result.result).toBeNull()
    })

    it("should return error on failure", async () => {
        mockRepository.create.mockRejectedValueOnce(new Error("fail"))
        const useCase = new CreateOrderItemUseCase(mockRepository as any)
        const result = await useCase.execute({ orderId: 1, productId: 2, productName: "prod", unitPrice: 10, quantity: 2 })
        expect(result.success).toBe(false)
        expect(result.result).toBeNull()
        expect(result.error).toBeDefined()
    })
})
