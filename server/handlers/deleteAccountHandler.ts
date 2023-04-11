import { Request, Response } from 'express';
import { checkIfAccountExists, deleteAccount } from '../repository';
import { ResponseModel } from '../models';

export default async function deleteAccountHandler(req: Request, res: Response) {
    // Get all required account information
    const { __token_decoded } = req.body;
    const { email } = __token_decoded as { email: string }
    
    // Check if account exists
    if(!await checkIfAccountExists(email)) {
        return res.status(400).json(
            new ResponseModel(
                'failed',
                'account does not exist'
            )
        )
    }
    
    // Delete Account
    const result = await deleteAccount(email);

    if (result) {
        return res.status(201).json(
            new ResponseModel(
                'success',
                'account deleted successfully'
            )
        )
    }
    
    return res.status(400).json(
        new ResponseModel(
            'failed',
            'account deletion failed'
        )
    )
}