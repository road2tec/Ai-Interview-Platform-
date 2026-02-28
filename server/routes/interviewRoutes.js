import express from 'express';
import { protect } from '../middleware/auth.js';
import { startSession, evaluateAnswer, submitAlert, endSession, getDashboardData, getInterviewDetails } from '../controllers/interviewController.js';

const router = express.Router();

router.post('/start', protect, startSession);
router.post('/evaluate', protect, evaluateAnswer);
router.post('/alert', protect, submitAlert);
router.post('/end', protect, endSession);
router.get('/dashboard', protect, getDashboardData);
router.get('/:id', protect, getInterviewDetails);

export default router;
