import { describe, it, expect } from "vitest"
import { makeFindProductByCategoryUseCase } from "./make-find-product-by-ccategory-use-case"

describe("makeFindProductByCategoryUseCase", () => {
    it("should return an instance of FindProductByCategoryUseCase", () => {
        const mockRepo = { execute: () => {}, finish: () => {} }
        const useCase = makeFindProductByCategoryUseCase(mockRepo as any)
        expect(useCase).toBeDefined()
        expect(typeof useCase.execute).toBe("function")
        expect(typeof useCase.onFinish).toBe("function")
    })
})
