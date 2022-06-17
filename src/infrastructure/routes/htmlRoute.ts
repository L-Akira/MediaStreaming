import express from 'express';
import HtmlController from '../controllers/htmlController';

const router = express.Router();

router.get('/video', HtmlController.getVideoPage);

export default router;
