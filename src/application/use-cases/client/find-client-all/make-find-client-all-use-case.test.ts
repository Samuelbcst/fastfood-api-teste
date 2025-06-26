import { describe, it, expect } from "vitest"
import { makeFindClientAllUseCase } from "./make-find-client-all-use-case"
import { FindClientAllUseCase } from "./index"

describe("makeFindClientAllUseCase", () => {
    it("should return an instance of FindClientAllUseCase with the provided repository", () => {
        const repository = {
            execute: async () => [],
            finish: async () => {},
        }
        const useCase = makeFindClientAllUseCase(repository)
        expect(useCase).toBeInstanceOf(FindClientAllUseCase)
        expect(typeof useCase.execute).toBe("function")
        expect(typeof useCase.onFinish).toBe("function")
    })
})
