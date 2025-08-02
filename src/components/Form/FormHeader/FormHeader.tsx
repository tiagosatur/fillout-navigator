export const FormHeader = () => (
  <div className='text-center space-y-2'>
    <h1 className='text-xl font-medium text-white flex items-center justify-center gap-1'>
      What's your email address?
      <span className='text-red-400'>*</span>
    </h1>
    <p className='text-slate-400 text-sm'>
      We'll send you birthday updates here!
    </p>
  </div>
);
