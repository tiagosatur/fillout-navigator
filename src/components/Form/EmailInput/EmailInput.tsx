import { ICON_COLORS } from '@/styles/theme';
import { Mail } from 'lucide-react';
import type { ChangeEventHandler } from 'react';

interface EmailInputProps {
  email: string;
  onChange: ChangeEventHandler<HTMLInputElement>;
}

export const EmailInput = ({ email, onChange }: EmailInputProps) => {
  return (
    <div className='relative'>
      <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
        <Mail size={20} color={ICON_COLORS.DEFAULT} />
      </div>
      <input
        type='email'
        id='email'
        name='email'
        value={email}
        onChange={onChange}
        className='w-full pl-10 pr-12 py-3 bg-slate-700/50 border border-slate-600/50 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent transition-all duration-200'
        required
      />
      <div className='absolute top-1/2 right-3 -translate-y-1/2'>
        <span className='text-red-400 text-sm font-bold'>*</span>
      </div>
    </div>
  );
};
