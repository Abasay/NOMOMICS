import axios from 'axios';
// import { NextApiRequest, NextApiResponse } from 'next';
import { NextFunction, Request, Response } from 'express';

export default async function googleAuthHandler(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { code } = req.body;

  if (!code) {
    return res.status(400).json({ message: 'Authorization code is required' });
  }

  try {
    const tokenResponse = await axios.post(
      'https://oauth2.googleapis.com/token',
      {
        code,
        client_id: process.env.GOOGLE_CLIENT_ID,
        client_secret: process.env.GOOGLE_CLIENT_SECRET,
        redirect_uri: process.env.GOOGLE_REDIRECT_URI,
        grant_type: 'authorization_code',
      }
    );

    const tokens = tokenResponse.data; // Includes `access_token`, `id_token`, etc.
    console.log('Token Response:', tokens);

    // Optionally verify the ID token here if needed.
    req.body = { ...req.body, tokens, idToken: tokens.id_token };
    next();
  } catch (error) {
    console.error(
      'Error exchanging code for tokens:',
      error.response?.data || error
    );
    res
      .status(500)
      .json({ message: 'Failed to exchange authorization code for tokens' });
  }
}
