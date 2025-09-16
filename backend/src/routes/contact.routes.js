import express from 'express';
import { getContactMessages, submitContactForm } from '../controllers/contact.controller.js';
import { protectRoute } from '../middleware/protectRoute.js';

const router = express.Router();
router.post('/', submitContactForm);
// This route is PROTECTED for only the admin to view messages
router.get('/', protectRoute, getContactMessages);

export default router;