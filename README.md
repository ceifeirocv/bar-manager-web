# Bar Manager Web Application

A modern web application for managing bar operations, built with Next.js 15 and TypeScript. This application provides an intuitive interface for bar management with user authentication, dashboard, and account management.

## Features

- 🍸 **Bar Management Dashboard** - Comprehensive dashboard for bar operations
- 🔐 **User Authentication** - Secure login/signup with Better Auth
- 👤 **Account Management** - User profile and settings management
- 🎨 **Modern UI** - Beautiful interface with Tailwind CSS and Radix UI components
- ⚡ **Fast Development** - Powered by Turbopack for lightning-fast builds
- 📱 **Responsive Design** - Mobile-first responsive design
- 🔧 **Type Safety** - Full TypeScript support throughout

## Tech Stack

- **Framework**: Next.js 15.5.0 with App Router
- **Language**: TypeScript 5
- **Styling**: Tailwind CSS v4 with CSS Variables
- **UI Components**: Radix UI primitives with shadcn/ui
- **Authentication**: Better Auth v1.3.7
- **Forms**: React Hook Form with Zod validation
- **Icons**: Lucide React
- **Package Manager**: PNPM

## Getting Started

### Prerequisites

Make sure you have Node.js (>=18) and PNPM installed on your system.

### Installation

1. Clone the repository
2. Install dependencies:

   ```bash
   pnpm install
   ```

3. Set up environment variables:
   ```bash
   cp .env.example .env
   ```
   Configure your environment variables including `AUTH_API_URL`.

### Development

Run the development server with Turbopack:

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### Other Commands

```bash
# Build for production
pnpm build

# Start production server
pnpm start

# Run linting
pnpm lint
```

## Project Structure

```
src/
├── app/                          # Next.js App Router directory
│   ├── (app)/                   # Route group for authenticated routes
│   │   ├── dashboard/           # Dashboard page
│   │   ├── account/             # Account management page
│   │   └── layout.tsx          # Authenticated layout with sidebar
│   ├── actions/                 # Server actions
│   │   └── auth/               # Authentication actions and types
│   ├── login/                  # Login page
│   ├── globals.css             # Global styles
│   ├── layout.tsx              # Root layout
│   ├── loading.tsx             # Global loading component
│   └── page.tsx                # Home page
├── components/                  # Reusable React components
│   ├── ui/                     # UI component library (shadcn/ui)
│   │   ├── form.tsx           # Form components
│   │   ├── input.tsx          # Input component
│   │   ├── button.tsx         # Button component
│   │   ├── card.tsx           # Card components
│   │   ├── avatar.tsx         # Avatar components
│   │   ├── sidebar.tsx        # Sidebar components
│   │   └── sheet.tsx          # Sheet/drawer components
│   ├── account/                # Account-related components
│   │   └── account-view.tsx   # Account settings view
│   ├── sidebar/                # Sidebar components
│   │   ├── app-sidebar.tsx    # Main application sidebar
│   │   ├── site-header.tsx    # Site header
│   │   └── user/              # User-related sidebar components
│   └── login-form.tsx          # Login form component
├── hooks/                      # Custom React hooks
├── lib/                        # Utility functions and configurations
│   ├── utils.ts               # Utility functions (cn, getInitials)
│   └── rest-client.ts         # API client for REST requests
└── types/                      # TypeScript type definitions
```

## Key Features

### Authentication System

- Username/password authentication
- Server-side session management
- Protected routes with middleware
- Automatic redirects for authenticated/unauthenticated users

### Dashboard

- Modern dashboard layout with sidebar navigation
- Responsive design that works on all devices
- Quick access to key bar management features

### Account Management

- User profile management
- Avatar support with fallback initials
- Account settings and preferences
- Profile picture upload capability

### UI Components

- Built with Radix UI primitives for accessibility
- Styled with Tailwind CSS for consistency
- Custom components following design system principles
- Form validation with React Hook Form and Zod

## Development Notes

- The application uses the **Next.js App Router** for file-based routing
- **Server Actions** are used for form submissions and API calls
- **Authentication** is handled server-side with Better Auth
- **UI components** follow the shadcn/ui pattern with data-slot attributes
- **TypeScript** is configured for strict type checking
- **Turbopack** is used for faster development builds

## Component Architecture

The UI follows a component-first approach:

- **Primitive components** (`Button`, `Input`, `Card`) in `components/ui/`
- **Composite components** (`LoginForm`, `AccountView`) for specific features
- **Layout components** (`Sidebar`, `Header`) for application structure
- **Server components** by default with client components marked with `"use client"`

## API Integration

The application includes:

- REST client for API communication
- File upload functionality
- Error handling and loading states
- Server-side session management

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Make your changes following the existing code style
4. Run tests and linting (`pnpm lint`)
5. Commit your changes (`git commit -m 'Add amazing feature'`)
6. Push to the branch (`git push origin feature/amazing-feature`)
7. Submit a pull request

## Learn More

To learn more about the technologies used in this project:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API
- [Better Auth](https://www.better-auth.com/docs) - authentication library documentation
- [Tailwind CSS](https://tailwindcss.com/docs) - utility-first CSS framework
- [Radix UI](https://www.radix-ui.com/) - low-level UI primitives
- [shadcn/ui](https://ui.shadcn.com/) - re-usable components built with Radix UI
- [React Hook Form](https://react-hook-form.com/) - performant forms with easy validation

## License

This project is licensed under the MIT License - see the LICENSE file for details.
