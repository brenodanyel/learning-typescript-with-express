import { Request, Response, NextFunction } from 'express';

import { customError } from '../helpers/generateError';

// eslint-disable-next-line
export default function (error: customError, _req: Request, res: Response, _next: NextFunction) {
  if (error.customMessage) {
    return res.status(error.status).json({ message: error.customMessage });
  }

  console.log(error);

  res.status(500).json({ message: 'Erro interno' });
}
