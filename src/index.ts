import 'express-async-errors'
import express from "express"
import { appRoutes } from './routes';
import cookieParser from 'cookie-parser'
import cors from 'cors'
import { errorHandler } from './errors/error-handler';

const server = express();
server.use(cors({ origin: process.env.LINK_FRONT, credentials: true }))
server.use(cookieParser())
server.use(express.json())
server.use(appRoutes)
server.use(errorHandler)
server.listen(process.env.PORT, () => (
    console.log("💥 servidor ligado na porta 5555 💥")
)) 