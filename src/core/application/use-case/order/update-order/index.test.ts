import { describe, it, expect, vi } from "vitest"
import { UpdateOrderUseCase } from "./index"

const mockRepository = {
    update: vi.fn(),
    finish: vi.fn(),
}

describe("UpdateOrderUseCase", () => {
    it("should return success on update", async () => {
        mockRepository.update.mockResolvedValueOnce({})
        const useCase = new UpdateOrderUseCase(mockRepository as any)
        const result = await useCase.execute({ id: 1 })
        expect(result.success).toBe(true)
        expect(result.result).not.toBeNull()
    })

    it("should return error on failure", async () => {
        mockRepository.update.mockRejectedValueOnce(new Error("fail"))
        const useCase = new UpdateOrderUseCase(mockRepository as any)
        const result = await useCase.execute({ id: 1 })
        expect(result.success).toBe(false)
        expect(result.result).toBeNull()
        expect(result.error).toBeDefined()
    })
})
