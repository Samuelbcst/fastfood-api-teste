import { describe, it, expect, vi } from "vitest"
import { makeDeleteCategoryUseCase } from "./make-delete-category-use-case"
import type { DeleteCategoryRepository } from "../../../repositories/category/delete-category-repository"

describe("makeDeleteCategoryUseCase", () => {
    it("should create a DeleteCategoryUseCase instance with the provided repository", () => {
        const mockRepository: DeleteCategoryRepository = {
            execute: vi.fn(),
            finish: vi.fn(),
        }
        const useCase = makeDeleteCategoryUseCase(mockRepository)
        expect(useCase).toBeDefined()
        expect(typeof useCase.execute).toBe("function")
        expect(typeof useCase.onFinish).toBe("function")
    })
})
