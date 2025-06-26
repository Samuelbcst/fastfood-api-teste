import { describe, it, expect } from "vitest"
import { makeFindOrderByIdUseCase } from "./make-find-order-by-id-use-case"
import { FindOrderByIdUseCase } from "./index"

describe("makeFindOrderByIdUseCase", () => {
    it("should return an instance of FindOrderByIdUseCase with the provided repository", () => {
        const repository = {
            execute: async () => ({} as any),
            finish: async () => {},
        }
        const useCase = makeFindOrderByIdUseCase(repository)
        expect(useCase).toBeInstanceOf(FindOrderByIdUseCase)
        expect(typeof useCase.execute).toBe("function")
        expect(typeof useCase.onFinish).toBe("function")
    })
})
