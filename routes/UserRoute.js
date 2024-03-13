import express from 'express';
import * as userController from '../controllers/UserController.js';
import * as AuthMidllewares from '../midllewares/AuthMidllewares.js'
 
const router = express.Router();

router.route('/register').post(userController.createUser);
router.route('/login').post(userController.loginUser);

//authenticateToken func. calıstırıyor, token kontrolu
router.route('/dashboard').get(AuthMidllewares.authenticateToken,   userController.getDashboardPage);

 

export default router;