import { Request, Response, NextFunction } from "express";
import { ResponseModel } from "../models";
import jwt from 'jsonwebtoken'

export default async function auth_verify(req: Request, res: Response, next: NextFunction) {
    const token = req.body.token || req.query.token || req.params.token || req.headers["x-access-token"];

  	if (!token) return res.status(400).json(
        new ResponseModel(
		    'failed',
		    "A token is required for authentication"
        )
	);

	try {
    	const decoded = jwt.verify(token, process.env.TOKEN_SECRET!);
    	req.body.user = decoded;

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