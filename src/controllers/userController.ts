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
    try {
      const users = await this.userService.getAllUsers(req.app.locals.db);
      res.json(users);
    }
    catch (error) {
      console.log({ src: "User:Controller:getAll", error: (error as Error)?.message });
      res.status(500).json({ message: "Something went wrong" });
    }
  }

  /**
   * Retrieves a user by their ID.
   * @param {Request} req - The HTTP request.
   * @param {Response} res - The HTTP response.
   */
  async getUserById(req: Request, res: Response) {
    try {
      const user = await this.userService.getUserById(req.app.locals.db, req.params.id);
      if (!user) return res.status(404).json({ message: 'User not found' });
      res.json(user);
    }
    catch (error) {
      console.log({ src: "User:Controller:getById", error: (error as Error)?.message });
      res.status(500).json({ message: "Something went wrong" });
    }
  }

  /**
   * Creates a new user.
   * @param {Request} req - The HTTP request.
   * @param {Response} res - The HTTP response.
   */
  async createUser(req: Request, res: Response) {
    try {
      const user = await this.userService.createUser(req.app.locals.db, req.body);
      res.status(201).json(user);
    }
    catch (error) {
      console.log({ src: "User:Controller:create", error: (error as Error)?.message });
      res.status(500).json({ message: "Something went wrong" });
    }
  }

  /**
   * Updates an existing user.
   * @param {Request} req - The HTTP request.
   * @param {Response} res - The HTTP response.
   */
  async updateUser(req: Request, res: Response) {
    try {
      const user = await this.userService.updateUser(req.app.locals.db, req.params.id, req.body);
      res.json(user);
    }
    catch (error) {
      console.log({ src: "User:Controller:update", error: (error as Error)?.message });
      res.status(500).json({ message: "Something went wrong" });
    }
  }

  /**
   * Deletes a user by ID.
   * @param {Request} req - The HTTP request.
   * @param {Response} res - The HTTP response.
   */
  async deleteUser(req: Request, res: Response) {
    try {
      const obj = await this.userService.deleteUser(req.app.locals.db, req.params.id);
      !obj ? res.status(404).json({ message: 'User not found' }) : res.status(200).json(obj);
    }
    catch (error) {
      console.log({ src: "User:Controller:delete", error: (error as Error)?.message });
      res.status(500).json({ message: "Something went wrong" });
    }
  }
}