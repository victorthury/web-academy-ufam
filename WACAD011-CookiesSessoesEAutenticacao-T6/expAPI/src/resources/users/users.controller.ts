import { Request, Response } from 'express';
import { ReasonPhrases, StatusCodes } from 'http-status-codes';
import userService, { getUserByEmail } from './users.service';
import { CreateUserDTO, UpdateUserDTO } from './users.type';

const index = async (req: Request, res: Response) => {
  /* 
    #swagger.summary = "Lista todos os usuários do banco de dados."
    
    #swagger.responses[200] = {
      description: 'Retorna um array de usuários',
      schema: {
        type: 'array',
        items: {
          $ref: '#definitions/User'
        } 
      }
    }

    #swagger.responses[500] = {
      description: 'Internal server error'
    }
  */

  try {
    const users = await userService.list();
    res.status(StatusCodes.OK).json({ users });
  } catch (err) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(err);
  }
};

const read = async (req: Request, res: Response) => {
  /*
    #swagger.summary = "Lê um usuário cadastrado no banco de dados."
    #swagger.parameters['id'] = {
      description: "O id de um usuário cadastrado no banco de dados"
    }

    #swagger.responses[200] = {
      description: "Retorno do usuário",
      schema: { $ref: '#definitions/User' }
    }

    #swagger.responses[404] = {
      description: 'O usuário não existe no bancos de dados'
    }

    #swagger.responses[500] = {
      description: 'Internal server error'
    }
  */

  const id = req.params.id as string;

  try {
    const user = await userService.getById(id);

    if (!user) {
      res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: `O user com id ${id} não existe` });
    }

    res.status(StatusCodes.OK).json({ user });
  } catch (err) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(err);
  }
};

const create = async (req: Request, res: Response) => {
  /*
    #swagger.summary = 'Cria um novo usuário no banco de dados.'
    #swagger.parameters['body'] = {
      in: 'body',
      description: 'Dados do novo usuário a ser criado',
      required: true,
      schema: { $ref: '#/definitions/CreateUserDTO' }
    } 
    #swagger.responses[201] = {
      description: 'O usuário foi criado com sucesso no banco de dados.',
      schema: { $ref: '#definitions/User' }
    }
    
    #swagger.responses[409] = {
      description: 'O usuário já existe no banco de dados.'
    }

    #swagger.responses[500] = {
      description: 'Internal server error'
    }
  */

  try {
    const user = req.body as CreateUserDTO;
    if (!(await getUserByEmail(user.email))) {
      const createdUser = await userService.createUser(user);
      res.status(StatusCodes.OK).json(createdUser);
    } else {
      res.status(StatusCodes.CONFLICT).json(ReasonPhrases.CONFLICT);
    }
  } catch (err) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(err);
  }
};

const update = async (req: Request, res: Response) => {
  /*
    #swagger.summary = 'Atualiza os dados de um usuário existente.'
    #swagger.parameters['id'] = {
      description: 'Id do usuário',
      required: true
    }
    #swagger.parameters['body'] = {
      in: 'body',
      required: true,
      schema: { $ref: '#/definitions/CreateUserDTO' }
    } 
    #swagger.responses[200] = {
      description: 'O usuário foi atualizado com sucesso.',
      schema: { $ref: '#definitions/User' }
    }
    
    #swagger.responses[404] = {
      description: 'O usuário não existe no banco de dados.'
    }

    #swagger.responses[500] = {
      description: 'Internal server error'
    }
  */
  try {
    const id = req.params.id as string;
    const user = req.body as UpdateUserDTO;
    const userExists = await userService.getById(id);

    if (userExists) {
      const userUpdate = await userService.update(id, user);
      res.status(StatusCodes.OK).json({ user: userUpdate });
    } else {
      res.status(StatusCodes.NOT_FOUND).json(ReasonPhrases.NOT_FOUND);
    }
  } catch (err) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json(ReasonPhrases.INTERNAL_SERVER_ERROR);
  }
};
const remove = async (req: Request, res: Response) => {
  /* 
    #swagger.summary = "Remove um usuário do banco de dados dado o seu id."
    
    #swagger.parameters['id'] = {
      description: 'Id do usuário',
      required: true
    }

    #swagger.responses[200] = {
      description: 'Usuário removido com sucesso.',
      schema: { message: "OK" }
    }

    #swagger.responses[404] = {
      description: 'O usuário não existe no banco de dados.'
    }

    #swagger.responses[500] = {
      description: 'Internal server error'
    }
  */
  const id = req.params.id as string;

  try {
    if (!(await userService.idExists(id))) {
      res.status(StatusCodes.NOT_FOUND).json(ReasonPhrases.NOT_FOUND);
    } else {
      await userService.remove(id);
      res.status(StatusCodes.OK).json({ message: ReasonPhrases.OK });
    }
  } catch (err) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json(ReasonPhrases.INTERNAL_SERVER_ERROR);
  }
};

export default { index, read, create, update, remove };
