import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { NavButton, type PageIconTypes } from './NavButton';
import type { PageAction, PageActionHandler } from '@/types';

vi.mock('../SettingsDropdown/SettingsDropdown', () => ({
  SettingsDropdown: ({ isOpen, onClose, pageId, pageName }: any) =>
    isOpen ? (
      <div data-testid='settings-dropdown'>
        Settings for {pageName} ({pageId})
        <button onClick={onClose}>Close</button>
      </div>
    ) : null,
}));

describe('NavButton', () => {
  const mockOnClick = vi.fn();
  const mockOnFocus = vi.fn();
  const mockOnDropdownToggle = vi.fn();
  const mockOnPageAction = vi.fn() as PageActionHandler;

  const defaultProps = {
    label: 'Form Introduction',
    icon: 'info' as PageIconTypes,
    onClick: mockOnClick,
  };

  const pageActions: PageAction[] = [
    {
      id: 'rename',
      label: 'Rename Page',
      icon: () => null,
      variant: 'default' as const,
    },
    {
      id: 'delete',
      label: 'Delete Page',
      icon: () => null,
      variant: 'destructive' as const,
      requiresConfirmation: true,
    },
  ];

  const renderNavButton = (props = {}) => {
    return render(<NavButton {...defaultProps} {...props} />);
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('Core Functionality', () => {
    it('renders page button with label and icon', () => {
      renderNavButton();

      expect(screen.getByText('Form Introduction')).toBeInTheDocument();
      expect(screen.getByRole('button')).toBeInTheDocument();
      expect(
        screen.getByRole('button').querySelector('svg')
      ).toBeInTheDocument();
    });

    it('handles page selection', () => {
      renderNavButton();

      fireEvent.click(screen.getByRole('button'));
      expect(mockOnClick).toHaveBeenCalledOnce();
    });

    it('supports focus management', () => {
      renderNavButton({ onFocus: mockOnFocus });

      fireEvent.focus(screen.getByRole('button'));
      expect(mockOnFocus).toHaveBeenCalledOnce();
    });

    it('supports different icon types', () => {
      const iconTypes: PageIconTypes[] = ['info', 'ending', 'plus'];

      iconTypes.forEach((icon) => {
        const { unmount } = renderNavButton({ icon });
        expect(
          screen.getByRole('button').querySelector('svg')
        ).toBeInTheDocument();
        unmount();
      });
    });
  });

  describe('Active State Behavior', () => {
    it('applies active styling when page is selected', () => {
      const { rerender } = renderNavButton();
      const button = screen.getByRole('button');

      // Default state
      expect(button).toHaveClass('bg-gray-50');

      // Active state
      rerender(<NavButton {...defaultProps} isActive={true} />);
      const activeButton = screen.getAllByRole('button')[0]; // Main button
      expect(activeButton).toHaveClass('bg-white');
    });

    it('shows page settings when active', () => {
      renderNavButton({ isActive: true });

      expect(
        screen.getByLabelText('Page settings dropdown')
      ).toBeInTheDocument();
    });

    it('hides page settings when inactive', () => {
      renderNavButton({ isActive: false });

      expect(
        screen.queryByLabelText('Page settings dropdown')
      ).not.toBeInTheDocument();
    });

    it('applies focused styling', () => {
      renderNavButton({ isFocused: true });

      const button = screen.getByRole('button');
      expect(button).toHaveClass('bg-white');
    });
  });

  describe('Settings Dropdown Integration', () => {
    const activePageProps = {
      isActive: true,
      pageId: 'intro-page',
      pageActions,
      onPageAction: mockOnPageAction,
      onDropdownToggle: mockOnDropdownToggle,
    };

    it('opens settings dropdown on click', () => {
      renderNavButton(activePageProps);

      const settingsButton = screen.getByLabelText('Page settings dropdown');
      fireEvent.click(settingsButton);

      expect(mockOnDropdownToggle).toHaveBeenCalledOnce();
    });

    it('prevents event bubbling from settings button', () => {
      renderNavButton(activePageProps);

      const settingsButton = screen.getByLabelText('Page settings dropdown');
      fireEvent.click(settingsButton);

      // Page click should not trigger when clicking settings
      expect(mockOnClick).not.toHaveBeenCalled();
      expect(mockOnDropdownToggle).toHaveBeenCalledOnce();
    });

    it('supports keyboard navigation for settings', () => {
      renderNavButton(activePageProps);

      const settingsButton = screen.getByLabelText('Page settings dropdown');

      fireEvent.keyDown(settingsButton, { key: 'Enter' });
      expect(mockOnDropdownToggle).toHaveBeenCalledTimes(1);

      fireEvent.keyDown(settingsButton, { key: ' ' });
      expect(mockOnDropdownToggle).toHaveBeenCalledTimes(2);

      // Non-activation keys should not trigger
      fireEvent.keyDown(settingsButton, { key: 'Tab' });
      expect(mockOnDropdownToggle).toHaveBeenCalledTimes(2);
    });

    it('renders dropdown when open with page context', () => {
      renderNavButton({
        ...activePageProps,
        isDropdownOpen: true,
      });

      expect(screen.getByTestId('settings-dropdown')).toBeInTheDocument();
      expect(
        screen.getByText('Settings for Form Introduction (intro-page)')
      ).toBeInTheDocument();
    });

    it('handles dropdown close', () => {
      renderNavButton({
        ...activePageProps,
        isDropdownOpen: true,
      });

      fireEvent.click(screen.getByText('Close'));
      expect(mockOnDropdownToggle).toHaveBeenCalledOnce();
    });

    it('only renders dropdown with complete configuration', () => {
      // Missing pageActions
      renderNavButton({
        isActive: true,
        isDropdownOpen: true,
        pageId: 'test',
        onPageAction: mockOnPageAction,
      });
      expect(screen.queryByTestId('settings-dropdown')).not.toBeInTheDocument();

      // Missing pageId
      renderNavButton({
        isActive: true,
        isDropdownOpen: true,
        pageActions,
        onPageAction: mockOnPageAction,
      });
      expect(screen.queryByTestId('settings-dropdown')).not.toBeInTheDocument();
    });
  });

  describe('User Experience', () => {
    it('provides visual feedback on hover for inactive pages', () => {
      renderNavButton();

      const button = screen.getByRole('button');
      const initialBackground = button.style.backgroundColor;

      fireEvent.mouseEnter(button);
      expect(button.style.backgroundColor).not.toBe(initialBackground);

      fireEvent.mouseLeave(button);
      expect(button.style.backgroundColor).toBe(initialBackground);
    });

    it('maintains consistent styling for active pages during hover', () => {
      renderNavButton({ isActive: true });

      const button = screen.getAllByRole('button')[0];
      const activeBackground = button.style.backgroundColor;

      fireEvent.mouseEnter(button);
      expect(button.style.backgroundColor).toBe(activeBackground);
    });

    it('handles custom styling gracefully', () => {
      renderNavButton({ className: 'custom-nav-button' });

      expect(screen.getByRole('button')).toHaveClass('custom-nav-button');
    });

    it('gracefully handles missing optional handlers', () => {
      expect(() => {
        renderNavButton();
        const button = screen.getByRole('button');
        fireEvent.focus(button);
        fireEvent.keyDown(button, { key: 'Enter' });
      }).not.toThrow();
    });
  });

  describe('Edge Cases', () => {
    it('handles empty labels appropriately', () => {
      renderNavButton({ label: '' });

      const button = screen.getByRole('button');
      const labelSpan = button.querySelector('span');

      expect(labelSpan).toBeInTheDocument();
      expect(labelSpan).toHaveTextContent('');
    });

    it('maintains accessibility with long labels', () => {
      const longLabel =
        'This is an extremely long page label that tests text overflow behavior';
      renderNavButton({ label: longLabel });

      const labelSpan = screen.getByText(longLabel);
      expect(labelSpan).toHaveClass('whitespace-nowrap');
    });
  });
});
