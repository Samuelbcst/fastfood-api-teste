import { describe, it, expect, vi } from "vitest"
import { FindOrderAllUseCase } from "./index"

const mockRepository = {
    findAll: vi.fn(),
    finish: vi.fn(),
}

describe("FindOrderAllUseCase", () => {
    it("should return success on findAll", async () => {
        mockRepository.findAll.mockResolvedValueOnce([])
        const useCase = new FindOrderAllUseCase(mockRepository as any)
        const result = await useCase.execute()
        expect(result.success).toBe(true)
        expect(Array.isArray(result.result)).toBe(true)
    })

    it("should return error on failure", async () => {
        mockRepository.findAll.mockRejectedValueOnce(new Error("fail"))
        const useCase = new FindOrderAllUseCase(mockRepository as any)
        const result = await useCase.execute()
        expect(result.success).toBe(false)
        expect(result.result).toEqual([])
    })
})
