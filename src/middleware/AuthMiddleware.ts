// import { Request, Response, NextFunction } from 'express';
// import jwt from 'jsonwebtoken';

// interface AuthRequest extends Request {
//   user?: string;
// }

// const JWT_SECRET = process.env.JWT_SECRET || 'your_secret_key';

// const authMiddleware = (req: AuthRequest, res: Response, next: NextFunction) => {
//   const token = req.header('Authorization')?.split(' ')[1];
//   if (!token) {
//     return next(new Error('No token, authorization denied')); 
//   }
//   try {
//     const decoded = jwt.verify(token, JWT_SECRET) as { userId: string };
//     req.user = decoded.userId;
//     next(); 
//   } catch (error) {
//     return next(new Error('Token is not valid')); 
//   }
// };

// export default authMiddleware;