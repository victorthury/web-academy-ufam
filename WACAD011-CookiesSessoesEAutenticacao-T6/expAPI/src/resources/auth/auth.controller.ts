import { Request, Response } from 'express';
import { createUser, getUserByEmail } from '../users/users.service';
import { ReasonPhrases, StatusCodes } from 'http-status-codes';
import { Login, SignUp } from './auth.types';
import { UserTypes } from '../userTypes/userTypes.constants';
import { checkCredentials } from './auth.service';

const signup = async (req: Request, res: Response) => {
  try {
    const user = req.body as SignUp;

    if (!(await getUserByEmail(user.email))) {
      const newUser = await createUser({
        ...user,
        userTypeId: UserTypes.client
      });
      res.status(StatusCodes.CREATED).json(newUser);
    } else {
      res.status(StatusCodes.CONFLICT).json(ReasonPhrases.CONFLICT);
    }
  } catch (err) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json(ReasonPhrases.INTERNAL_SERVER_ERROR);
  }
};
const login = async (req: Request, res: Response) => {
  try {
    const credentials = req.body as Login;
    const user = await checkCredentials(credentials);

    if (!user) {
      res.status(StatusCodes.UNAUTHORIZED).json(ReasonPhrases.UNAUTHORIZED);
    } else {
      req.session.uid = user.id;
      req.session.userTypeId = user.userTypeId;

      res.status(StatusCodes.OK).json(ReasonPhrases.OK);
    }
  } catch (err) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json(ReasonPhrases.INTERNAL_SERVER_ERROR);
  }
};
const logout = (req: Request, res: Response) => {
  req.session.destroy((err) => {
    if (err) {
      res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json(ReasonPhrases.INTERNAL_SERVER_ERROR);
    } else {
      res.status(StatusCodes.OK).json(ReasonPhrases.OK);
    }
  });
};

export default { signup, login, logout };
