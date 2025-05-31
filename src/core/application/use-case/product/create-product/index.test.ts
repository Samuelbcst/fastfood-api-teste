import { describe, it, expect, vi } from "vitest"
import { CreateProductUseCase } from "./index"

const mockRepository = {
    create: vi.fn(),
    finish: vi.fn(),
}

describe("CreateProductUseCase", () => {
    it("should return success on create", async () => {
        mockRepository.create.mockResolvedValueOnce({})
        const useCase = new CreateProductUseCase(mockRepository as any)
        const result = await useCase.execute({ name: "prod", price: 1, categoryId: 1 })
        expect(result.success).toBe(true)
        expect(result.result).toBeNull()
    })

    it("should return error on failure", async () => {
        mockRepository.create.mockRejectedValueOnce(new Error("fail"))
        const useCase = new CreateProductUseCase(mockRepository as any)
        const result = await useCase.execute({ name: "prod", price: 1, categoryId: 1 })
        expect(result.success).toBe(false)
        expect(result.result).toBeNull()
        expect(result.error).toBeDefined()
    })
})
