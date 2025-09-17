# Bar Manager Web Application

A modern web application for managing bar operations, built with Next.js and TypeScript. This application provides an intuitive interface for bar management with user authentication and a comprehensive dashboard.

## Features

- 🍸 Bar management dashboard
- 🔐 User authentication with Better Auth
- 🎨 Modern UI with Tailwind CSS and Radix UI components
- ⚡ Fast development with Turbopack
- 📱 Responsive design with mobile support

## Tech Stack

- **Framework**: Next.js 15.5.0 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **UI Components**: Radix UI primitives
- **Authentication**: Better Auth
- **Icons**: Lucide React
- **Package Manager**: PNPM

## Getting Started

### Prerequisites

Make sure you have Node.js and PNPM installed on your system.

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   pnpm install
   ```

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
├── app/                    # Next.js App Router directory
│   ├── (app)/             # Route group for authenticated routes
│   │   └── dashboard/     # Dashboard page
│   ├── actions/           # Server actions
│   │   └── auth.ts       # Authentication actions
│   ├── login/            # Login page
│   ├── layout.tsx        # Root layout
│   └── page.tsx          # Home page
├── components/            # Reusable React components
│   ├── ui/               # UI component library
│   └── login-form.tsx    # Login form component
└── lib/                  # Utility functions and configurations
    ├── rest-client.ts    # API client
    └── utils.ts          # Utility functions
```

## Development Notes

- The application uses the Next.js App Router for routing
- Authentication is handled by Better Auth
- UI components are built with Radix UI primitives and styled with Tailwind CSS
- The project uses Turbopack for faster builds and development
- TypeScript is configured for type safety

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run tests and linting
5. Submit a pull request

## Learn More

To learn more about the technologies used in this project:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API
- [Better Auth](https://www.better-auth.com/docs) - authentication library documentation
- [Tailwind CSS](https://tailwindcss.com/docs) - utility-first CSS framework
- [Radix UI](https://www.radix-ui.com/) - low-level UI primitives
