import { Request, Response, NextFunction } from 'express';
import { body, validationResult } from 'express-validator';

export const validateLogin = [
   body('email')
      .escape().trim()
      .isEmail().withMessage('Email is not valid'),
   body('password')
      .trim().escape()
      .isLength({ min: 6 }).withMessage('Password must be at least 6 characters')
      .notEmpty().withMessage('Password is required'),

   (req: Request, res: Response, next: NextFunction) => {
      // Validate the request
      const errors = validationResult(req);

      // If there are validation errors
      if(!errors.isEmpty()) {
         // Extract error messages
         const formattedErrors = errors.array().map(err => ({
            message: err.msg
         }));
         res.status(400).json({ status: 'fail', message: 'Validation failed', errors: formattedErrors });
      }

      return next();
   } 
];