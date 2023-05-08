import { Request, Response } from 'express';
import { checkIfAccountExists } from '../repository';
import { ResponseModel } from '../models';

export default async function checkEmailHandler(req: Request, res: Response) {
    // Get all required account information
    const { email } = req.query;

    // Check if account exists
    const result = await checkIfAccountExists(email as string);
    if(result) {
        return res.status(201).json(
            new ResponseModel(
                'success',
                'email is valid'
            )
        );
    }

    return res.status(201).json(
        new ResponseModel(
            'failed',
            'email is invalid'
        )
    );
}