import { Request, Response } from 'express';
import { getAccountDetails, deleteAccount } from '../repository';
import { ResponseModel } from '../models';

export default async function deleteAccountHandler(req: Request, res: Response) {
    // Get all required account information
    const { __token_decoded } = req.body;
    const { email } = __token_decoded as { email: string }
    
    // Check If Account Exists
    let account_details = getAccountDetails(email);
    if (account_details == null) {
        return res.status(404).json(
            new ResponseModel(
                'failed',
                'account not found'
            )
        )
    }
    
    // Delete Account
    const result = await deleteAccount(email);

    if (result) {
        return res.status(204).json(
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