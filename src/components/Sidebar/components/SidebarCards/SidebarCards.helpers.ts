import {
  Type,
  Mail,
  Phone,
  MessageSquare,
  CheckSquare,
  Circle,
  ToggleLeft,
  Star,
  Upload,
  Calendar,
  Clock,
  Globe,
  Hash,
  FileText,
  Signature,
} from 'lucide-react';
// Form field data with icons, labels, and colors
export const frequentlyUsedFields = [
  {
    icon: Type,
    label: 'Short text',
    iconColor: 'text-blue-600',
    backgroundColor: 'bg-blue-100',
  },
  {
    icon: Mail,
    label: 'Email',
    iconColor: 'text-blue-600',
    backgroundColor: 'bg-blue-100',
  },
  {
    icon: Phone,
    label: 'Phone number',
    iconColor: 'text-blue-600',
    backgroundColor: 'bg-blue-100',
  },
  {
    icon: MessageSquare,
    label: 'Long text',
    iconColor: 'text-blue-600',
    backgroundColor: 'bg-blue-100',
  },
  {
    icon: CheckSquare,
    label: 'Multiple choice',
    iconColor: 'text-blue-600',
    backgroundColor: 'bg-blue-100',
  },
];

export const choiceFields = [
  {
    icon: CheckSquare,
    label: 'Multiple choice',
    iconColor: 'text-purple-600',
    backgroundColor: 'bg-purple-100',
  },
  {
    icon: Circle,
    label: 'Single choice',
    iconColor: 'text-purple-600',
    backgroundColor: 'bg-purple-100',
  },
  {
    icon: ToggleLeft,
    label: 'Yes/No',
    iconColor: 'text-purple-600',
    backgroundColor: 'bg-purple-100',
  },
  {
    icon: Star,
    label: 'Rating',
    iconColor: 'text-purple-600',
    backgroundColor: 'bg-purple-100',
  },
  {
    icon: Upload,
    label: 'File upload',
    iconColor: 'text-purple-600',
    backgroundColor: 'bg-purple-100',
  },
  {
    icon: Signature,
    label: 'Signature',
    iconColor: 'text-purple-600',
    backgroundColor: 'bg-purple-100',
  },
  {
    icon: Hash,
    label: 'Number',
    iconColor: 'text-purple-600',
    backgroundColor: 'bg-purple-100',
  },
  {
    icon: Globe,
    label: 'Website URL',
    iconColor: 'text-purple-600',
    backgroundColor: 'bg-purple-100',
  },
  {
    icon: FileText,
    label: 'Statement',
    iconColor: 'text-purple-600',
    backgroundColor: 'bg-purple-100',
  },
];

export const timeFields = [
  {
    icon: Calendar,
    label: 'Date',
    iconColor: 'text-green-600',
    backgroundColor: 'bg-green-100',
  },
  {
    icon: Clock,
    label: 'Time',
    iconColor: 'text-green-600',
    backgroundColor: 'bg-green-100',
  },
];

export const filterFields = (
  fields: typeof frequentlyUsedFields,
  searchTerm: string
) => {
  if (!searchTerm.trim()) return fields;
  return fields.filter((field) =>
    field.label.toLowerCase().includes(searchTerm.toLowerCase())
  );
};
