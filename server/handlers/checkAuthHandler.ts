import { Request, Response } from 'express';
import jwt from 'jsonwebtoken'
import { ResponseModel } from '../models';
import { getAccountDetails } from '../repository';

export default async function checkAuthHandler(req: Request, res: Response) {
    // Get all required account information
    let { token } = req.query;
    token = token as string;

    try {
        // Decode token
        const decoded = jwt.verify(token, process.env.SECRET_TOKEN!);
        const { email } = decoded as { email: string }

        // Check if account in database is set to logged in
        // Check if token match from what is stored in database
        const account_details = await getAccountDetails(email);
        const { is_logged_in, user_token } = account_details.log_state!;

        if (is_logged_in === false || user_token !== token) {
            return res.status(400).json(
                new ResponseModel(
                    'failed',
                    "Invalid token (based on database)"
                )
            );
        }
    }
    catch (err) {
        return res.status(400).json(
            new ResponseModel(
                'failed',
                "Invalid token"
            )
        );
    }

    return res.status(200).json(
        new ResponseModel(
            'success',
            "Auth Data is Valid"
        )
    );
}