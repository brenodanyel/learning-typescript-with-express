import { IUser, IUserWithCredentials, IUserEditParams } from '../interfaces/users.interfaces';
import generateError from '../helpers/generateError';
import hashPasswords from '../helpers/hashPasswords';
import prisma from '../prisma/client';

class Service {
  private clearPassword(user: IUserWithCredentials): IUser {
    return { ...user, password: undefined } as IUser;
  }

  public getUsers = async (): Promise<IUser[]> => {
    const users = await prisma.user.findMany();
    const result: IUser[] = [];

    for (let index = 0; index <= users.length; index += 1) {
      result.push(this.clearPassword(users[index]));
    }

    return result;
  };

  public getUser = async (id: number): Promise<IUser> => {
    const user = await prisma.user.findFirst({ where: { id } });

    if (!user) {
      throw generateError({ status: 404, customMessage: 'Usuário não encontrado' });
    }

    return this.clearPassword(user);
  };

  public createUser = async (_params: IUserWithCredentials): Promise<IUser> => {
    const params = { ..._params };

    if (params.password) {
      params.password = await hashPasswords(params.password);
    }

    const user = await prisma.user.create({ data: params });

    return this.clearPassword(user);
  };

  public deleteUser = async (id: number): Promise<boolean> => {
    await this.getUser(id);
    await prisma.user.delete({ where: { id } });
    return true;
  };

  public editUser = async (id: number, _changes: IUserEditParams): Promise<IUser> => {
    const changes = { ..._changes };

    if (changes.password) {
      changes.password = await hashPasswords(changes.password);
    }

    await this.getUser(id);

    const user = await prisma.user.update({
      data: changes,
      where: { id },
    });

    return this.clearPassword(user);
  };
}

export default Service;
