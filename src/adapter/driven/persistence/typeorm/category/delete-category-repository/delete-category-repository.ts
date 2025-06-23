import { Repository } from "typeorm"
import { Category } from "../../../../../../core/domain/category/category"
import { CategoryModel } from "../model"
import { DeleteCategoryRepository } from "../../../../../../core/application/port/category/delete-category-repository"

export class DeleteCategoryTypeORMRepository implements DeleteCategoryRepository {
    constructor(private readonly repository: Repository<CategoryModel>) {}

    async execute(param: { id: Category["id"] }): Promise<Category | null> {
        const { id } = param;
        const category = await this.repository.findOneBy({ id });
        if (!category) return null;
        await this.repository.remove(category);
        return category;
    }

    finish() {
        return this.repository.manager.connection.destroy()
    }
}
