import { useState, type ChangeEvent } from 'react';
import { BackgroundContainer } from '@/components/Form/BackgroundContainer/BackgroundContainer';
import { FormCard } from '@/components/Form/FormCard/FormCard';
import { FormHeader } from '@/components/Form/FormHeader/FormHeader';
import { EmailInput } from '@/components/Form/EmailInput/EmailInput';
import { SubmitButton } from '@/components/Form/SubmitButton/SubmitButton';
import { ThemeBadge } from '@/components/Form/ThemeBadge/ThemeBadge';

export default function Form() {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const isValidEmail =
    email.length > 0 && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleSubmit = async () => {
    if (!isValidEmail) return;

    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      alert('Email submitted successfully! Next step would load here.');
      setIsSubmitting(false);
    }, 1000);
  };

  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  return (
    <BackgroundContainer>
      <div className='absolute top-3 left-3'>
        <ThemeBadge />
      </div>
      <FormCard>
        <div className='space-y-6'>
          <FormHeader />

          <div className='space-y-4'>
            <EmailInput email={email} onChange={handleEmailChange} />

            <SubmitButton
              isValid={isValidEmail}
              isSubmitting={isSubmitting}
              onClick={handleSubmit}
            />
          </div>
        </div>
      </FormCard>
    </BackgroundContainer>
  );
}
