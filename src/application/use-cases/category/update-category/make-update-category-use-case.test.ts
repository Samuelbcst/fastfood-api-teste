import { describe, it, expect, vi } from "vitest"
import { makeUpdateCategoryUseCase } from "./make-update-category-use-case"
import type { UpdateCategoryRepository } from "../../../ports/category/update-category-repository"

describe("makeUpdateCategoryUseCase", () => {
    it("should create an UpdateCategoryUseCase instance with the provided repository", () => {
        const mockRepository: UpdateCategoryRepository = {
            execute: vi.fn(),
            finish: vi.fn(),
        }
        const useCase = makeUpdateCategoryUseCase(mockRepository)
        expect(useCase).toBeDefined()
        expect(typeof useCase.execute).toBe("function")
        expect(typeof useCase.onFinish).toBe("function")
    })
})
