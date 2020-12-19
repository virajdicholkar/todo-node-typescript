import express from 'express';
import user from './user/user.controller';
import task from './todo/todo.controller';

const router = express.Router();
router.use('/user', user);
router.use('/task', task);

export default router;