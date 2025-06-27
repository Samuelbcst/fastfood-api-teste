import { Client } from "../../../../domain/entities/client/client"
import { FindClientByCpfRepository } from "../../../repositories/client/find-client-by-cpf-repository"
import { UseCase } from "../../base-use-case"
import { CustomError } from "../../custom-error"

interface Input {
    cpf: string
}

export class FindClientByCpfUseCase implements UseCase<Input, Client | null> {
    constructor(
        private findClientByCpfRepository: FindClientByCpfRepository
    ) {}

    async execute(input: Input) {
        try {
            const client = await this.findClientByCpfRepository.execute(
                input.cpf
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
        return this.findClientByCpfRepository.finish()
    }
}

