import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useConsultStore } from '../../store/consultStore.js';
import { Button } from '../ui/Button.jsx';
import { Input } from '../ui/Input.jsx';
import { Select } from '../ui/Select.jsx';

const profileSchema = z.object({
  businessType: z.string().min(1, 'Business type is required'),
  city: z.string().min(1, 'City is required'),
  revenue: z.string().min(1, 'Revenue range is required'),
  businessAge: z.string().min(1, 'Business age is required'),
  teamSize: z.string().min(1, 'Team size is required'),
});

const revenueOptions = [
  'Under ₹50k',
  '₹50k - ₹2L',
  '₹2L - ₹10L',
  '₹10L+',
];

const ageOptions = [
  'Just starting out (< 1 year)',
  '1-3 years',
  '3-5 years',
  '5+ years',
];

const teamOptions = [
  'Solo founder',
  '2-5 people',
  '6-15 people',
  '15+ people',
];

export const StepProfile = () => {
  const { formData, setFormData, setStep } = useConsultStore();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      businessType: formData.businessType,
      city: formData.city,
      revenue: formData.revenue,
      businessAge: formData.businessAge,
      teamSize: formData.teamSize,
    },
  });

  const onSubmit = (data) => {
    setFormData(data);
    setStep(2);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm space-y-4">
        <div>
          <h2 className="text-xl font-bold text-gray-900 mb-1">Tell us about your business</h2>
          <p className="text-sm text-gray-500 mb-6">This helps our AI understand your context.</p>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Input
            label="Business Type"
            placeholder="e.g. Retail shop, Cafe, Freelance"
            error={errors.businessType?.message}
            {...register('businessType')}
          />
          <Input
            label="City"
            placeholder="e.g. Pune, Mumbai"
            error={errors.city?.message}
            {...register('city')}
          />
          <Select
            label="Monthly Revenue"
            options={revenueOptions}
            error={errors.revenue?.message}
            {...register('revenue')}
          />
          <Select
            label="Business Age"
            options={ageOptions}
            error={errors.businessAge?.message}
            {...register('businessAge')}
          />
          <Select
            label="Team Size"
            options={teamOptions}
            error={errors.teamSize?.message}
            {...register('teamSize')}
            className="sm:col-span-2"
          />
        </div>
      </div>

      <div className="flex justify-end">
        <Button type="submit">
          Continue to Details
        </Button>
      </div>
    </form>
  );
};
