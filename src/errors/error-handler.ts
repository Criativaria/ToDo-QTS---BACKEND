import { NextFunction, Request, Response } from "express";
import { WebError } from "./web-error";


export async function errorHandler(error: Error, request: Request, response: Response, next: NextFunction) {

    if (error instanceof WebError) {
        return response.status(error.statusCode).json({
            message: error.message
        })
    }

    console.error("internal error", error);
    return response.status(500).json({
        message: "erro interno!!! perdao ai galera, tropecei nos fios"
    })

}