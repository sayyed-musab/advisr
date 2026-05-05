import mongoose from 'mongoose';

const followupSchema = new mongoose.Schema(
  {
    question: {
      type: String,
      required: true
    },
    answer: {
      type: String,
      required: true
    }
  },
  { timestamps: true }
);

const sessionSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    businessType: { type: String, required: true },
    city: { type: String, required: true },
    revenue: { type: String, required: true },
    businessAge: { type: String, required: true },
    problemArea: { type: String, required: true },
    teamSize: { type: String, required: true },
    urgency: { type: String, required: true },
    detail: { type: String, required: true },
    
    diagnosis: { type: String, required: true },
    actionPlan: { type: String, required: true },
    prioritySteps: { type: String, required: true },
    
    followups: [followupSchema]
  },
  { timestamps: true }
);

export const Session = mongoose.model('Session', sessionSchema);
