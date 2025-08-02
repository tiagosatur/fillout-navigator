import { Brush } from 'lucide-react';

export const ThemeBadge = () => (
  <button className='inline-flex justify-start items-center mb-8 gap-1 px-3 py-1 rounded-full text-xs text-slate-700/80 border border-slate-600/50 bg-white font-semibold cursor-pointer'>
    <Brush size={18} />
    <span>Theme</span>
  </button>
);
