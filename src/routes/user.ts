import controller from '../controllers/user';
import auth from '../middlewares/auth';
import express from 'express';

const router = express.Router();

router.use(auth);

router.get('/', controller.getAll);

router.get('/:id', controller.getSingle);

router.put('/:id', controller.put);

router.delete('/:id', controller._delete);

export default router;