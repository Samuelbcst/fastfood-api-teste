import { describe, it, expect } from "vitest"
import { Client } from "./client"

describe("Client", () => {
    it("should have id, name, email, cpf, createdAt, updatedAt", () => {
        const now = new Date()
        const client: Client = {
            id: 1,
            name: "John Doe",
            email: "john@example.com",
            cpf: "123.456.789-00",
            createdAt: now,
            updatedAt: now,
        }
        expect(client.id).toBe(1)
        expect(client.name).toBe("John Doe")
        expect(client.email).toBe("john@example.com")
        expect(client.cpf).toBe("123.456.789-00")
        expect(client.createdAt).toBe(now)
        expect(client.updatedAt).toBe(now)
    })
})
