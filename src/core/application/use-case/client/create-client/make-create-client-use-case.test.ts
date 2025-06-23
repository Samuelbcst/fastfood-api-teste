import { describe, it, expect } from "vitest"
import { makeCreateClientUseCase } from "./make-create-client-use-case"
import { CreateClientUseCase } from "./index"

describe("makeCreateClientUseCase", () => {
    it("should return an instance of CreateClientUseCase with the provided repository", () => {
        const repository = {
            create: async () => ({} as any),
            finish: async () => {},
        }
        const useCase = makeCreateClientUseCase(repository)
        expect(useCase).toBeInstanceOf(CreateClientUseCase)
        expect(typeof useCase.execute).toBe("function")
        expect(typeof useCase.onFinish).toBe("function")
    })
})
