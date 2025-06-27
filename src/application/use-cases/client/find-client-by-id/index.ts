import { Client } from "../../../../domain/entities/client/client"
import { FindClientByIdRepository } from "../../../repositories/client/find-client-by-id-repository"
import { UseCase } from "../../base-use-case"
import { CustomError } from "../../custom-error"

interface Input {
    id: number
}

export class FindClientByIdUseCase implements UseCase<Input, Client> {
    constructor(
        private findClientByIdRepository: FindClientByIdRepository
    ) {}

    async execute(input: Input) {
        try {
            const client = await this.findClientByIdRepository.execute(
                input.id
            )

            if (!client) {
                return {
                    success: false,
                    result: null,
                    error: new CustomError(404, "Client not found."),
                }
            }

            return {
                success: client !== null,
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
        return this.findClientByIdRepository.finish()
    }
}
