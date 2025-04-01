import express from "express";
import { validateLogin } from "../validators/auth/loginValidator";
import { validateRegister } from "../validators/auth/registerValidator";
import { AuthController } from "../controllers/auth-controller";
import { AuthService } from "../services/auth-service";
import { LogsService } from "../services/logs-service";

const router = express.Router();

// Instance of the services
const authService = new AuthService();
const logsService = new LogsService();

// Create controller instance
const authController = new AuthController(authService, logsService);

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
router.post('/register', validateRegister, authController.register); 

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
router.post('/login', validateLogin, authController.login);

/**
 * @route GET /auth/verify-account/{token}
 * @group Auth
 * @description Verify the account of the user
 * @param {string} token.params - Token to verify the account
 * @returns {object} 200 - Account verified successfully
 * @returns {Error} 400 - Bad Request. The token is invalid
 * @returns {Error} 404 - Not Found. The user is not found
 * @returns {Error} 500 - Error while verifying the account
 */
router.get('/verify-account/:token', authController.verifyAccount);

export default router;