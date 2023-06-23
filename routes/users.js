import express from 'express';
import {
  createUser, getUsers, getUserById, updateUser,
} from '../controllers/users.js';

const router = express.Router();

router.get('/', getUsers);
router.get('/:id', getUserById);
router.post('/', createUser);
router.patch('/me', updateUser);
router.patch('/me/avatar', updateUser);

export {
  router as usersRouter,
};
