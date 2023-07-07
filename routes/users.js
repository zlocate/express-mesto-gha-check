import express from 'express';
import {
  getUsers, getUserById, updateUser, getCurrentUser,
} from '../controllers/users.js';
import {
  updateAvatarCelebrate,
  updateUserCelebrate,
  userIdCelebrate,
} from '../validators/users.js';

const router = express.Router();

router.get('/', getUsers);
router.get('/me', getCurrentUser);
router.get('/:userId', userIdCelebrate, getUserById);
router.patch('/me', updateUserCelebrate, updateUser);
router.patch('/me/avatar', updateAvatarCelebrate, updateUser);

export {
  router as usersRouter,
};
