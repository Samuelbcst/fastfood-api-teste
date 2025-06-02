import { describe, it, expect, vi } from "vitest"
import { FindOrderByIdUseCase } from "./index"

const mockRepository = {
    findById: vi.fn(),
    finish: vi.fn(),
}

describe("FindOrderByIdUseCase", () => {
    it("should return success on find", async () => {
        mockRepository.findById.mockResolvedValueOnce({})
        const useCase = new FindOrderByIdUseCase(mockRepository as any)
        const result = await useCase.execute({ id: 1 })
        expect(result.success).toBe(true)
        expect(result.result).not.toBeNull()
    })

    it("should return error on not found", async () => {
        mockRepository.findById.mockResolvedValueOnce(null)
        const useCase = new FindOrderByIdUseCase(mockRepository as any)
        const result = await useCase.execute({ id: 1 })
        expect(result.success).toBe(false)
        expect(result.result).toBeNull()
        expect(result.error).toBeDefined()
    })

    it("should return error on failure", async () => {
        mockRepository.findById.mockRejectedValueOnce(new Error("fail"))
        const useCase = new FindOrderByIdUseCase(mockRepository as any)
        const result = await useCase.execute({ id: 1 })
        expect(result.success).toBe(false)
        expect(result.result).toBeNull()
        expect(result.error).toBeDefined()
    })
})
