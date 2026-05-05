import { Check } from 'lucide-react';
import { cn } from '../../utils/cn.js';

export const StepIndicator = ({ currentStep }) => {
  const steps = [
    { id: 1, name: 'Business Profile' },
    { id: 2, name: 'Problem Details' },
    { id: 3, name: 'AI Report' },
  ];

  return (
    <nav aria-label="Progress" className="mb-8 hidden sm:block">
      <ol role="list" className="flex items-center">
        {steps.map((step, stepIdx) => (
          <li key={step.name} className={cn(stepIdx !== steps.length - 1 ? 'pr-8 sm:pr-20' : '', 'relative')}>
            {step.id < currentStep ? (
              <>
                <div className="absolute inset-0 flex items-center" aria-hidden="true">
                  <div className="h-0.5 w-full bg-black" />
                </div>
                <div className="relative flex h-8 w-8 items-center justify-center rounded-full bg-black hover:bg-gray-800">
                  <Check className="h-5 w-5 text-white" aria-hidden="true" />
                </div>
              </>
            ) : step.id === currentStep ? (
              <>
                <div className="absolute inset-0 flex items-center" aria-hidden="true">
                  <div className="h-0.5 w-full bg-gray-200" />
                </div>
                <div className="relative flex h-8 w-8 items-center justify-center rounded-full border-2 border-black bg-white" aria-current="step">
                  <span className="h-2.5 w-2.5 rounded-full bg-black" />
                </div>
              </>
            ) : (
              <>
                <div className="absolute inset-0 flex items-center" aria-hidden="true">
                  <div className="h-0.5 w-full bg-gray-200" />
                </div>
                <div className="relative flex h-8 w-8 items-center justify-center rounded-full border-2 border-gray-300 bg-white hover:border-gray-400">
                  <span className="h-2.5 w-2.5 rounded-full bg-transparent" />
                </div>
              </>
            )}
            <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 whitespace-nowrap text-xs font-medium text-gray-500">
              {step.name}
            </span>
          </li>
        ))}
      </ol>
    </nav>
  );
};
