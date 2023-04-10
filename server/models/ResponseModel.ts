class ResponseModel {
    status: string;
    description: string
    payload: AccountModel | {} = {}
    
    constructor(_status: string, _description: string) {
        this.status = _status;
        this.description = _description;
    }

    setPayload(value: AccountModel) {
        this.payload = value;
        return this;
    }
}

interface BasicAccountInfo {
    first_name?: string;
    last_name?: string;
    date_of_birth?: Date;
    email?: string;
    hashed_password?: string;
}

class AccountModel {
    id?: string

    // Required Info at Registration
    account_info?: BasicAccountInfo

    // Account Logging
    log_state?: LogState

    constructor() {}
    
    setId(value: string) {
        this.id = value;
        return this;
    }

    setAccountInfo(value: BasicAccountInfo) {
        this.account_info = value;
        return this;
    }

    setLogState(value: LogState) {
        this.log_state = value;
        return this;
    }
}

class LogState {
    is_logged_in?: boolean = true;
    login_date?: Date = new Date()
    user_token?: string = '';
    refresh_token?: string = '';

    constructor() {}

    setLogStatus(value: boolean) {
        this.is_logged_in = value;
        return this;
    }

    setLoginDate(value: Date) {
        this.login_date = value;
        return this;
    }

    setUserToken(value: string) {
        this.user_token = value;
        return this;
    }

    setRefreshToken(value: string) {
        this.refresh_token = value;
        return this;
    }
}

export {
    ResponseModel, BasicAccountInfo, AccountModel, LogState
}