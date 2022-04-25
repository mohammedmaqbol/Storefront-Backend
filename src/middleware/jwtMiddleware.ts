import { Request } from 'express';
import { verify, JwtPayload } from 'jsonwebtoken';

export default function Authorize(req: Request, user_id: string | null = null) {
  const authorization = req.headers.authorization;
  const token = authorization?.split(' ')[1];
  const decoded = verify(
    token as string,
    process.env.TOKEN_SECRET as string
  ) as JwtPayload;
  if (user_id && decoded.user.id !== user_id) {
    throw new Error('User Id Does Not Match');
  }
}
