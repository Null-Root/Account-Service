import { Request, Response } from 'express';
import { ResponseModel } from '../models';
import { getAccountDetails } from '../repository';

export default async function checkEmailHandler(req: Request, res: Response) {
    // Get all required account information
    const { email } = req.body;

    // Check if account exists
    const result = await getAccountDetails(email as string);
    if(result == null) {
        return res.status(404).json(
            new ResponseModel(
                'failed',
                'account not found'
            )
        );
    }

    return res.status(200).json(
        new ResponseModel(
            'failed',
            'email is invalid'
        )
    );
}