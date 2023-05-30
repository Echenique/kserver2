import "reflect-metadata"
import { config } from 'dotenv';
import express, { json } from 'express';
import routes from './routes';
import {connect} from 'mongoose';
import { createLogger, transports, format, Logger } from 'winston';
import cors from 'cors';
import http from 'http';
import path from "path";

let serverHttp;
config();

declare global {
    var log: Logger;
    var sleep: (seconds: number) => Promise<unknown>;
    var env: any
}

const tasks = {
    setup: () => new Promise<void>(async (resolve, reject) => {
        global.log = createLogger({
            transports: [new transports.Console()],
            format: format.combine(
                format.colorize(),
                format.timestamp(),
                format.printf(({ timestamp, level, message }) => {
                    return `[${timestamp}] ${level}: ${message}`;
                })
            ),
        });
        global.sleep = async (seconds: number) => new Promise(resolve => {
            setTimeout(resolve, (seconds*1000))
        })

        global.env = process.env;
        resolve();
    }),
    connectDB: () => new Promise<void>(async(resolve, reject) => {
        global.log.info('Connecting to DataBase...');
        try{
            await connect(`mongodb://${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`);
            global.log.info('MongoDB Connected!');
            resolve();
        }catch(e){
            reject(e);
        }
    }),
    setupHttpServer: () => new Promise<void>((resolve, reject) => {
        global.log.info('Setting up HTTP server...');
        
        let app = express();
        app
        .use(json())
        .use(cors())
        .use(express.static(path.join(__dirname, '../frontend/dist/frontend'), {dotfiles: 'allow'}))
        .use(routes);

        app.get('/', (req, res) => {
            res.sendFile(path.join(__dirname, '../frontend/dist/frontend', 'index.html'));
        });

        serverHttp = http.createServer(app);
      
        serverHttp.listen(process.env.SERVER_PORT, () => {
            global.log.info('Server HTTP running!');
            resolve();
        });
    })
}

tasks.setup()
.then(tasks.connectDB)
.then(tasks.setupHttpServer)
.catch(e => {
    global.log.error('Error', e)
});