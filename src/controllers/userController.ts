import { Request, Response } from 'express';
import { UserService } from '../services/userService';

/**
 * @class UserController
 * @description Controller to handle user-related routes.
 */
export class UserController {
  private userService: UserService;

  /**
   * @constructor
   * @param {UserService} userService - The user service to be injected.
   */
  constructor(userService: UserService) {
    this.userService = userService;
  }

  async getUsers(req: Request, res: Response) {
    const users = await this.userService.getAllUsers(req.app.locals.db);
    res.json(users);
  }

  async createUser(req: Request, res: Response) {
    const user = await this.userService.createUser(req.app.locals.db, req.body);
    res.status(201).json(user);
  }

  async updateUser(req: Request, res: Response) {
    const user = await this.userService.updateUser(req.app.locals.db, req.params.id, req.body);
    res.json(user);
  }

  async deleteUser(req: Request, res: Response) {
    await this.userService.deleteUser(req.app.locals.db, req.params.id);
    res.status(204).send();
  }
}