import Model from '../models/users.model';
import User from '../interfaces/users.interfaces';
import generateError from '../helpers/generateError';

class Service {
  private model = new Model();

  public getUsers = async (): Promise<User[]> => {
    const users = await this.model.getUsers();
    return users;
  };

  public getUser = async (id: number): Promise<User> => {
    const user = await this.model.getUser(id);

    if (!user) {
      throw generateError({ status: 404, customMessage: 'Usuário não encontrado' });
    }

    return user;
  };

  public createUser = async (params: User): Promise<User> => {
    const id = await this.model.createUser(params);
    const user = await this.model.getUser(id);
    return user;
  };

  public deleteUser = async (id: number): Promise<boolean> => {
    await this.model.deleteUser(id);
    return true;
  };
}

export default Service;
