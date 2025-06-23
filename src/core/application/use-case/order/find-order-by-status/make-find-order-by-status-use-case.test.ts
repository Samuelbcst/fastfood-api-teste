import { describe, it, expect } from "vitest"
import { makeFindOrderByStatusUseCase } from "./make-find-order-by-status-use-case"
import { FindOrderByStatusUseCase } from "./index"

describe("makeFindOrderByStatusUseCase", () => {
    it("should return an instance of FindOrderByStatusUseCase with the provided repository", () => {
        const repository = {
            execute: async () => [],
            finish: async () => {},
        }
        const useCase = makeFindOrderByStatusUseCase(repository)
        expect(useCase).toBeInstanceOf(FindOrderByStatusUseCase)
        expect(typeof useCase.execute).toBe("function")
        expect(typeof useCase.onFinish).toBe("function")
    })
})
