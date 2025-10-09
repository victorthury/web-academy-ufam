import { Request, Response, NextFunction } from 'express';
import fs from 'fs';
import path from 'path';

type LogType = 'simples' | 'completo';

function logger(logType: LogType, logDir: string) {
  if (!fs.existsSync(logDir)) {
    fs.mkdirSync(logDir, { recursive: true });
  }

  const logFilePath = path.join(logDir, 'access.log');

  return (req: Request, res: Response, next: NextFunction) => {
    const acessDate = new Date().toISOString();
    let logMessage = '';

    if (logType === 'simples') {
      logMessage = `${acessDate} - ${req.url} - ${req.method}`;
    } else if (logType === 'completo') {
      logMessage = `${acessDate} ${req.method} ${req.url} HTTP/${req.httpVersion} ${req.get('User-Agent')}`;
    }

    fs.appendFileSync(logFilePath, logMessage + '\n', 'utf8');
    next();
  };
}

export default logger;
