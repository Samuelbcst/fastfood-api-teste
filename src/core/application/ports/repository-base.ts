import { BaseEntity } from "../../domain/base-entity"

export interface RepositoryBase<T extends BaseEntity> {
    findById(id: number): Promise<T | null>
    findFirst(props: Partial<T>): Promise<T | null>
    findAll(props: Partial<T>): Promise<T[]>
    insertAndSave(entity: T): Promise<T>
    patch(entity: T): Promise<T>
    removeById(id: number): Promise<void>
}
