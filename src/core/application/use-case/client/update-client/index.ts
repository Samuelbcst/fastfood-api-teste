import { Client } from "../../../../domain/client"
import { UpdateClientRepository } from "../../../port/client/update-client-repository"
import { UseCase } from "../../base-use-case"
import { CustomError } from "../../custom-error"

interface Input {
    id: number
    name?: string
    email?: string
    cpf?: string
}

export class UpdateClientUseCase implements UseCase<Input, Client> {
    constructor(
        private updateClientRepository: UpdateClientRepository
    ) {}

    async execute(input: Input) {
        try {
            const client = await this.updateClientRepository.execute(input)

            if (!client) {
                return {
                    success: false,
                    result: null,
                    error: new CustomError(404, "Client not found."),
                }
            }

            return {
                success: true,
                result: client,
            }
        } catch (error) {
            return {
                success: false,
                result: null,
            }
        }
    }

    onFinish(): Promise<void> {
        return this.updateClientRepository.finish()
    }
}
