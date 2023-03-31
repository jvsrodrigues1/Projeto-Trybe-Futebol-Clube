import * as bcrypt from 'bcryptjs';
// referencia bcrypt para comprar passwords : https://stackoverflow.com/questions/40076638/compare-passwords-bcryptjs
import { ModelStatic } from 'sequelize';
import { createToken } from '../utilities/JWT';
import ILogin from '../interfaces/ILogin';
import IToken from '../interfaces/ITokens';
import IServiceUser from '../interfaces/IAllUsers';
import UserModel from '../database/models/UserModels';

export default class UserServise implements IServiceUser {
  protected model: ModelStatic<UserModel> = UserModel;

  async toLogin({ email, password }:ILogin):Promise<IToken | null> {
    const isUser = await this.model.findOne({ where: { email } });
    if (!isUser) return null;

    const validPassword = bcrypt.compareSync(password, isUser.password);
    if (!validPassword) return null;

    const token = createToken({
      id: isUser.id,
      role: isUser.role,
      email: isUser.email,
      password: isUser.password,
    });
    return { token };
  }
}
