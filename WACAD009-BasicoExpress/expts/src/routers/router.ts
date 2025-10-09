import { Router, Request, Response } from 'express';
import generateLoremByParagraphs from '../utils/lorem';
const router = Router();

router.get('/', (req: Request, res: Response) => {
  res.send('Página principal do site');
});

router.get('/about', (req: Request, res: Response) => {
  res.send('Página sobre');
});

router.get('/lorem/:paragraphs', (req: Request, res: Response) => {
  const paragraphs = req.params.paragraphs ?? '5';
  const result = generateLoremByParagraphs(parseInt(paragraphs));
  res.send(result);
});

router.get('/hb1', (req: Request, res: Response) => {
  res.render('hb1', {
    poweredByNodejs: true,
    name: 'Express',
    type: 'Framework',
    layout: false,
  });
});

router.get('/hb2', (req: Request, res: Response) => {
  res.render('hb2', {
    poweredByNodejs: true,
    name: 'Express',
    type: 'Framework',
    layout: false,
  });
});

router.get('/hb3', (req: Request, res: Response) => {
  const profes = [
    { nome: 'David Fernandes', sala: 1238 },
    { nome: 'Horácio Fernandes', sala: 1233 },
    { nome: 'Edleno Moura', sala: 1236 },
    { nome: 'Elaine Harada', sala: 1231 },
  ];
  res.render('hb3', { profes, layout: false });
});

export default router;
