import controller from '../controllers/order';
import auth from '../middlewares/auth';
import express from 'express';

const router = express.Router();

router.use(auth);

router.get('/', controller.getAll);

router.get('/:id', controller.getSingle);

router.post('/', controller.post);

router.put('/:id', controller.put);

router.delete('/:id', controller._delete);

router.delete('/customer/:customer_id', controller.deleteCustomerOrders);

export default router;