import express from 'express';

import * as groupController from '../controllers/group.js';
import validateSchema from '../middlewares/validateSchema.js';
import groupSchema from '../../validation-schemas/group.js';

const router = express.Router();

router.get('/', groupController.getAllGroups);

router.get('/:groupId', groupController.getSpecificGroup);

router.post('/', validateSchema(groupSchema), groupController.createGroup);

router.patch('/:groupId', validateSchema(groupSchema), groupController.updateGroup);

router.delete('/:groupId', groupController.deleteGroup);

// This route exists for example ONLY, and to show how the method 'addUsersToGroup' works
router.put('/:groupId', groupController.addAccessRightsToUsers);

export default router;
