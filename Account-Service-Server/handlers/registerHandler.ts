import { Request, Response } from 'express';
import { BasicAccountInfo, AccountModel, LogState, ResponseModel } from '../models';
import { hashString } from '../utility';
import { getAccountDetails, createNewAccount } from '../repository';


export default async function registerHandler(req: Request, res: Response) {
    // Get all required account information
    const { first_name, last_name, date_of_birth, email, password } = req.body;

    // Check email
    let account_details = await getAccountDetails(email);
    if (account_details != null) {
        return res.status(400).json(
            new ResponseModel(
                'failed',
                'Account With Same Email Already Exists'
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
    const result = await createNewAccount(account);

    if (result) {
        return res.status(201).json(
            new ResponseModel(
                'success',
                'Account Registered Successfully'
            ).setPayload(account)
        )
    }
    
    return res.status(400).json(
        new ResponseModel(
            'failed',
            'Account Registration Failed'
        )
    )
}