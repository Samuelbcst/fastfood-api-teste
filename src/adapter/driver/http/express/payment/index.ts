import { runExpressEndpoint } from "../generic/run-express-endpoint"
import { Router } from "express"
import { getPaymentById } from "./get-by-id"
import { getPaymentAll } from "./get-all"
import { createPayment } from "./create"
import { updatePayment } from "./update"
import { deletePayment } from "./delete"

const paymentRouter = Router()

/**
 * @openapi
 * tags:
 *   - name: payment
 *     description: Operations about payments
 */

/**
 * @openapi
 * /payment:
 *   get:
 *     tags:
 *       - payment
 *     summary: Get all payments
 *     responses:
 *       200:
 *         description: A list of payments.
 */
paymentRouter.get("/payment", runExpressEndpoint(getPaymentAll, "get"))

/**
 * @openapi
 * /payment/{id}:
 *   get:
 *     tags:
 *       - payment
 *     summary: Get payment by ID
 *     parameters:
 *        - name: id
 *          in: path
 *          required: true
 *          schema:
 *              type: number
 *     responses:
 *          200:
 *              description: A payment.
 *          404:
 *              description: Payment not found.
 */
paymentRouter.get("/payment/:id", runExpressEndpoint(getPaymentById, "get"))

/**
 * @openapi
 * /payment:
 *   post:
 *     tags:
 *       - payment
 *     summary: Create a new payment
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               amount:
 *                 type: number
 *                 required: true
 *               orderId:
 *                 type: number
 *                 required: true
 *               method:
 *                 type: string
 *                 required: true
 *               paymentStatus:
 *                 type: string
 *                 enum: [PAID, NOT_PAID]
 *                 required: true
 *     responses:
 *       201:
 *         description: Payment created.
 *       400:
 *         description: Invalid input.
 */
paymentRouter.post("/payment", runExpressEndpoint(createPayment, "post"))

/**
 * @openapi
 * /payment/{id}:
 *   put:
 *     tags:
 *       - payment
 *     summary: Update an existing payment
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
 *               amount:
 *                 type: number
 *               method:
 *                 type: string
 *               paymentStatus:
 *                 type: string
 *                 enum: [PAID, NOT_PAID]
 *     responses:
 *       200:
 *         description: Payment updated.
 *       400:
 *         description: Invalid input.
 *       404:
 *         description: Payment not found.
 */
paymentRouter.put("/payment/:id", runExpressEndpoint(updatePayment, "put"))

/**
 * @openapi
 * /payment/{id}:
 *   delete:
 *     tags:
 *       - payment
 *     summary: Delete a payment
 *     parameters:
 *        - name: id
 *          in: path
 *          required: true
 *          schema:
 *              type: number
 *     responses:
 *       204:
 *         description: Payment deleted.
 *       404:
 *         description: Payment not found.
 */
paymentRouter.delete("/payment/:id", runExpressEndpoint(deletePayment, "delete"))

export default paymentRouter
