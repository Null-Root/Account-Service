import mongoose, { Schema } from "mongoose";

const AccountSchema = new Schema({
    first_name: String,
    last_name: String,
    date_of_birth: Date,
    email: String,
    hashed_password: String,
    log_state: {
        is_logged_in: String,
        login_date: Date,
        user_token: String
    }
});

const AccountInfo = mongoose.model('Account', AccountSchema, "account_info");

export { AccountInfo };