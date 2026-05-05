import { z } from 'zod';

export const analyzeSchema = z.object({
  body: z.object({
    businessType: z.string().min(1, 'Business type is required'),
    city: z.string().min(1, 'City is required'),
    revenue: z.string().min(1, 'Revenue is required'),
    businessAge: z.string().min(1, 'Business age is required'),
    problemArea: z.string().min(1, 'Problem area is required'),
    teamSize: z.string().min(1, 'Team size is required'),
    urgency: z.string().min(1, 'Urgency is required'),
    detail: z.string().min(10, 'Please provide more details')
  })
});

export const followupSchema = z.object({
  body: z.object({
    question: z.string().min(1, 'Question is required')
  }),
  params: z.object({
    sessionId: z.string().min(1, 'Session ID is required')
  })
});
