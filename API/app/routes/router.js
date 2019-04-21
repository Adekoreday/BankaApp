import express from 'express';
import accountRouter from './accountRouter';
import TransactionRouter from './TransactionRouter';
import userRouter from './userRouter';

const Router = express.Router();
Router.use(userRouter, accountRouter, TransactionRouter);
export default Router;