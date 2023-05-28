import { Request, Response } from 'express';
import { getAccountDetails, updateAccount } from '../repository';
import { hashString } from '../utility';
import { BasicAccountInfo, ResponseModel } from '../models';

export default async function updateAccountHandler(req: Request, res: Response) {
    // Get all required account information
    const { first_name, last_name, date_of_birth, password, __token_decoded } = req.body;
    const { email } = __token_decoded as { email: string }

    // Get Account Details
    const account_details = await getAccountDetails(email);

    // Check If Account Exists
    if (account_details == null) {
        return res.status(404).json(
            new ResponseModel(
                'failed',
                'Account Not Found'
            )
        )
    }

    // If password is empty string, skip password
    let new_hashed_password = account_details.account_info?.hashed_password;
    if (password.trim() !== '') {
        new_hashed_password = await hashString(password);
    }

    // Update Account Info
    const updated_acc_info: BasicAccountInfo = {
        first_name: first_name,
        last_name: last_name,
        date_of_birth: new Date(date_of_birth),
        email: email,
        hashed_password: new_hashed_password
    };

    account_details.setAccountInfo(updated_acc_info);

    // Push changes to database
    const result = await updateAccount(account_details);

    if (result) {
        return res.status(201).json(
            new ResponseModel(
                'success',
                'Account Info Updated'
            )
        )
    }
    
    return res.status(400).json(
        new ResponseModel(
            'failed',
            'Account Failed To Update Information'
        )
    )
}