require('dotenv').config();

import bodyParser from 'body-parser';
import express, { Request, Response } from 'express';
import { ResponseModel, RoleType } from './models';

import {
	registerHandler,
    loginHandler,
    logoutHandler,
	getLogStateHandler,
    updateAccountHandler,
    deleteAccountHandler
} from './handlers';

const app = express();
const port = process.env.API_PORT;

app.use(bodyParser.urlencoded({
	extended: true
}));
app.use(express.json());

// Routes
app.post('/login/v1/register', async(req: Request, res: Response) => {
	await registerHandler(req, res);
})

// Non-Existent Routes
app.use("*", (req: any, res: any) => {
    res.status(404).json(
	);
});

// Listen
app.listen(port, () => {
    console.log(`Server listening on the port::${port}`);
});