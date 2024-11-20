import { Request, Response, NextFunction } from 'express';
import User from '../models/User.model';
import bcrypt from 'bcryptjs';
import jwt from "jsonwebtoken";

// Register User
export const registerUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { username, email, password } = req.body;

    // Input validation
    if (!username || !email || !password) {
      res.status(400).json({ message: 'Please provide all required fields', data: null, error: true });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      res.status(409).json({ message: 'Email already in use', data: null, error: true });
    }

    const hashedPassword = await bcrypt.hash(password, 12);
    const newUser = new User({ username, email, password: hashedPassword });
    await newUser.save();

    const { password: excludedPassword, email: excludedEmail, ...userData } = newUser;
    res.status(201).json({ message: 'User created successfully', data: userData, error: false });
  } catch (error: any) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error', data: null, error: true });
  }
};

// Login User
export const loginUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      res.status(400).json({ message: 'Please provide email and password', data: null, error: true });
    }

    const user = await User.findOne({ email });
    if (!user) {
      res.status(401).json({ message: 'Invalid email or password', data: null, error: true });
    }

    const isValidPassword = await bcrypt.compare(password, user!.password);
    if (!isValidPassword) {
      res.status(401).json({ message: 'Invalid email or password', data: null, error: true });
    }

    // Generate JWT token and return response
    const token = jwt.sign({ userId: user?._id }, process.env.JWT_SECRET_KEY as string, { expiresIn: '1h' });
    res.status(200).json({ message: 'Logged in successfully', token, userData: { userId: user?._id } });
  } catch (error: any) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error', data: null, error: true });
  }
};






// import { Request, Response, NextFunction } from 'express';
// import User from '../models/User.model';
// import bcrypt from 'bcryptjs';
// import jwt from "jsonwebtoken";

// export const registerUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
//   try {
//     const { username, email, password } = req.body;

//     // Input validation
//     if (!username || !email || !password) {
//       res.status(400).json({
//         message: 'Please provide all required fields',
//         data: null,
//         error: true
//       });
//     }

//     const existingUser = await User.findOne({ email });
//     if (existingUser) {
//       res.status(409).json({
//         message: 'Email already in use',
//         data: null,
//         error: true
//       });
//     }
//     const hashedPassword = await bcrypt.hash(password, 12);
//     const newUser = new User({ username, email, password: hashedPassword });
//     await newUser.save();

//     const { password: excludedPassword, email: excludedEmail, ...userData } = newUser;

//     res.status(201).json({
//       message: 'User created successfully',
//       data: userData,
//       error: false
//     });
//   } catch (error: any) {
//     if (error.code === 11000) { 
//     res.status(409).json({
//         message: 'Email already in use',
//         data: null,
//         error: true
//       });
//     }
//     console.error(error);
//     res.status(500).json({
//       message: 'Internal Server Error',
//       data: null,
//       error: true
//     });
//   }
// };

// export const loginUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
//   try {
//     const { email, password } = req.body;

//     if (!email || !password) {
//       throw new Error("Please provide email and password")
//     }

//     const user = await User.findOne({ email });
//     if (!user) {
//       throw new Error("Invalid email or password")
//     }

//     const isValidPassword = await bcrypt.compare(password, user!.password);
//     if (!isValidPassword) {
//       throw new Error("Invalid email or password")
//     }
//     // Generate JWT token and return response
//     const token = jwt.sign({userId: user._id}, process.env.JWT_SECRET_KEY as string ,{expiresIn: '1h'})
//     console.log(token);

//     res.status(200).json({ message: 'Logged in successfully', token, userData: { userId: user._id }})
   
// }catch(error: any){
// res.status(500).json({message: "an error occur", data: null, error: true})
// }

// }

