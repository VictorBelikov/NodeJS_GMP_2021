import express from 'express';

import * as userController from '../controllers/user.js';
import validateSchema from '../middlewares/validateSchema.js';
import checkAuth from '../middlewares/checkAuth.js';
import userSchema from '../../validation-schemas/user.js';

const router = express.Router();

router.get('/', checkAuth, userController.getAllUsers);

router.get('/list', checkAuth, userController.suggestedUserList);

router.get('/:userId', checkAuth, userController.getSpecificUser);

router.post('/', checkAuth, validateSchema(userSchema), userController.createUser);

router.post('/login', validateSchema(userSchema), userController.login);

router.patch('/:userId', checkAuth, validateSchema(userSchema), userController.updateUser);

router.delete('/:userId', checkAuth, userController.deleteUser);

export default router;
