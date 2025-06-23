import { describe, it, expect, vi } from "vitest"
import { makeFindCategoryAllUseCase } from "./make-find-category-all-use-case"
import type { FindCategoryAllRepository } from "../../../port/category/find-category-all-repository"

describe("makeFindCategoryAllUseCase", () => {
    it("should create a FindCategoryAllUseCase instance with the provided repository", () => {
        const mockRepository: FindCategoryAllRepository = {
            execute: vi.fn(),
            finish: vi.fn(),
        }
        const useCase = makeFindCategoryAllUseCase(mockRepository)
        expect(useCase).toBeDefined()
        expect(typeof useCase.execute).toBe("function")
        expect(typeof useCase.onFinish).toBe("function")
    })
})
