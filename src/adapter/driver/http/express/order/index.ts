import { runExpressEndpoint } from "../generic/run-express-endpoint"
import { Router } from "express"
import { getOrderById } from "./get-by-id"
import { getOrderAll } from "./get-all"
import { createOrder } from "./create"
import { updateOrder } from "./update"
import { deleteOrder } from "./delete"

const orderRouter = Router()

/**
 * @openapi
 * tags:
 *   - name: order
 *     description: Operations about orders
 */

/**
 * @openapi
 * /order:
 *   get:
 *     tags:
 *       - order
 *     summary: Get all orders
 *     responses:
 *       200:
 *         description: A list of orders.
 */
orderRouter.get("/order", runExpressEndpoint(getOrderAll, "get"))

/**
 * @openapi
 * /order/{id}:
 *   get:
 *     tags:
 *       - order
 *     summary: Get order by ID
 *     parameters:
 *        - name: id
 *          in: path
 *          required: true
 *          schema:
 *              type: number
 *     responses:
 *          200:
 *              description: An order.
 *          404:
 *              description: Order not found.
 */
orderRouter.get("/order/:id", runExpressEndpoint(getOrderById, "get"))

/**
 * @openapi
 * /order:
 *   post:
 *     tags:
 *       - order
 *     summary: Create a new order
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               clientId:
 *                 type: number
 *                 required: true
 *               items:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     productId:
 *                       type: number
 *                     quantity:
 *                       type: number
 *                   required:
 *                     - productId
 *                     - quantity
 *     responses:
 *       201:
 *         description: Order created.
 *       400:
 *         description: Invalid input.
 */
orderRouter.post("/order", runExpressEndpoint(createOrder, "post"))

/**
 * @openapi
 * /order/{id}:
 *   put:
 *     tags:
 *       - order
 *     summary: Update an existing order
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
 *               clientId:
 *                 type: number
 *               items:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     productId:
 *                       type: number
 *                     quantity:
 *                       type: number
 *                   required:
 *                     - productId
 *                     - quantity
 *     responses:
 *       200:
 *         description: Order updated.
 *       400:
 *         description: Invalid input.
 *       404:
 *         description: Order not found.
 */
orderRouter.put("/order/:id", runExpressEndpoint(updateOrder, "put"))

/**
 * @openapi
 * /order/{id}:
 *   delete:
 *     tags:
 *       - order
 *     summary: Delete an order
 *     parameters:
 *        - name: id
 *          in: path
 *          required: true
 *          schema:
 *              type: number
 *     responses:
 *       204:
 *         description: Order deleted.
 *       404:
 *         description: Order not found.
 */
orderRouter.delete("/order/:id", runExpressEndpoint(deleteOrder, "delete"))

export default orderRouter
