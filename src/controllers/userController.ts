import { Request, Response } from 'express';
import { UserService } from '../services/userService';

/**
 * @class UserController
 * @description Handles HTTP requests related to user management. Acts as a bridge between the routes and business logic layer.
 */
export class UserController {
  private userService: UserService;

  /**
   * Initializes a new instance of the UserController class.
   * @param {UserService} userService - Service instance used to perform user operations.
   */
  constructor(userService: UserService) {
    this.userService = userService;
  }

  /**
   * Retrieves all users.
   * @param {Request} req - The HTTP request.
   * @param {Response} res - The HTTP response.
   */
  async getUsers(req: Request, res: Response) {
    const users = await this.userService.getAllUsers(req.app.locals.db);
    res.json(users);
  }

  /**
   * Retrieves a user by their ID.
   * @param {Request} req - The HTTP request.
   * @param {Response} res - The HTTP response.
   */
  async getUserById(req: Request, res: Response) {
    const user = await this.userService.getUserById(req.app.locals.db, req.params.id);
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json(user);
  }

  /**
   * Creates a new user.
   * @param {Request} req - The HTTP request.
   * @param {Response} res - The HTTP response.
   */
  async createUser(req: Request, res: Response) {
    const user = await this.userService.createUser(req.app.locals.db, req.body);
    res.status(201).json(user);
  }

  /**
   * Updates an existing user.
   * @param {Request} req - The HTTP request.
   * @param {Response} res - The HTTP response.
   */
  async updateUser(req: Request, res: Response) {
    const user = await this.userService.updateUser(req.app.locals.db, req.params.id, req.body);
    res.json(user);
  }

  /**
   * Deletes a user by ID.
   * @param {Request} req - The HTTP request.
   * @param {Response} res - The HTTP response.
   */
  async deleteUser(req: Request, res: Response) {
    await this.userService.deleteUser(req.app.locals.db, req.params.id);
    res.status(204).send();
  }
}