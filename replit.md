# Mythic Artist Portfolio - Cosmic Artifacts

## Overview
A mythic artist portfolio website featuring a fractal-minimal design aesthetic with cinematic darkness, living constellation navigation, and Shopify compatibility for selling digital art and assets.

## Architecture
- **Frontend**: React + TypeScript with Vite bundler
- **Backend**: Express.js server with in-memory storage
- **Styling**: Tailwind CSS with custom CSS animations
- **Animation**: Framer Motion for complex animations
- **Icons**: Lucide React + react-icons (SiX, SiInstagram, SiDiscord)
- **Routing**: wouter for client-side routing
- **Data Fetching**: TanStack React Query

## Project Structure
```
client/
├── src/
│   ├── components/
│   │   ├── navigation.tsx      # Living constellation navigation
│   │   ├── hero-section.tsx    # Main landing with parallax
│   │   ├── gallery-section.tsx # Artwork gallery with filtering
│   │   ├── media-section.tsx   # Video section with categorization
│   │   ├── shop-section.tsx    # Shopify-ready shop with cart UI
│   │   ├── about-section.tsx   # Covenant/about section
│   │   ├── journal-section.tsx # Blog-style updates
│   │   └── contact-section.tsx # Newsletter + contact form
│   ├── pages/
│   │   ├── home.tsx           # Main landing page
│   │   ├── artwork.tsx        # Individual artwork detail pages
│   │   └── not-found.tsx      # 404 page
│   └── index.css              # Custom CSS with fractal-minimal theme
server/
├── routes.ts                  # API endpoints
├── storage.ts                 # In-memory storage (MemStorage)
└── index.ts                   # Express server setup
shared/
└── schema.ts                  # Zod schemas for validation
```

## Design System
- **Primary**: hsl(280, 80%, 60%) - Cosmic Purple
- **Secondary**: hsl(200, 80%, 60%) - Astral Blue  
- **Accent**: hsl(45, 80%, 60%) - Golden Starlight
- **Background**: hsl(240, 20%, 3%) - Deep Void Black

## Key Features
1. **Living Constellation Navigation**: Orbital navigation with expanding nodes
2. **Gallery**: Artwork filtering by medium (3D Render, Digital Painting, Generative)
3. **Media Section**: Video categorization with YouTube/Vimeo embedding
4. **Shop**: Shopify-ready product listings with cart UI
5. **Individual Artwork Pages**: Detailed view at /artwork/:id
6. **Newsletter & Contact**: Working form submissions via API

## API Endpoints
- `POST /api/newsletter` - Subscribe to newsletter
- `POST /api/contact` - Submit contact form

## Routes
- `/` - Home (all sections)
- `/artwork/:id` - Individual artwork detail page

## Recent Changes
- 2024: Implemented complete fractal-minimal design system
- 2024: Added individual artwork detail pages with wouter routing
- 2024: Migrated social icons to SiX (formerly Twitter), SiInstagram, SiDiscord
- 2024: Added video categorization and filtering
- 2024: Implemented artwork filtering by medium

## Development Notes
- Shop section is Shopify-ready but requires Shopify Buy SDK for live checkout
- Newsletter and contact use in-memory storage (upgrade to DB if needed)
- All animations use Framer Motion for smooth performance
- CSS uses custom properties for theming consistency
