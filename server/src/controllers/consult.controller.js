import { Session } from '../models/Session.model.js';
import * as nvidiaService from '../services/nvidia.service.js';
import { sendSuccess, sendError } from '../utils/response.js';

export const analyze = async (req, res, next) => {
  try {
    const formData = req.body;
    
    // Analyze using NVIDIA AI
    const analysis = await nvidiaService.analyzeBusiness(formData);
    
    // Save session to database
    const session = await Session.create({
      user: req.user._id,
      ...formData,
      diagnosis: analysis.diagnosis,
      actionPlan: analysis.actionPlan,
      prioritySteps: analysis.prioritySteps
    });

    return sendSuccess(res, 201, 'Analysis complete.', {
      sessionId: session._id,
      diagnosis: session.diagnosis,
      actionPlan: session.actionPlan,
      prioritySteps: session.prioritySteps
    });
  } catch (error) {
    next(error);
  }
};

export const followup = async (req, res, next) => {
  try {
    const { sessionId } = req.params;
    const { question } = req.body;

    const session = await Session.findOne({ _id: sessionId, user: req.user._id });
    if (!session) {
      const error = new Error('Session not found');
      error.statusCode = 404;
      throw error;
    }

    const answer = await nvidiaService.answerFollowup(session, question);

    session.followups.push({ question, answer });
    await session.save();

    return sendSuccess(res, 200, null, { answer });
  } catch (error) {
    next(error);
  }
};

export const getSessions = async (req, res, next) => {
  try {
    const sessions = await Session.find({ user: req.user._id })
      .select('id businessType city problemArea createdAt')
      .sort({ createdAt: -1 });

    return sendSuccess(res, 200, null, sessions.map(s => ({
      id: s._id,
      businessType: s.businessType,
      city: s.city,
      problemArea: s.problemArea,
      createdAt: s.createdAt
    })));
  } catch (error) {
    next(error);
  }
};

export const getSession = async (req, res, next) => {
  try {
    const session = await Session.findOne({ _id: req.params.id, user: req.user._id });
    if (!session) {
      const error = new Error('Session not found');
      error.statusCode = 404;
      throw error;
    }

    return sendSuccess(res, 200, null, {
      id: session._id,
      businessType: session.businessType,
      city: session.city,
      revenue: session.revenue,
      businessAge: session.businessAge,
      problemArea: session.problemArea,
      teamSize: session.teamSize,
      urgency: session.urgency,
      detail: session.detail,
      diagnosis: session.diagnosis,
      actionPlan: session.actionPlan,
      prioritySteps: session.prioritySteps,
      followups: session.followups.map(f => ({
        question: f.question,
        answer: f.answer,
        createdAt: f.createdAt
      })),
      createdAt: session.createdAt
    });
  } catch (error) {
    next(error);
  }
};

export const deleteSession = async (req, res, next) => {
  try {
    const session = await Session.findOneAndDelete({ _id: req.params.id, user: req.user._id });
    if (!session) {
      const error = new Error('Session not found');
      error.statusCode = 404;
      throw error;
    }

    return sendSuccess(res, 200, 'Session deleted.');
  } catch (error) {
    next(error);
  }
};
