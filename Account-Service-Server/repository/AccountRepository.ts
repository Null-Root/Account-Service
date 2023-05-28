import { AccountInfo, AccountModel, BasicAccountInfo, LogState } from '../models';
import mongoose from 'mongoose';


async function getAccountDetails(email: string) {
    // find email
    const account = await AccountInfo.findOne({ email: email });

    if (account == null) {
        return null;
    }

    const basicAccountInfo: BasicAccountInfo = {
        first_name: account?.first_name,
        last_name: account?.last_name,
        date_of_birth: account?.date_of_birth,
        email: account?.email,
        hashed_password: account?.hashed_password
    }

    const logState = new LogState()
                        .setLogStatus(account?.log_state?.is_logged_in!)
                        .setLoginDate(account?.log_state?.login_date!)
                        .setUserToken(account?.log_state?.user_token!)

    const accountModel = new AccountModel()
                            .setId(account?.id)
                            .setAccountInfo(basicAccountInfo)
                            .setLogState(logState)
    
                            return accountModel;
}

async function createNewAccount(account: AccountModel) {

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

        await newAccountInfo.save();
    }
    catch(ex) {
        return false;
    }
    
    return true;
}

async function updateAccount(account: AccountModel) {

    try {
        const { id, share_id, account_info, log_state } = account;
        const { first_name, last_name, date_of_birth, email, hashed_password } = account_info!;
        const { is_logged_in, login_date, user_token } = log_state!;

        const updateData = {
            first_name: first_name,
            last_name: last_name,
            date_of_birth: date_of_birth,
            email: email,
            hashed_password: hashed_password,
            share_id: share_id,
            log_state: {
                is_logged_in: is_logged_in,
                login_date: login_date,
                user_token: user_token
            }
        };

        await AccountInfo.findByIdAndUpdate(id, updateData);
    }
    catch(ex) {
        console.log(ex)
        return false;
    }
    
    return true;
}

async function deleteAccount(email: string) {
    try {
        await AccountInfo.deleteOne({ email: email });
    }
    catch(ex) {
        return false;
    }
    return true;
}

export {
    getAccountDetails,
    createNewAccount,
    updateAccount,
    deleteAccount
}