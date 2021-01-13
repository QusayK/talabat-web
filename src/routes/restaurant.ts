import controller from '../controllers/restaurant';
import auth from '../middlewares/auth';
import adminAuth from '../middlewares/adminAuth';
import upload from '../middlewares/upload';
import express from 'express';

const _upload = upload();

const router = express.Router();

router.use(auth);

router.get('/', controller.getAll);

router.get('/:id', controller.getSingle);

router.post('/', adminAuth, _upload.single('image'), controller.post);

router.put('/:id', adminAuth, _upload.single('image'), controller.put);

router.delete('/:id', adminAuth, controller._delete);

export default router;