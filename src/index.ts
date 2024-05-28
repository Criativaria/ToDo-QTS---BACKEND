import 'express-async-errors'
import express from "express"
import { appRoutes } from './routes';
import { errorHandler } from './errors/error-handler';

const server = express();

server.use(express.json())
server.use(appRoutes)
server.use(errorHandler)
server.listen(process.env.PORT, () => (
    console.log("💥 servidor ligado na porta 5555 💥")
)) 