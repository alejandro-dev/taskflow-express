import { Request, Response, NextFunction } from 'express';
import { body, validationResult } from 'express-validator';

export const validateCreateTask = [
   body('title')
      .escape().trim()
      .notEmpty().withMessage('Title is required'),

   body('assignedUserId')
      .trim().escape()
      .optional()
      .isMongoId().withMessage('Assigned User ID must be a valid MongoDB ObjectId'),
   
   body('dueDate')
      .optional()
      .isISO8601().withMessage('Due Date must be a valid date'),

   body('status')
      .optional()
      .isIn(['pending', 'in-progress', 'completed']).withMessage('Status must be one of: pending, in-progress, completed'),

   body('priority')
      .optional()
      .isIn(['low', 'medium', 'high']).withMessage('Priority must be one of: low, medium, high'),

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

      if(errors.isEmpty()) {
         return next();
      }
   } 
];