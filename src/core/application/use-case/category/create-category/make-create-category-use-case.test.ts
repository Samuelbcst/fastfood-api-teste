import { describe, it, expect, vi } from "vitest"
import { makeCreateCategoryUseCase } from "./make-create-category-use-case"
import type { CreateCategoryRepository } from "../../../port/category/create-category-repository"

describe("makeCreateCategoryUseCase", () => {
    it("should create a CreateCategoryUseCase instance with the provided repository", () => {
        const mockRepository: CreateCategoryRepository = {
            create: vi.fn(),
            finish: vi.fn(),
        }
        const useCase = makeCreateCategoryUseCase(mockRepository)
        expect(useCase).toBeDefined()
        expect(typeof useCase.execute).toBe("function")
        expect(typeof useCase.onFinish).toBe("function")
    })
})
