import express from 'express';

import * as userController from '../controllers/user.js';
import validateSchema from '../middleware/validateSchema.js';
import userSchema from '../validation_schema/user.js';

const router = express.Router();

router.get('/', userController.getAllUsers);

router.get('/list', userController.suggestedUserList);

router.get('/:userId', userController.getSpecificUser);

router.post('/', validateSchema(userSchema), userController.createUser);

router.patch('/:userId', validateSchema(userSchema), userController.updateUser);

router.delete('/:userId', userController.deleteUser);

export default router;
