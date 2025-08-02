import type { ReactNode } from 'react';

export const BackgroundContainer = ({ children }: { children: ReactNode }) => (
  <div className='h-full relative bg-gradient-to-br  rounded-md from-slate-800 via-slate-900 to-slate-800 flex items-center justify-center p-4'>
    {children}
  </div>
);
