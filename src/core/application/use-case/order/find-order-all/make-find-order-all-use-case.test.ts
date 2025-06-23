import { describe, it, expect } from "vitest"
import { makeFindOrderAllUseCase } from "./make-find-order-all-use-case"
import { FindOrderAllUseCase } from "./index"

describe("makeFindOrderAllUseCase", () => {
    it("should return an instance of FindOrderAllUseCase with the provided repository", () => {
        const repository = {
            execute: async () => [],
            finish: async () => {},
        }
        const useCase = makeFindOrderAllUseCase(repository)
        expect(useCase).toBeInstanceOf(FindOrderAllUseCase)
        expect(typeof useCase.execute).toBe("function")
        expect(typeof useCase.onFinish).toBe("function")
    })
})
