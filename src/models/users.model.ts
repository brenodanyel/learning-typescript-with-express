import connection from '../database/mysql2';
import User from '../interfaces/users.interfaces';

class Model {
  public getUsers = async (): Promise<User[]> => {
    const [result] = await connection.execute('SELECT * FROM `Users`');
    return result as User[];
  };

  public getUser = async (id: number): Promise<User> => {
    const [result] = await connection.execute('SELECT * FROM `Users` WHERE `id`=?', [id]);
    const [user] = result as User[];
    return user;
  };

  public createUser = async (params: User): Promise<number> => {
    const { name, email, password } = params;
    const [result] = await connection.execute('INSERT INTO `Users` (`name`, `email`, `password`) VALUES(?, ?, ?)', [name, email, password]) as any;
    return result.insertId;
  };

  public deleteUser = async (id: number): Promise<boolean> => {
    await connection.execute('DELETE FROM `Users` WHERE `id`=?', [id]);
    return true;
  };
}

export default Model;
