import { Request, Response, NextFunction } from 'express';
import validator from 'validator';

class Middleware {
  private verifyName = (req: Request, res: Response, next: NextFunction) => {
    const { name } = req.body;

    if (typeof name !== 'string') {
      return res.status(400).json({ message: 'a chave "name" é obrigatória' });
    }

    next();
  };

  private verifyEmail = (req: Request, res: Response, next: NextFunction) => {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ message: 'a chave "email" é obrigatória' });
    }

    if (!validator.isEmail(email)) {
      return res.status(400).json({ message: 'a chave "email" é inválida' });
    }

    next();
  };

  private verifyPassword = (req: Request, res: Response, next: NextFunction) => {
    const { password } = req.body;

    if (typeof password !== 'string') {
      return res.status(400).json({ message: 'a chave "password" é obrigatória' });
    }

    if (password.length <= 6) {
      return res.status(400).json({ message: 'a chave "password" deve ter mais de 6 caracteres' });
    }

    next();
  };

  public createUser = [this.verifyName, this.verifyEmail, this.verifyPassword];
}

export default Middleware;
