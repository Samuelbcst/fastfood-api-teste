import { Request } from "express"
import { CategoryServices } from "../../../core/application/use-cases/category/category"
import { factoryDataSource } from "../../driven/persistence/typeorm"
import { CategoryModel } from "../../driven/persistence/typeorm/category/model"
import { CategoryTypeORMRepository } from "../../driven/persistence/typeorm/category/repository"

export const getCategoryById = async (params: Request["params"]) => {
    const id = Number(params.id)

    if (isNaN(id)) throw new Error("Id must be a number")

    const dataSource = factoryDataSource()

    const categoryRepository = dataSource.getRepository(CategoryModel)

    const categoryServices = new CategoryServices(
        new CategoryTypeORMRepository(categoryRepository)
    )

    return categoryServices.findById(id)
}
