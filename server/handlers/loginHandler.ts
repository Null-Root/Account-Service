import { Request, Response } from 'express';
import { compareHash } from '../utility/crypto_utility';

export default function loginHandler(req: Request, res: Response) {
    // Get all required account information
    // Check if email exists
    // Check if password matches
    // Create a token + LogState
}