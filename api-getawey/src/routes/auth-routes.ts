import express from "express";
import AuthController from "../controllers/auth-controller";

const router = express.Router();

/**
 * @route POST /auth/register
 * @group Auth
 * @description Register a new user
 * @param {string} username.params - Name
 * @param {string} email.params - Email
 * @param {string} password.params - Password
 * @param {string} confirm_password.params - Confirm password
 * @middleware existUserMiddleware.existByEmail - Verify if the email is already registered.
 * @middleware userController.validateAddUser - Validate the registration data.
 * @returns {object} 200 - User created successfully
 * @returns {Error} 400 - Bad Request. The data is invalid
 * @returns {Error} 409 - Conflict. The username o email is already registered
 * @returns {Error} 500 - Error while registering the user
 */
router.post('/register', AuthController.register); 

/**
 * @route POST /auth/login
 * @group Auth
 * @description Login a user
 * @param {string} email.params - Email
 * @param {string} password.params - Password
 * @returns {Error} 400 - Bad Request. The data is invalid
 * @returns {Error} 401 - Unauthorized
 * @returns {Error} 404 - Not Found. The user is not found
 * @returns {Error} 500 - Error while registering the user
 */
router.post('/login', AuthController.login);

export default router;