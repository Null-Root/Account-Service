import { AccountInfo, AccountModel, LogState } from '../models';
import mongoose from 'mongoose';

async function checkIfAccountExists(email: string) {
    // check if an email exists in the database
    const accountWithSameEmail = await AccountInfo.findOne({ email: email });

    if (accountWithSameEmail) return true;
    else return false;
}

function createNewAccount(account: AccountModel) {

    try {
        const { account_info, log_state } = account;
        const { first_name, last_name, date_of_birth, email, hashed_password } = account_info!;
        const { is_logged_in, login_date, user_token } = log_state!;

        const newAccountInfo = new AccountInfo({
            first_name: first_name,
            last_name: last_name,
            date_of_birth: date_of_birth,
            email: email,
            hashed_password: hashed_password,
            share_id: new mongoose.mongo.ObjectId(),
            log_state: {
                is_logged_in: is_logged_in,
                login_date: login_date,
                user_token: user_token
            }
        })

        newAccountInfo.save();
    }
    catch(ex) {
        return false;
    }
    
    return true;
}


export {
    checkIfAccountExists,
    createNewAccount
}