import { describe, it, expect } from "vitest"
import { makeFindOrderByClientUseCase } from "./make-find-order-by-client-use-case"
import { FindOrderByClientUseCase } from "./index"

describe("makeFindOrderByClientUseCase", () => {
    it("should return an instance of FindOrderByClientUseCase with the provided repository", () => {
        const repository = {
            execute: async () => [],
            finish: async () => {},
        }
        const useCase = makeFindOrderByClientUseCase(repository)
        expect(useCase).toBeInstanceOf(FindOrderByClientUseCase)
        expect(typeof useCase.execute).toBe("function")
        expect(typeof useCase.onFinish).toBe("function")
    })
})
