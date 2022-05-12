import { Router } from 'express';

import Controller from '../controller/users.controller';
import Middleware from '../middlewares/users.middleware';

const controller = new Controller();
const middleware = new Middleware();

const router = Router();

router.route('/')
  .get(controller.getUsers)
  .post(...middleware.createUser, controller.createUser);

router.route('/:id')
  .delete(controller.deleteUser)
  .get(controller.getUser);

export default router;
