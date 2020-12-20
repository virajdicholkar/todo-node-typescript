import express from 'express';
import user from './user/user.controller';

const router = express.Router();
router.use('/user', user);

export default router;