import { Router } from 'express';
import authRouter from './auth';
import usersRouter from './users';
import lostAnimalsRouter from './lostAnimals';
import foundAnimalsRouter from './foundAnimals';
// import imageRouter from './image';
import { isLoggedIn, tokenMiddleware } from '../middleware/auth.mw';

let router = Router();

// router.use('/auth', authRouter);

// router
// 	.route('*')
// 	.post(tokenMiddleware, isLoggedIn)
// 	.put(tokenMiddleware, isLoggedIn)
// 	.delete(tokenMiddleware, isLoggedIn);

// router.use('/users', usersRouter);
router.use('/lostanimals', lostAnimalsRouter);
router.use('/foundanimals', foundAnimalsRouter);
// router.use('/image', imageRouter);

export default router;
