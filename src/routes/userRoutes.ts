import express from 'express';
import { UserController } from '../controllers/userController';

/**
 * Returns the router configured with user routes and injected controller.
 * @param {UserController} userController 
 */
const userRoutes = (userController: UserController) => {
  const router = express.Router();

  router.get('/', userController.getUsers.bind(userController));
  router.post('/', userController.createUser.bind(userController));
  router.put('/:id', userController.updateUser.bind(userController));
  router.delete('/:id', userController.deleteUser.bind(userController));

  return router;
};

export default userRoutes;