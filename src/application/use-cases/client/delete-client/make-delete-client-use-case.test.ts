import { describe, it, expect } from "vitest"
import { makeDeleteClientUseCase } from "./make-delete-client-use-case"
import { DeleteClientUseCase } from "./index"

describe("makeDeleteClientUseCase", () => {
    it("should return an instance of DeleteClientUseCase with the provided repository", () => {
        const repository = {
            execute: async () => ({} as any),
            finish: async () => {},
        }
        const useCase = makeDeleteClientUseCase(repository)
        expect(useCase).toBeInstanceOf(DeleteClientUseCase)
        expect(typeof useCase.execute).toBe("function")
        expect(typeof useCase.onFinish).toBe("function")
    })
})
