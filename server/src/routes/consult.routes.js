import { Router } from 'express';
import * as consultController from '../controllers/consult.controller.js';
import { protect } from '../middlewares/auth.middleware.js';
import { validate } from '../middlewares/validate.middleware.js';
import { analyzeSchema, followupSchema } from '../validators/consult.validator.js';

const router = Router();

// Protect all consult routes
router.use(protect);

router.post('/analyze', validate(analyzeSchema), consultController.analyze);
router.post('/followup/:sessionId', validate(followupSchema), consultController.followup);
router.get('/sessions', consultController.getSessions);
router.get('/sessions/:id', consultController.getSession);
router.delete('/sessions/:id', consultController.deleteSession);

export default router;
