import { describe, it, expect, vi } from "vitest"
import { CreateCategoryUseCase } from "./index"

const mockRepository = {
    create: vi.fn(),
    finish: vi.fn(),
}

describe("CreateCategoryUseCase", () => {
    it("should return success on create", async () => {
        mockRepository.create.mockResolvedValueOnce({})
        const useCase = new CreateCategoryUseCase(mockRepository as any)
        const result = await useCase.execute({ name: "cat" })
        expect(result.success).toBe(true)
        expect(result.result).toBeNull()
    })

    it("should return error on failure", async () => {
        mockRepository.create.mockRejectedValueOnce(new Error("fail"))
        const useCase = new CreateCategoryUseCase(mockRepository as any)
        const result = await useCase.execute({ name: "cat" })
        expect(result.success).toBe(false)
        expect(result.result).toBeNull()
        expect(result.error).toBeDefined()
    })
})
