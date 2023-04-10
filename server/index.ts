require('dotenv').config();

import mongoose from 'mongoose';
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
import { is_valid_inputs } from './middleware';

const app = express();
const port = process.env.API_PORT;

// Database 
mongoose.connect(process.env.MONGO_DB_URL!);

app.use(bodyParser.urlencoded({
	extended: true
}));
app.use(express.json());

// Routes
app.post('/login/v1/register', async(req: Request, res: Response) => {
    if(!is_valid_inputs(
        'POST',
        [['first_name', 'string'],
        ['last_name', 'string'],
        ['date_of_birth', 'date'],
        ['email', 'string'],
        ['password', 'string']],
        req, res)) return;
	await registerHandler(req, res);
})

// Non-Existent Routes
app.use("*", (req: any, res: any) => {
    res.status(404).json(
        new ResponseModel(
            'failed',
            'non-existent routes'
        )
	);
});

// Listen
app.listen(port, () => {
    console.log(`Server listening on the port::${port}`);
});

function valid_inputs(arg0: string) {
    throw new Error('Function not implemented.');
}
