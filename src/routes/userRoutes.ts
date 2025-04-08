import express from 'express';
import { UserController } from '../controllers/userController';

/**
 * @function userRoutes
 * @description Defines HTTP routes for user resource operations.
 * @param {UserController} userController - The controller managing route logic.
 * @returns {express.Router} Configured express router.
 */
const userRoutes = (userController: UserController) => {
  const router = express.Router();

  router.get('/', userController.getUsers.bind(userController));
  router.get('/:id', userController.getUserById.bind(userController));
  router.post('/', userController.createUser.bind(userController));
  router.put('/:id', userController.updateUser.bind(userController));
  router.delete('/:id', userController.deleteUser.bind(userController));

  return router;
};

export default userRoutes;