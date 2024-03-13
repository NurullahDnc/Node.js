import express from 'express';
import * as userController from '../controllers/UserController.js';
 
const router = express.Router();

router.route('/register').post(userController.createUser);
router.route('/login').post(userController.loginUser);
 

export default router;