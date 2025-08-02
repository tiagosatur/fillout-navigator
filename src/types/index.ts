export interface BaseButtonProps {
  onClick: () => void;
  className?: string;
}

// Command pattern for dropdown actions
export interface PageAction {
  id: string;
  label: string;
  icon: React.ComponentType<{ size?: number; color?: string }>;
  variant?: 'default' | 'destructive';
  requiresConfirmation?: boolean;
  confirmationMessage?: string;
  separator?: boolean;
}

export type PageActionHandler = (pageId: string, actionId: string) => void;
