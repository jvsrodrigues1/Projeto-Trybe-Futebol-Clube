import ILogin from './ILogin';
import IToken from './ITokens';

export default interface IServiceUser {
  toLogin(body:ILogin):Promise<IToken | null>;
}
