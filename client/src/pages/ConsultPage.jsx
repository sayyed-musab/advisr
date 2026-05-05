import { useEffect } from 'react';
import { PageWrapper } from '../components/layout/PageWrapper.jsx';
import { StepIndicator } from '../components/consult/StepIndicator.jsx';
import { StepProfile } from '../components/consult/StepProfile.jsx';
import { StepDetail } from '../components/consult/StepDetail.jsx';
// We will build StepReport in the next step, importing it ahead of time
import { StepReport } from '../components/consult/StepReport.jsx';
import { useConsultStore } from '../store/consultStore.js';

export const ConsultPage = () => {
  const { step } = useConsultStore();

  useEffect(() => {
    // Scroll to top when step changes
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [step]);

  return (
    <PageWrapper>
      <div className="container mx-auto max-w-3xl px-4 py-8">
        <div className="mb-12 flex justify-center pb-8 pt-4">
          <StepIndicator currentStep={step} />
        </div>

        {step === 1 && <StepProfile />}
        {step === 2 && <StepDetail />}
        {step === 3 && <StepReport />}
      </div>
    </PageWrapper>
  );
};
