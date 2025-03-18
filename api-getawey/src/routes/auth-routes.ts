import express from "express";
import AuthController from "../controllers/auth-controller";

const router = express.Router();

//Register
router.post('/register', AuthController.register); 

//Login
router.get('/get-user/:id', AuthController.getUser);

export default router;