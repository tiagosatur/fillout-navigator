# Project Structure

This directory contains the source code for the Fillout Navigator application.

## Folder Structure

- **`components/`** - Reusable React components
  - Use for UI components that can be reused across the application
  - Each component should have its own folder with component file and optional styles

- **`utils/`** - Utility functions and helpers
  - Pure functions for data manipulation, formatting, validation, etc.
  - No side effects, easily testable

- **`hooks/`** - Custom React hooks
  - Reusable logic that can be shared between components
  - Follow React hooks naming convention (use*)

- **`types/`** - TypeScript type definitions
  - Interfaces, types, and enums used throughout the application
  - Centralized type definitions for better maintainability

- **`services/`** - API calls and external integrations
  - Functions for communicating with external APIs
  - Data fetching, authentication, etc.

- **`pages/`** - Page-level components
  - Top-level components that represent entire pages/routes
  - Usually contain multiple components and handle page-specific logic

- **`styles/`** - Global styles and theme
  - CSS modules, styled-components, or global styles
  - Theme configuration and design tokens

## Import Conventions

Use the index files in each folder for clean imports:

```typescript
// Good - clean imports
import { Button } from '@/components';
import { formatDate } from '@/utils';
import { useLocalStorage } from '@/hooks';

// Avoid - direct file imports
import Button from '@/components/Button/Button';
``` 