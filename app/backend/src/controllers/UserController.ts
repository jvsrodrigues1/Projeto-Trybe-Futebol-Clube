import { Request, Response } from 'express';
import IServiceUser from '../interfaces/IAllUsers';

export default class UserControler {
  private _service: IServiceUser;

  constructor(service: IServiceUser) {
    this._service = service;
  }

  async toLogin(req:Request, res:Response) {
    const { email, password } = req.body;
    const isUser = await this._service.toLogin({ email, password });
    return res.status(200).json(isUser);
  }
}
