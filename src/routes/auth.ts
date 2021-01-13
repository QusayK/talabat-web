import controller from '../controllers/auth';
import express from 'express';

const router = express.Router();

router.post('/register', controller.register);

router.post('/login', controller.login);

export default router;