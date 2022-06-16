import { Request, Response, NextFunction } from 'express';
import environmentConfig from '../constants/environment.constant';
import User from '../models/user.model';
import { MyUserRequest } from '../interface';
import jwt = require('jsonwebtoken');

export const verifyUser = async (req: MyUserRequest, res: Response, next: NextFunction) => {
  const { authorization } = req.headers as any;
  if (!authorization) {
    return res.status(400).json({ message: 'Inavalid token..!', status: 400 });
  }

  jwt.verify(authorization, environmentConfig.JWT_SECRET, async (err: any, payload: any) => {
    if (err) {
      return res.status(400).json({ message: 'Inavalid username or password..!', status: 400 });
    }
    const { id } = payload;
    console.log(id);
    const user = await User.findOne({ where: { id } });
    if (user) {
      req.user = user;
      next();
    } else {
      return res.status(400).json({ message: 'User not found..!', status: 400 });
    }
  });
};

export const verifyAdmin = async (req: MyUserRequest, res: Response, next: NextFunction) => {
  if (req.user?.role == 'admin') {
    next();
  } else {
    return res.status(400).json({ message: 'You have no permission..!', status: 400 });
  }
};
