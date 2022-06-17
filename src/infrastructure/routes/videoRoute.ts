import express from 'express';
import videoController from '../controllers/videoController';

const router = express.Router();

router.get('/video', videoController.getVideo);

export default router;
