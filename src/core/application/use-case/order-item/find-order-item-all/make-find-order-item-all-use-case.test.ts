import { describe, it, expect } from "vitest"
import { makeFindOrderItemAllUseCase } from "./make-find-order-item-all-use-case"
import { FindOrderItemAllUseCase } from "./index"

describe("makeFindOrderItemAllUseCase", () => {
    it("should return an instance of FindOrderItemAllUseCase with the provided repository", () => {
        const repository = {
            execute: async () => [],
            finish: async () => {},
        }
        const useCase = makeFindOrderItemAllUseCase(repository)
        expect(useCase).toBeInstanceOf(FindOrderItemAllUseCase)
        expect(typeof useCase.execute).toBe("function")
        expect(typeof useCase.onFinish).toBe("function")
    })
})
