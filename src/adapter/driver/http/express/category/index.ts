import { runExpressEndpoint } from "../generic/run-express-endpoint"
import { Router } from "express"
import { getCategoryById } from "./get-by-id"
import { getCategoryAll } from "./get-all"
import { createCategory } from "./create"
import { updateCategory } from "./update"
import { deleteCategory } from "./delete"

const categoryRouter = Router()

/**
 * @openapi
 * tags:
 *   - name: category
 *     description: Operations about categories
 */

/**
 * @openapi
 * /category:
 *   get:
 *     tags:
 *       - category
 *     summary: Get all categories
 *     responses:
 *       200:
 *         description: A list of categories.
 */
categoryRouter.get("/category", runExpressEndpoint(getCategoryAll, "get"))

/**
 * @openapi
 * /category/{id}:
 *   get:
 *     tags:
 *       - category
 *     summary: Get category by ID
 *     parameters:
 *        - name: id
 *          in: path
 *          required: true
 *          schema:
 *              type: number
 *     responses:
 *          200:
 *              description: A category.
 *          404:
 *              description: Category not found.
 */
categoryRouter.get("/category/:id", runExpressEndpoint(getCategoryById, "get"))

/**
 * @openapi
 * /category:
 *   post:
 *     tags:
 *       - category
 *     summary: Create a new category
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 required: true
 *               description:
 *                 type: string
 *     responses:
 *       201:
 *         description: Category created.
 *       400:
 *         description: Invalid input.
 */
categoryRouter.post("/category", runExpressEndpoint(createCategory, "post"))

/**
 * @openapi
 * /category/{id}:
 *   put:
 *     tags:
 *       - category
 *     summary: Update an existing category
 *     parameters:
 *        - name: id
 *          in: path
 *          required: true
 *          schema:
 *              type: number
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *     responses:
 *       200:
 *         description: Category updated.
 *       400:
 *         description: Invalid input.
 *       404:
 *         description: Category not found.
 */
categoryRouter.put("/category/:id", runExpressEndpoint(updateCategory, "put"))

/**
 * @openapi
 * /category/{id}:
 *   delete:
 *     tags:
 *       - category
 *     summary: Delete a category
 *     parameters:
 *        - name: id
 *          in: path
 *          required: true
 *          schema:
 *              type: number
 *     responses:
 *       204:
 *         description: Category deleted.
 *       404:
 *         description: Category not found.
 */
categoryRouter.delete("/category/:id", runExpressEndpoint(deleteCategory, "delete"))

export default categoryRouter
