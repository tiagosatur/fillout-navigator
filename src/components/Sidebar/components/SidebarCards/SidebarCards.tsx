import { SidebarSection } from '@/components/Sidebar/components/SidebarSection/SidebarSection';
import { SidebarCard } from '@/components/Sidebar/components/SidebarCard/SidebarCard';
import {
  choiceFields,
  filterFields,
  frequentlyUsedFields,
  timeFields,
} from './SidebarCards.helpers';

interface SidebarCardsProps {
  searchTerm: string;
}

export default function SidebarCards({ searchTerm }: SidebarCardsProps) {
  const handleCardClick = (label: string) => {
    console.log(`Adding ${label} field`);
  };

  const filteredFrequentlyUsed = filterFields(frequentlyUsedFields, searchTerm);
  const filteredChoices = filterFields(choiceFields, searchTerm);
  const filteredTime = filterFields(timeFields, searchTerm);

  // Check if we have any results
  const hasResults =
    filteredFrequentlyUsed.length > 0 ||
    filteredChoices.length > 0 ||
    filteredTime.length > 0;

  // If searching and no results found
  if (searchTerm.trim() && !hasResults) {
    return (
      <div className='text-center py-8'>
        <div className='text-gray-400 mb-2'>
          <svg
            className='h-12 w-12 mx-auto'
            fill='none'
            stroke='currentColor'
            viewBox='0 0 24 24'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth='1'
              d='M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z'
            />
          </svg>
        </div>
        <p className='text-gray-500 text-sm'>
          No fields found for "{searchTerm}"
        </p>
      </div>
    );
  }

  return (
    <>
      {filteredFrequentlyUsed.length > 0 && (
        <SidebarSection title='Frequently used'>
          <div className='grid grid-cols-2 gap-3 mb-6'>
            {filteredFrequentlyUsed.slice(0, 2).map((field, index) => (
              <SidebarCard
                key={index}
                icon={field.icon}
                label={field.label}
                iconColor={field.iconColor}
                backgroundColor={field.backgroundColor}
                onClick={() => handleCardClick(field.label)}
              />
            ))}
          </div>
          {filteredFrequentlyUsed.length > 2 && (
            <div className='grid grid-cols-3 gap-2'>
              {filteredFrequentlyUsed.slice(2).map((field, index) => (
                <SidebarCard
                  key={index + 2}
                  icon={field.icon}
                  label={field.label}
                  iconColor={field.iconColor}
                  backgroundColor={field.backgroundColor}
                  onClick={() => handleCardClick(field.label)}
                />
              ))}
            </div>
          )}
        </SidebarSection>
      )}

      {filteredChoices.length > 0 && (
        <SidebarSection title='Choices'>
          <div className='grid grid-cols-3 gap-2'>
            {filteredChoices.map((field, index) => (
              <SidebarCard
                key={index}
                icon={field.icon}
                label={field.label}
                iconColor={field.iconColor}
                backgroundColor={field.backgroundColor}
                onClick={() => handleCardClick(field.label)}
              />
            ))}
          </div>
        </SidebarSection>
      )}

      {filteredTime.length > 0 && (
        <SidebarSection title='Time'>
          <div className='grid grid-cols-2 gap-2'>
            {filteredTime.map((field, index) => (
              <SidebarCard
                key={index}
                icon={field.icon}
                label={field.label}
                iconColor={field.iconColor}
                backgroundColor={field.backgroundColor}
                onClick={() => handleCardClick(field.label)}
              />
            ))}
          </div>
        </SidebarSection>
      )}
    </>
  );
}
