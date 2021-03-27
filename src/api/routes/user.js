import express from 'express';

import * as userController from '../controllers/user.js';

const router = express.Router();

router.get('/', userController.getAllUsers);

router.get('/:userId', userController.getSpecificUser);

router.post('/', userController.createUser);

router.patch('/:userId', userController.updateUser);

router.delete('/:userId', userController.deleteUser);

export default router;
