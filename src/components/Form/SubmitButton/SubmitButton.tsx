interface SubmitButtonProps {
  isValid: boolean;
  isSubmitting: boolean;
  onClick: () => void;
}

export const SubmitButton = ({
  isValid,
  isSubmitting,
  onClick,
}: SubmitButtonProps) => (
  <button
    type='button'
    disabled={!isValid || isSubmitting}
    onClick={onClick}
    className={`w-full font-medium py-3 px-6 rounded-lg transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] shadow-lg flex items-center justify-center space-x-2 ${
      isValid && !isSubmitting
        ? 'bg-gradient-to-r from-orange-400 to-amber-400 hover:from-orange-500 hover:to-amber-500 text-slate-900 hover:shadow-orange-400/25'
        : 'bg-slate-600/50 text-slate-400 cursor-not-allowed'
    }`}
  >
    {isSubmitting ? (
      <>
        <svg
          className='animate-spin w-4 h-4 mr-2'
          fill='none'
          viewBox='0 0 24 24'
        >
          <circle
            className='opacity-25'
            cx='12'
            cy='12'
            r='10'
            stroke='currentColor'
            strokeWidth='4'
          ></circle>
          <path
            className='opacity-75'
            fill='currentColor'
            d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'
          ></path>
        </svg>
        <span>Processing...</span>
      </>
    ) : (
      <>
        <span>Next</span>
        <svg
          className='w-4 h-4'
          fill='none'
          stroke='currentColor'
          viewBox='0 0 24 24'
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth='2'
            d='M9 5l7 7-7 7'
          />
        </svg>
      </>
    )}
  </button>
);
