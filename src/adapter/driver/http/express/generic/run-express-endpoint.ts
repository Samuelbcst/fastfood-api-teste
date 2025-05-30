import { Request, Response } from "express"
import { UseCaseResult } from "../../../../../core/application/use-case/use-case-result"

type ExectuableEndpoint = (
    params: Request["params"],
    body: Request["body"]
) => Promise<UseCaseResult<unknown | null>>

export const runExpressEndpoint = (
    fn: ExectuableEndpoint,
    method: "get" | "post" | "put" | "delete" = "get"
) => {
    return async (req: Request, res: Response) => {
        try {
            const { success, result, error } = await fn
            (
                req.params,
                req.body
            )
            res.status(figureStatusCode(success, method, error)).json(result)
            return
        } catch (error: unknown) {
            console.error(error)
            res.status(500).json({
                message:
                    (error as Error | undefined)?.message ||
                    "Internal Server Error",
            })
            return
        }
    }
}

const figureStatusCode = (
    success: UseCaseResult["success"],
    method: "get" | "post" | "put" | "delete" = "get",
    error?: UseCaseResult["error"]
): number => {
    switch (method) {
        case "post":
            return success ? 201 : error?.code || 500
        case "get":
        case "put":
        case "delete":
        default:
            return success ? 200 : error?.code || 500
    }
}
