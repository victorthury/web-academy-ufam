import { Request, Response } from 'express';
import { createUser, getUserByEmail } from '../users/users.service';
import { ReasonPhrases, StatusCodes } from 'http-status-codes';
import { Login, SignUp } from './auth.types';
import { UserTypes } from '../userTypes/userTypes.constants';
import { checkCredentials } from './auth.service';

const signup = async (req: Request, res: Response) => {
  /*
    #swagger.summary = 'Cria um novo usuário do tipo cliente (sign up).'
    #swagger.parameters['body'] = {
      in: 'body',
      required: true,
      description: 'Dados necessários para o cadastro de um novo usuário.',
      schema: { $ref: '#/definitions/SignUp' }
    }
    #swagger.responses[201] = {
      description: 'Usuário criado com sucesso.',
      schema: { $ref: '#definitions/SignUpUser' }
    }
    #swagger.responses[409] = {
      description: 'O e-mail informado já está cadastrado no sistema.'
    }
    #swagger.responses[500] = {
      description: 'Internal server error'
    }
  */
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
  /*
    #swagger.summary = 'Realiza o login de um usuário.'
    #swagger.parameters['body'] = {
      in: 'body',
      required: true,
      description: 'Credenciais do usuário para autenticação.',
      schema: { $ref: '#/definitions/Login' }
    }
    #swagger.responses[200] = {
      description: 'Login realizado com sucesso.'
    }
    #swagger.responses[401] = {
      description: 'Credenciais inválidas ou usuário não autorizado.'
    }
    #swagger.responses[500] = {
      description: 'Internal server error'
    }
  */

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
  /*
    #swagger.summary = 'Realiza o logout do usuário autenticado e encerra a sessão.'
    #swagger.responses[200] = {
      description: 'Logout realizado com sucesso.'
    }
    #swagger.responses[500] = {
      description: 'Erro interno ao encerrar a sessão.'
    }
  */
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
