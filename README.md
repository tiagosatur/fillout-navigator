# Fillout Navigator

A React TypeScript application built with Vite for navigating and managing Fillout forms.

![fillout](https://github.com/user-attachments/assets/6ac0f886-c6b8-4576-a172-6fb8f5076c6f)

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- pnpm (recommended) or npm

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd fillout-navigator

# Install dependencies
pnpm install
```

### Development

```bash
# Start development server
pnpm dev

# Build for production
pnpm build

# Preview production build
pnpm preview
```

## 🏗️ Project Structure

```
src/
├── components/     # Reusable React components
├── hooks/         # Custom React hooks
├── pages/         # Page-level components
├── styles/        # Global styles and theme
├── test/          # Test setup and utilities
├── types/         # TypeScript type definitions
├── utils/         # Utility functions and helpers
└── assets/        # Static assets
```

See `src/README.md` for detailed documentation of the project structure.

## 🛠️ Tech Stack

- **React 19** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **Vitest** - Testing framework
- **@testing-library** - Testing utilities
- **@dnd-kit** - Drag and drop functionality
- **Lucide React** - Icon library
- **ESLint** - Code linting
- **pnpm** - Package manager

## 📝 Available Scripts

- `pnpm dev` - Start development server
- `pnpm build` - Build for production
- `pnpm preview` - Preview production build
- `pnpm lint` - Run ESLint
- `pnpm test` - Run tests in watch mode
- `pnpm test:ui` - Run tests with UI interface
- `pnpm test:run` - Run tests once
- `pnpm deploy` - Build and prepare for deployment

## Decisions
I chose Tailwind for speed and visual fidelity to the Figma, extracting a few component classes via @layer for readability. Where utilities weren’t ideal (menu animation + caret), I added a small CSS file to show raw CSS fluency.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run tests and linting
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.
