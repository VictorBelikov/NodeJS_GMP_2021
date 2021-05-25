import express from 'express';

import * as userController from '../controllers/user.js';
import validateSchema from '../middlewares/validateSchema.js';
import userSchema from '../../validation-schemas/user.js';

const router = express.Router();

router.post('/login', validateSchema(userSchema), userController.login);

export default router;
