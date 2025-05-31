import { runExpressEndpoint } from "../generic/run-express-endpoint"
import { Router } from "express"
import { getProductById } from "./get-by-id"
import { getProductAll } from "./get-all"
import { createProduct } from "./create"
import { updateProduct } from "./update"
import { deleteProduct } from "./delete"

const productRouter = Router()

/**
 * @openapi
 * tags:
 *   - name: product
 *     description: Operations about products
 */

/**
 * @openapi
 * /product:
 *   get:
 *     tags:
 *       - product
 *     summary: Get all products
 *     responses:
 *       200:
 *         description: A list of products.
 */
productRouter.get("/product", runExpressEndpoint(getProductAll, "get"))

/**
 * @openapi
 * /product/{id}:
 *   get:
 *     tags:
 *       - product
 *     summary: Get product by ID
 *     parameters:
 *        - name: id
 *          in: path
 *          required: true
 *          schema:
 *              type: number
 *     responses:
 *          200:
 *              description: A product.
 *          404:
 *              description: Product not found.
 */
productRouter.get("/product/:id", runExpressEndpoint(getProductById, "get"))

/**
 * @openapi
 * /product:
 *   post:
 *     tags:
 *       - product
 *     summary: Create a new product
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
 *               price:
 *                 type: number
 *                 required: true
 *               categoryId:
 *                 type: number
 *                 required: true
 *               active:
 *                 type: boolean
 *     responses:
 *       201:
 *         description: Product created.
 *       400:
 *         description: Invalid input.
 */
productRouter.post("/product", runExpressEndpoint(createProduct, "post"))

/**
 * @openapi
 * /product/{id}:
 *   put:
 *     tags:
 *       - product
 *     summary: Update an existing product
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
 *               price:
 *                 type: number
 *               categoryId:
 *                 type: number
 *               active:
 *                 type: boolean
 *     responses:
 *       200:
 *         description: Product updated.
 *       400:
 *         description: Invalid input.
 *       404:
 *         description: Product not found.
 */
productRouter.put("/product/:id", runExpressEndpoint(updateProduct, "put"))

/**
 * @openapi
 * /product/{id}:
 *   delete:
 *     tags:
 *       - product
 *     summary: Delete a product
 *     parameters:
 *        - name: id
 *          in: path
 *          required: true
 *          schema:
 *              type: number
 *     responses:
 *       204:
 *         description: Product deleted.
 *       404:
 *         description: Product not found.
 */
productRouter.delete("/product/:id", runExpressEndpoint(deleteProduct, "delete"))

export default productRouter
