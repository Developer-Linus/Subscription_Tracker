import { Router } from 'express';
import { getAllUsers, getUser } from '../controllers/user.controller.js';
import authorize from '../middlewares/auth.middleware.js';

const userRouter = Router();

userRouter.get('/', getAllUsers);
userRouter.get('/:id',authorize, getUser);
userRouter.post('/', (req,res)=> res.send({title: 'CREATE user.'}));
userRouter.put('/', (req,res)=> res.send({title: 'UPDATE user.'}));
userRouter.delete('/', (req,res)=> res.send({title: 'DELETE user.'}));

export default userRouter;
