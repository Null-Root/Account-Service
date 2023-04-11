import { Request, Response, NextFunction } from "express";
import { ResponseModel } from "../models";
import jwt from 'jsonwebtoken'
import { getAccountDetails } from "../repository";

export default async function auth_verify(req: Request, res: Response, next: NextFunction) {
    const token = req.body.token || req.query.token || req.params.token || req.headers["x-access-token"];

	// check for token passed
  	if (!token) return res.status(400).json(
        new ResponseModel(
		    'failed',
		    "A token is required for authentication"
        )
	);

	// decode token and check if token is valid
	try {
    	const decoded = jwt.verify(token, process.env.SECRET_TOKEN!);
    	req.body.__token_decoded = decoded;
		
		// check if email is logged with correct token
		const { email } = decoded as { email: string }
		const account_details = await getAccountDetails(email);
		const { log_state } = account_details;
		const { is_logged_in, user_token } = log_state!;

		if(is_logged_in === false || user_token !== token) {
			return res.status(403).json(
				new ResponseModel(
					'failed',
					"Invalid token (based on database)"
				)
			);
		}

  	} catch (err) {
    	return res.status(403).json(
            new ResponseModel(
			    'failed',
			    "Invalid token"
            )
		);
  	}
  	return next();
}