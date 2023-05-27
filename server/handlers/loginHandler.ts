import { Request, Response } from 'express';
import { compareHash } from '../utility';
import { checkIfAccountExists, getAccountDetails, updateAccount } from '../repository';
import { LogState, ResponseModel } from '../models';
import jwt from 'jsonwebtoken';

export default async function loginHandler(req: Request, res: Response) {
    // Get all required account information
    const { email, password } = req.body;

    // Check if account exists
    if(!await checkIfAccountExists(email)) {
        return res.status(400).json(
            new ResponseModel(
                'failed',
                'account does not exist'
            )
        )
    }
    
    // Check if password matches
    let account_details = await getAccountDetails(email);

    // Check If Account Exists
    if (account_details == null) {
        return res.status(404).json(
            new ResponseModel(
                'failed',
                'account not found'
            )
        )
    }

    const { account_info } = account_details;

    if(!await compareHash(password, account_info?.hashed_password!)) {
        return res.status(400).json(
            new ResponseModel(
                'failed',
                'wrong password on email'
            )
        )
    }

    // Create a token containing, email, share_id
    const payload = {
        email: email,
        share_id: account_details.share_id
    }
    const user_token = jwt.sign(payload, process.env.SECRET_TOKEN as string, { expiresIn: '24h' });

    // Update Log State then push to database
    account_details.setLogState(
        new LogState()
            .setLogStatus(true)
            .setLoginDate(new Date())
            .setUserToken(user_token)
    )
    const result = await updateAccount(account_details);

    if (result) {
        return res.status(201).json(
            new ResponseModel(
                'success',
                'account logged in'
            ).setPayload(user_token)
        )
    }
    
    return res.status(400).json(
        new ResponseModel(
            'failed',
            'account failed to log in'
        )
    )
}