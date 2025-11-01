# Meridian Pay

A modern cross-border payment platform for sending money from Singapore to Southeast Asia.

## Overview

Meridian Pay streamlines international money transfers with real-time exchange rates, transparent fees, and comprehensive payment tracking. Built for individuals and businesses sending money from Singapore to the Philippines and Malaysia.

## Features

- **Cross-Border Payments**: Send SGD to PHP (Philippines) and MYR (Malaysia)
- **Real-Time Rates**: Live exchange rates with transparent fee breakdown
- **Beneficiary Management**: Save and manage recipient information
- **Payment Tracking**: Monitor payment status from quote to delivery
- **Dashboard Analytics**: View payment volume, fees, and performance metrics
- **Payment History**: Complete transaction history with detailed status tracking

## Tech Stack

- **Frontend**: React 18 + TypeScript
- **Build Tool**: Vite
- **UI Framework**: shadcn/ui + Tailwind CSS
- **Routing**: React Router v6
- **State Management**: Zustand
- **Forms**: React Hook Form + Zod
- **Charts**: Recharts

## Getting Started

### Prerequisites

- Node.js 18+ (or Bun runtime)
- npm, yarn, or bun package manager

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

The app will be available at `http://localhost:5173`

### Available Scripts

```bash
npm run dev        # Start development server
npm run build      # Build for production
npm run preview    # Preview production build
npm run lint       # Run ESLint
```

## Project Structure

```
src/
├── components/     # Reusable UI components
├── pages/          # Page components (Dashboard, Payments, etc.)
├── lib/            # Utility functions (fees, rates, utils)
├── store/          # Zustand state management
├── types/          # TypeScript type definitions
└── hooks/          # Custom React hooks
```
