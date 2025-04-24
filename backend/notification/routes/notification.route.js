import express from 'express';
import { getNotifications, deleteNotifications, deleteNotification } from '../controllers/notification.controller.js';


const router = express.Router();

router.get('/', getNotifications);
router.delete('/', deleteNotifications);
router.delete('/:id', deleteNotification);



export default router;