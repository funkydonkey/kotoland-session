# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**Семейная Стратегическая Сессия 2026** - Interactive web application for conducting family strategic planning sessions for 2026. The application helps families focus on shared values, set collaborative goals, and track them throughout the year with AI-powered goal generation.

**Tech Stack**: React 19 + TypeScript, React Router v7, Tailwind CSS 4, Vite, OpenAI API (gpt-4o-mini)

## Common Commands

```bash
# Development
npm install          # Install dependencies
npm run dev          # Start dev server (http://localhost:5173)
npm run build        # Build for production (outputs to dist/)
npm run preview      # Preview production build locally

# Linting
npm run lint         # Run ESLint on the project
```

## Project Structure

The application has three main pages connected via React Router:

1. **InvitationPage** (`/`) - Landing page describing session goals and preparation requirements
2. **WorkspacePage** (`/workspace`) - Main working page with 6 discussion blocks (Retrospective, Family, Career, Home, Health, Travel)
3. **ResultsPage** (`/results`) - Summary page with AI-generated goals based on session data

### Architecture Patterns

**Data Flow**:
- `storage.ts` handles all localStorage operations (save/load/export)
- `openai.ts` integrates OpenAI API for goal generation with automatic fallback to mock data
- `SessionBlock` component is the reusable building block for all discussion topics
- All session data follows the `SessionData` type structure defined in `types/index.ts`

**Storage Strategy**:
- No backend or database - everything stored in browser localStorage under key `strategySessionData`
- Auto-save on every change in WorkspacePage to prevent data loss
- Export/import functionality through JSON files
- Data structure includes 6 predefined blocks with questions hardcoded in `storage.ts:createEmptySessionData()`

**AI Integration**:
- OpenAI API key read from `import.meta.env.VITE_OPENAI_API_KEY` at runtime
- Graceful degradation: if API key missing or API fails, falls back to `generateMockGoals()`
- API prompt instructs to respond in Russian with structured JSON format
- Response parsing extracts JSON from markdown code blocks if needed
- Uses gpt-4o-mini model for cost efficiency

**Routing**:
- Base path configured as `/` in `vite.config.ts` (Render.com deployment)
- Router no longer uses `basename` prop (removed for Render compatibility)
- All invalid routes redirect to home page via catch-all route

**Design System**:
- Minimalist design inspired by warm neutral aesthetics
- Color palette: `#faf8f5` (background), `#111827` (text), `#3b82f6` (accent blue)
- Serif fonts for headings (`font-serif` class)
- Generous spacing with padding-8, padding-10, padding-20
- Subtle borders (`border-[#e5e3e0]`) with hover effects
- Smooth transitions (200ms duration) on interactive elements

## Environment Variables

Create `.env` file in project root:

```env
VITE_OPENAI_API_KEY=your-openai-api-key-here
```

**Important**:
- `.env` is gitignored - never commit API keys
- For Render.com deployment, add `VITE_OPENAI_API_KEY` to environment variables in Render dashboard
- Application works without API key (uses mock generation) but won't provide personalized AI insights

## Deployment

**Target**: Render.com (changed from GitHub Pages)

**Configuration**:
- `render.yaml` - Automated deployment configuration
- Build Command: `npm install && npm run build`
- Publish Directory: `dist`
- Requires `VITE_OPENAI_API_KEY` environment variable

**Manual Deploy**:
1. Create Static Site on Render.com
2. Connect GitHub repository
3. Configure build settings (command + directory)
4. Add environment variable
5. Render auto-deploys on push to main

See `DEPLOY_RENDER.md` for detailed instructions.

## Key Implementation Details

### Session Blocks
Each of the 6 blocks is hardcoded in `createEmptySessionData()`:
- `retrospective` - Ретроспектива 2025 (40 min)
- `family` - Семья и Ребенок (45 min)
- `career` - Карьера и Профессиональное Развитие (40 min)
- `home` - Жилье и Быт (30 min)
- `health` - Здоровье и Личное Развитие (35 min)
- `travel` - Путешествия и Досуг (30 min)

To modify questions or blocks, edit `src/utils/storage.ts:createEmptySessionData()`.

### AI Goal Generation
- Triggered on ResultsPage load
- Sends all block answers as concatenated summary to OpenAI
- Expected response format: `{ mainGoals: [], categoryGoals: {}, actionItems: [] }`
- All content in Russian per system prompt
- Mock fallback provides generic goals if API unavailable

### Auto-save Behavior
- WorkspacePage saves to localStorage on every `handleAnswerChange` call
- No explicit "save" button needed - automatic persistence
- Users can export to JSON for backup/sharing

### State Management
No Redux/Zustand/Context - state managed through:
- localStorage for persistence
- React component state for UI updates
- Load data on mount, save on every change

### Styling
- Tailwind CSS 4 with custom configuration in `tailwind.config.js`
- Global styles in `src/index.css`
- Component-specific styles use utility classes
- Responsive design with `md:` breakpoints
- Hover states for interactive feedback

## Common Issues

### Build Errors
- Check for unused variables (TypeScript strict mode enabled)
- Ensure all imports are correct
- Run `npm run lint` to catch issues early

### API Key Not Working
- Verify `.env` file exists and is not gitignored locally
- Check variable name is exactly `VITE_OPENAI_API_KEY`
- Restart dev server after changing `.env`

### localStorage Not Persisting
- Check browser storage limits (usually 5-10MB)
- Ensure localStorage is enabled in browser
- Data is domain-specific - won't transfer between localhost and production
