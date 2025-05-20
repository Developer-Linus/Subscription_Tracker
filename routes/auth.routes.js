import { Router } from 'express';

const authRouter = Router();


authRouter.get('/sign-up', (req, res)=> res.send({message: 'Sign Up.'}));
authRouter.get('/sign-in', (req, res)=> res.send({message: 'Sign In.'}));
authRouter.get('/sign-out', (req, res)=> res.send({message: 'Sign Out.'}));

export default authRouter;