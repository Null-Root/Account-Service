import { Request, Response } from 'express';
import { checkIfAccountExists, getAccountDetails, updateAccount } from '../repository';
import { LogState, ResponseModel } from '../models';

export default async function logoutHandler(req: Request, res: Response) {
    // Get all required account information
    const { email, token } = req.body;

    // Check if email exists
    if(!await checkIfAccountExists(email)) {
        return res.status(400).json(
            new ResponseModel(
                'failed',
                'account does not exist'
            )
        );
    }

    // Check if same token
    const account_details = await getAccountDetails(email);
    const { log_state } = account_details;

    if (log_state?.user_token !== token) {
        return res.status(400).json(
            new ResponseModel(
                'failed',
                'token mismatch'
            )
        );
    }

    // Logout the said email
    account_details.setLogState(
        new LogState()
            .setLogStatus(false)
            .setUserToken('')
    );
    const result = await updateAccount(account_details);

    if (result) {
        return res.status(201).json(
            new ResponseModel(
                'success',
                'account logged out'
            )
        );
    }
    
    return res.status(400).json(
        new ResponseModel(
            'failed',
            'account failed to log out'
        )
    )
}