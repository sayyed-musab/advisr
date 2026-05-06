import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useConsultStore } from '../../store/consultStore.js';
import { Button } from '../ui/Button.jsx';
import { Select } from '../ui/Select.jsx';
import { Textarea } from '../ui/Textarea.jsx';
import toast from 'react-hot-toast';
import { Sparkles } from 'lucide-react';

const detailSchema = z.object({
  problemArea: z.string().min(1, 'Primary problem area is required'),
  urgency: z.string().min(1, 'Urgency is required'),
  detail: z.string().min(10, 'Please provide a bit more detail (at least 10 characters)'),
});

const problemOptions = [
  'Not enough customers / low footfall',
  'High marketing costs / low ROI',
  'Trouble hiring or keeping staff',
  'Cash flow / pricing issues',
  'Operations are too messy/manual',
  'Other',
];

const urgencyOptions = [
  'Critical: Need to act now',
  'Important: Needs attention soon',
  'Moderate: Planning for next quarter',
  'Low: Just exploring ideas',
];

export const StepDetail = () => {
  const { formData, setFormData, setStep, analyze, isLoading } = useConsultStore();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(detailSchema),
    defaultValues: {
      problemArea: formData.problemArea,
      urgency: formData.urgency,
      detail: formData.detail,
    },
  });

  const onSubmit = async (data) => {
    setFormData(data);
    try {
      await analyze();
      toast.success('Analysis complete!');
    } catch (error) {
      toast.error('Failed to generate report. Please try again.');
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm space-y-4">
        <div>
          <h2 className="text-xl font-bold text-gray-900 mb-1">What's holding you back?</h2>
          <p className="text-sm text-gray-500 mb-6">Describe the core challenge you want to solve today.</p>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Select
            label="Primary Problem Area"
            options={problemOptions}
            error={errors.problemArea?.message}
            {...register('problemArea')}
          />
          <Select
            label="Urgency"
            options={urgencyOptions}
            error={errors.urgency?.message}
            {...register('urgency')}
          />
          <div className="sm:col-span-2">
            <Textarea
              label="Describe the situation in detail"
              placeholder="E.g. I run a clothing store in Pune camp area. Footfall has dropped 30% since a new mall opened nearby..."
              error={errors.detail?.message}
              {...register('detail')}
              rows={4}
            />
          </div>
        </div>
      </div>

      <div className="flex justify-between">
        <Button type="button" variant="outline" onClick={() => setStep(1)} disabled={isLoading}>
          Back
        </Button>
        <Button type="submit" isLoading={isLoading}>
          <Sparkles className="mr-2 h-4 w-4" />
          Generate AI Report
        </Button>
      </div>
    </form>
  );
};
