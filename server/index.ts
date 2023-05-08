import dotenv from "dotenv";
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import express, { Request, Response } from 'express';
import cors from 'cors';
import { ResponseModel } from './models';

import {
	registerHandler,
    loginHandler,
    logoutHandler,
    updateAccountHandler,
    deleteAccountHandler,
    checkEmailHandler
} from './handlers';

import {
    auth_verify,
    is_valid_inputs
} from './middleware';

// Load Environment Variable
dotenv.config()

// Express.js
const app = express();
const port = process.env.API_PORT;

// Database (Mongoose)
mongoose.connect(process.env.MONGO_DB_URL!);

// CORS
app.use(cors());

// To Parse Body (Json)
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

const URL_PATH = "/account-service/v1";

// Routes
app.post(URL_PATH + '/register', async(req: Request, res: Response) => {
    if(!is_valid_inputs(
        'POST',
        [['first_name', 'string'],
        ['last_name', 'string'],
        ['date_of_birth', 'date'],
        ['email', 'string'],
        ['password', 'string']],
        req, res)) return;
	await registerHandler(req, res);
});

app.post(URL_PATH + '/login', async(req: Request, res: Response) => {
    if(!is_valid_inputs(
        'POST',
        [['email', 'string'],
        ['password', 'string']],
        req, res)) return;
    await loginHandler(req, res);
});

app.post(URL_PATH + '/logout', auth_verify, async(req: Request, res: Response) => {
    if(!is_valid_inputs(
        'POST',
        [['email', 'string']],
        req, res)) return;
    await logoutHandler(req, res);
});

app.put(URL_PATH + '/account', auth_verify, async(req: Request, res: Response) => {
    if(!is_valid_inputs(
        'POST',
        [['first_name', 'string'],
        ['last_name', 'string'],
        ['date_of_birth', 'date'],
        ['new_email', 'string'],
        ['password', 'string'],
        ['old_email', 'string']],
        req, res)) return;
	await updateAccountHandler(req, res);
});

app.delete(URL_PATH + '/account', auth_verify, async(req: Request, res: Response) => {
    await deleteAccountHandler(req, res);
});

app.get(URL_PATH + '/check-email', async(req: Request, res: Response) => {
    await checkEmailHandler(req, res);
});


// Non-Existent Routes
app.use("*", (req: any, res: any) => {
    res.status(404).json(
        new ResponseModel(
            'failed',
            'non-existent route'
        )
	);
});

// Listen
app.listen(port, () => {
    console.log(`Server listening on the port::${port}`);
});
