# Local Development Guide

## Getting the Code

### Option 1: Download from Replit
1. In Replit, click the three dots menu (⋮) at the top
2. Select "Download as zip"
3. Extract the zip file on your local machine

### Option 2: Clone from GitHub (after pushing)
```bash
git clone https://github.com/graphanic/cosmic-artifacts-portfolio.git
cd cosmic-artifacts-portfolio
```

## Setting Up Locally

### Prerequisites
- Node.js 18+ installed
- npm or pnpm

### Installation
```bash
# Install dependencies
npm install

# Start the development server
npm run dev
```

The app will run on `http://localhost:5000`

## Pushing to GitHub

If you downloaded from Replit, initialize git and push:

```bash
cd cosmic-artifacts-portfolio

# Initialize git (if not already)
git init

# Add all files
git add .

# Commit
git commit -m "Initial commit - Cosmic Artifacts Portfolio"

# Add GitHub remote
git remote add origin https://github.com/graphanic/cosmic-artifacts-portfolio.git

# Push to GitHub
git push -u origin main
```

## Project Structure

```
├── client/           # React frontend
│   ├── src/
│   │   ├── components/   # UI components
│   │   ├── pages/        # Page components
│   │   └── index.css     # Global styles & animations
├── server/           # Express backend
│   ├── routes.ts     # API endpoints
│   └── storage.ts    # Data storage
├── shared/           # Shared types/schemas
└── package.json
```

## Key Features

- **Cursor particle trails** - Neon particles follow your mouse
- **Storm Mode toggle** - Switch between chaos and calm
- **Loading screen** - Artistic loading experience
- **Sound design** - Ambient drones (muted by default)
- **Easter eggs** - Konami code and hidden secrets
- **Gallery with filters** - Artwork filtering by medium
- **Glitch effects** - CSS-based glitch animations

## Environment Variables

No environment variables required for basic development.

For production with Shopify integration, add:
- `SHOPIFY_DOMAIN` - Your Shopify store domain
- `SHOPIFY_STOREFRONT_TOKEN` - Storefront API token

## Tips

- The app binds to port 5000 by default
- All animations respect `prefers-reduced-motion`
- Sound is muted by default (opt-in)
