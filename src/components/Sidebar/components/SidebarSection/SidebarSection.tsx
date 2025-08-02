import type { ReactNode } from 'react';

interface SidebarSectionProps {
  title: string;
  children: ReactNode;
}

export const SidebarSection = ({ title, children }: SidebarSectionProps) => (
  <div className='mb-8'>
    <h3 className='text-gray-500 text-sm font-semibold mb-4'>{title}</h3>
    {children}
  </div>
);
