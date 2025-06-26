import { describe, it, expect, vi, beforeEach } from "vitest"
import { FindClientByCpfUseCase } from "."
import type { FindClientByCpfRepository } from "../../../ports/client/find-client-by-cpf-repository"
import { CustomError } from "../../custom-error"

describe("FindClientByCpfUseCase", () => {
    let repository: FindClientByCpfRepository
    let useCase: FindClientByCpfUseCase
    const input = { cpf: "12345678900" }
    const client = { id: 1, name: "Test", email: "test@example.com", cpf: input.cpf, createdAt: new Date(), updatedAt: new Date() }

    beforeEach(() => {
        repository = {
            execute: vi.fn().mockResolvedValue(client),
            finish: vi.fn().mockResolvedValue(undefined),
        }
        useCase = new FindClientByCpfUseCase(repository)
    })

    it("should return success true and the client when found", async () => {
        const result = await useCase.execute(input)
        expect(result.success).toBe(true)
        expect(result.result).toEqual(client)
        expect(repository.execute).toHaveBeenCalledWith(input.cpf)
    })

    it("should return success false and CustomError when client not found", async () => {
        repository.execute = vi.fn().mockResolvedValue(null)
        useCase = new FindClientByCpfUseCase(repository)
        const result = await useCase.execute(input)
        expect(result.success).toBe(false)
        expect(result.result).toBeNull()
        expect(result.error).toBeInstanceOf(CustomError)
        expect(result.error?.message).toBe("Client not found.")
    })

    it("should return success false on repository error", async () => {
        repository.execute = vi.fn().mockRejectedValue(new Error("fail"))
        useCase = new FindClientByCpfUseCase(repository)
        const result = await useCase.execute(input)
        expect(result.success).toBe(false)
        expect(result.result).toBeNull()
    })

    it("should call finish on repository when onFinish is called", async () => {
        await useCase.onFinish()
        expect(repository.finish).toHaveBeenCalled()
    })
})
