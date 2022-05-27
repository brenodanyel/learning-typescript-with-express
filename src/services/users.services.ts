import User from '../interfaces/users.interfaces';
import generateError from '../helpers/generateError';
import prisma from '../prisma/client';

class Service {
  public getUsers = async (): Promise<User[]> => {
    const users = await prisma.user.findMany();
    return users;
  };

  public getUser = async (id: number): Promise<User> => {
    const user = await prisma.user.findFirst({ where: { id } });

    if (!user) {
      throw generateError({ status: 404, customMessage: 'Usuário não encontrado' });
    }

    return user;
  };

  public createUser = async (params: User): Promise<User> => {
    const user = await prisma.user.create({ data: params });
    return user;
  };

  public deleteUser = async (id: number): Promise<boolean> => {
    await this.getUser(id);
    await prisma.user.delete({ where: { id } });
    return true;
  };
}

export default Service;
