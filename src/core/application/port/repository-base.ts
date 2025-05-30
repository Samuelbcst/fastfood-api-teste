import { BaseEntity } from "../../domain/base-entity"

export interface RepositoryBase<
    Input extends unknown | undefined,
    Output extends BaseEntity | BaseEntity[] | null,
> {
    execute(param: Input): Promise<Output>
    finish(): Promise<void>
}
