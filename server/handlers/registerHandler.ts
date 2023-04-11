import { Request, Response } from 'express';
import { BasicAccountInfo, AccountModel, LogState, ResponseModel } from '../models';
import { hashString } from '../utility/crypto_utility';
import { checkIfAccountExists, createNewAccount } from '../repository';


export default async function registerHandler(req: Request, res: Response) {
    // Get all required account information
    const { first_name, last_name, date_of_birth, email, password } = req.body;

    // Check email
    if(await checkIfAccountExists(email)) {
        return res.status(400).json(
            new ResponseModel(
                'failed',
                'account with same email already exists'
            )
        )
    }

    // Process Information
    const acc_info: BasicAccountInfo = {
        first_name: first_name,
        last_name: last_name,
        date_of_birth: new Date(date_of_birth),
        email: email,
        hashed_password: await hashString(password)
    }

    const account = new AccountModel()
                        .setAccountInfo(acc_info)
                        .setLogState(new LogState())
    
    // Push information to database
    const result = createNewAccount(account);

    if (result) {
        return res.status(201).json(
            new ResponseModel(
                'success',
                'account registered successfully'
            ).setPayload(account)
        )
    }
    
    return res.status(400).json(
        new ResponseModel(
            'failed',
            'account registration failed'
        )
    )
}