import { Request, Response } from 'express';

const changeLanguageValue = (req: Request, res: Response) => {
  /* 
    #swagger.summary = "Configura o cookie de idioma."

    #swagger.parameters['body'] = {
      in: 'body',
      schema: { lang: "pt-BR" }
    } 

    #swagger.responses[200] = {
      description: 'O produto foi criado com sucesso no banco de dados.',
      schema: { lang: "pt-BR" }
    }
  */

  const { lang } = req.body;
  res.cookie('lang', lang).json({ lang });
};

export default { changeLanguageValue };
