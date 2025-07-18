import { describe, it, expect, vi, beforeEach } from "vitest"
import { DeleteClientUseCase } from "."
import type { DeleteClientRepository } from "../../../port/client/delete-client-repository"
import { CustomError } from "../../custom-error"

describe("DeleteClientUseCase", () => {
    let repository: DeleteClientRepository
    let useCase: DeleteClientUseCase
    const input = { id: 1 }
    const client = { id: 1, name: "Test", email: "test@example.com", cpf: "12345678900", createdAt: new Date(), updatedAt: new Date() }

    beforeEach(() => {
        repository = {
            execute: vi.fn().mockResolvedValue(client),
            finish: vi.fn().mockResolvedValue(undefined),
        }
        useCase = new DeleteClientUseCase(repository)
    })

    it("should return success true and the deleted client when found", async () => {
        const result = await useCase.execute(input)
        expect(result.success).toBe(true)
        expect(result.result).toEqual(client)
        expect(repository.execute).toHaveBeenCalledWith(input)
    })

    it("should return success false and CustomError when client not found", async () => {
        repository.execute = vi.fn().mockResolvedValue(null)
        useCase = new DeleteClientUseCase(repository)
        const result = await useCase.execute(input)
        expect(result.success).toBe(false)
        expect(result.result).toBeNull()
        expect(result.error).toBeInstanceOf(CustomError)
        expect(result.error?.message).toBe("Client not found.")
    })

    it("should return success false on repository error", async () => {
        repository.execute = vi.fn().mockRejectedValue(new Error("fail"))
        useCase = new DeleteClientUseCase(repository)
        const result = await useCase.execute(input)
        expect(result.success).toBe(false)
        expect(result.result).toBeNull()
    })

    it("should call finish on repository when onFinish is called", async () => {
        await useCase.onFinish()
        expect(repository.finish).toHaveBeenCalled()
    })
})
