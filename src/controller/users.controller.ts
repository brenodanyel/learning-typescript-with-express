import { Request, Response, NextFunction } from 'express';
import { IUserEditParams } from '../interfaces/users.interfaces';

import Service from '../services/users.services';

class Controller {
  private service = new Service();

  public getUsers = async (_req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const users = await this.service.getUsers();
      res.status(200).json(users);
    } catch (e) {
      next(e);
    }
  };

  public getUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const user = await this.service.getUser(Number(id));
      res.status(200).json(user);
    } catch (e) {
      next(e);
    }
  };

  public createUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { name, email, password } = req.body;
      const user = await this.service.createUser({ name, email, password });
      res.status(201).json(user);
    } catch (e) {
      next(e);
    }
  };

  public deleteUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      await this.service.deleteUser(Number(id));
      res.status(200).end();
    } catch (e) {
      next(e);
    }
  };

  public editUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const user = await this.service.editUser(Number(id), req.body as IUserEditParams);
      res.status(200).json(user);
    } catch (e) {
      next(e);
    }
  };
}

export default Controller;
