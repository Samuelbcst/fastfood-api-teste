import { describe, it, expect, vi } from "vitest"
import { makeFindCategoryByIdUseCase } from "./make-find-category-by-id-use-case"
import type { FindCategoryByIdRepository } from "../../../repositories/category/find-category-by-id-repository"

describe("makeFindCategoryByIdUseCase", () => {
    it("should create a FindCategoryByIdUseCase instance with the provided repository", () => {
        const mockRepository: FindCategoryByIdRepository = {
            execute: vi.fn(),
            finish: vi.fn(),
        }
        const useCase = makeFindCategoryByIdUseCase(mockRepository)
        expect(useCase).toBeDefined()
        expect(typeof useCase.execute).toBe("function")
        expect(typeof useCase.onFinish).toBe("function")
    })
})
