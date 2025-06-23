import { describe, it, expect } from "vitest"
import { makeFindOrderItemByIdUseCase } from "./make-find-order-item-by-id-use-case"
import { FindOrderItemByIdUseCase } from "./index"

describe("makeFindOrderItemByIdUseCase", () => {
    it("should return an instance of FindOrderItemByIdUseCase with the provided repository", () => {
        const repository = {
            execute: async () => ({} as any),
            finish: async () => {},
        }
        const useCase = makeFindOrderItemByIdUseCase(repository)
        expect(useCase).toBeInstanceOf(FindOrderItemByIdUseCase)
        expect(typeof useCase.execute).toBe("function")
        expect(typeof useCase.onFinish).toBe("function")
    })
})
