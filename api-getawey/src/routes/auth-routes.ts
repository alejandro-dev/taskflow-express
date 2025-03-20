import express from "express";
import AuthController from "../controllers/auth-controller";
import { validateLogin } from "../validators/auth/loginValidator";
import { validateRegister } from "../validators/auth/registerValidator";

const router = express.Router();

/**
 * @route POST /auth/register
 * @group Auth
 * @description Register a new user
 * @param {string} username.params - Name
 * @param {string} email.params - Email
 * @param {string} password.params - Password
 * @param {string} confirm_password.params - Confirm password
 * @middleware validateRegister - Validate the request data
 * @returns {object} 200 - User created successfully
 * @returns {Error} 400 - Bad Request. The data is invalid
 * @returns {Error} 409 - Conflict. The username o email is already registered
 * @returns {Error} 500 - Error while registering the user
 */
router.post('/register', validateRegister, AuthController.register); 

/**
 * @route POST /auth/login
 * @group Auth
 * @description Login a user
 * @param {string} email.params - Email
 * @param {string} password.params - Password
 * @middleware validateLogin - Validate the request data
 * @returns {object} 200 - User logged in successfully
 * @returns {Error} 400 - Bad Request. The data is invalid
 * @returns {Error} 401 - Unauthorized
 * @returns {Error} 404 - Not Found. The user is not found
 * @returns {Error} 500 - Error while registering the user
 */
router.post('/login', validateLogin, AuthController.login);

export default router;