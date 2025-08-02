import type { ReactNode } from 'react';

export const FormCard = ({ children }: { children: ReactNode }) => (
  <div className='w-full max-w-md bg-slate-800/90 backdrop-blur-sm rounded-2xl shadow-2xl border border-slate-700/50 p-8'>
    {children}
  </div>
);
