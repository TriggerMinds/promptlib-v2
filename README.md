# PromptLibrary - AI Prompt Discovery Platform

<div align="center">

![PromptLibrary Banner](./images/banner.jpeg)

[![React](https://img.shields.io/badge/React-19.2.3-61DAFB?logo=react&logoColor=white)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8.2-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-7.3.0-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/)
[![React Router](https://img.shields.io/badge/React_Router-7.10.1-CA4245?logo=reactrouter&logoColor=white)](https://reactrouter.com/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4.0-06B6D4?logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![No External APIs](https://img.shields.io/badge/No_External_APIs-Self--contained-green)](https://github.com)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

A modern demo application for discovering and managing AI prompts locally. Built with React, TypeScript, and Vite.

</div>

## ✨ Features

### 🎯 Core Functionality
- **Browse Prompts** - Explore prompts by category, type, and tags with advanced filtering
- **Prompt Details** - View comprehensive prompt information with copy-to-clipboard functionality
- **Search & Filter** - Real-time search with category, type, and sorting options
- **Dark/Light Mode** - Full theme support with system preference detection
- **Responsive Design** - Optimized for all device sizes

### 👥 User Management
- **Mock Authentication** - Simulated login with user/admin roles (no real backend)
- **Admin Dashboard** - Create, read, update, delete operations for prompt management
- **Role-based Access** - Admin vs user permissions
- **Demo Accounts** - Pre-configured admin and user accounts for testing

### 🛠️ Technical Features
- **No External APIs** - Fully functional with mock data and services
- **Local Storage** - Persistent data across sessions
- **Type Safety** - Comprehensive TypeScript definitions
- **Modern Stack** - React 19, Vite, Tailwind CSS, React Router 7

## ⚠️ Limitations
This is a **demo application** with the following limitations:
- **No real backend** – Authentication and data storage are simulated using localStorage
- **Single-user experience** – Data is stored locally and not shared across devices/users
- **No real AI integration** – The "AI enhancement" feature is a mock simulation
- **No user registration** – Only pre‑configured demo accounts are available

If you need a production‑ready platform with real user authentication, cloud database, and AI API integration, consider extending this project with a backend (e.g., Supabase, Firebase) and integrating a real LLM provider.

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ and npm/yarn/pnpm

### Installation & Running

1. **Clone and install dependencies:**
   ```bash
   git clone <repository-url>
   cd promptlib-v2
   npm install
   ```

2. **Start the development server:**
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) in your browser.

3. **Build for production:**
   ```bash
   npm run build
   ```

4. **Preview the production build:**
   ```bash
   npm run preview
   ```

## 📋 Demo Accounts

The application includes pre-configured demo accounts for testing:

| Email | Password | Role | Access |
|-------|----------|------|--------|
| `admin@promptlib.com` | (none required) | Admin | Full admin dashboard access |
| `wizard@promptlib.com` | (none required) | User | Standard user permissions |

> **Note:** This is a mock authentication system. Simply enter the email address to log in.

## 🏗️ Project Structure

```
promptlib-v2/
├── components/           # Reusable UI components
│   ├── CreatePromptModal.tsx
│   ├── Footer.tsx
│   ├── Header.tsx
│   ├── PromptCard.tsx
│   └── PromptOfTheDay.tsx
├── pages/               # Page components
│   ├── AdminDashboard.tsx
│   ├── CategoriesPage.tsx
│   ├── LoginPage.tsx
│   ├── NotFoundPage.tsx
│   ├── PromptBrowsePage.tsx
│   ├── PromptDetailPage.tsx
│   └── TagsPage.tsx
├── services/            # Mock services
│   ├── geminiService.ts  # Mock AI service (simulated, no external APIs)
│   └── mockDb.ts         # Local storage database
├── context/             # React context providers
│   └── AuthContext.tsx  # Authentication context
├── types/               # TypeScript type definitions
├── constants/           # Constants and configuration
├── public/              # Static assets
└── root files          # Configuration files
```

## 🔧 Key Components

### Prompt Management
- **PromptBrowsePage** - Main landing page with filtering and search
- **PromptDetailPage** - Detailed view with copy functionality
- **PromptCard** - Card component for displaying prompts in grid
- **CreatePromptModal** - Form for creating new prompts

### Admin Features
- **AdminDashboard** - Full administrative interface
- **Prompt Management** - Create, read, update, delete operations
- **Feature Toggle** - Mark prompts as featured
- **Statistics** - View usage metrics

### UI Components
- **Header** - Navigation with theme toggle and user menu
- **Footer** - Site footer with links
- **PromptOfTheDay** - Hero section showcasing featured prompts

## 🎨 Styling & Design

The application uses **Tailwind CSS** with a custom design system:

- **Color Palette**: Primary blue (#2563eb) with semantic colors
- **Typography**: Inter font family with responsive scales
- **Dark Mode**: Full support with localStorage persistence
- **Components**: Custom-styled components with consistent spacing
- **Animations**: Smooth transitions and hover effects

## 📊 Data Management

### Mock Database
The application uses a simulated database with localStorage persistence:

- **In-memory storage** with localStorage backup
- **CRUD operations** for prompts, categories, and users
- **Search and filtering** with multiple criteria
- **Statistics tracking** (view counts, copy counts)

### Data Models
```typescript
interface Prompt {
  id: number;
  title: string;
  description: string;
  prompt_type: 'Text' | 'Image' | 'Code' | 'Hybrid';
  category_id: number;
  tags: string[];
  view_count: number;
  copy_count: number;
  is_featured: boolean;
  is_published: boolean;
  // ... additional fields
}
```

## 🌐 Deployment

This is a static Single Page Application (SPA) that can be deployed to any static hosting service:

### **Vercel** (Recommended)
1. Push your code to GitHub/GitLab/Bitbucket
2. Import the repository to Vercel
3. Vercel will automatically detect the Vite project and deploy it

### **Netlify**
1. Drag and drop the `dist` folder to Netlify
2. Or connect your Git repository and set build command to `npm run build`

### **GitHub Pages**
1. Update `vite.config.ts` base path if needed
2. Run `npm run build`
3. Deploy the `dist` folder to GitHub Pages

### **Static Hosting**
- The built files are in the `dist` directory
- Upload the entire `dist` folder to any web server (Apache, Nginx, etc.)

## 🛠️ Development

### Available Scripts
- `npm run dev` - Start development server with hot reload
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally

### Configuration
No API keys or environment variables are required. The application is fully self-contained with mock data.

### Adding New Features
1. Add TypeScript definitions in `types.ts`
2. Create components in `components/` or pages in `pages/`
3. Update mock services in `services/` if needed
4. Add routing in `App.tsx`

## 🧪 Testing

The application includes comprehensive mock data for testing:

- **Sample Prompts**: Business, coding, creative, and AI agent prompts
- **Categories**: Academic, Business, Coding, Creative, Data Analysis, Marketing, AI Agents
- **Tags**: Various tags for filtering and discovery

## 📚 Technology Stack

| Technology | Purpose | Version |
|------------|---------|---------|
| **React** | UI Library | ^19.2.3 |
| **TypeScript** | Type Safety | ~5.8.2 |
| **Vite** | Build Tool & Dev Server | ^7.3.0 |
| **React Router** | Client-side Routing | ^7.10.1 |
| **Tailwind CSS** | Styling | CDN 3.4.0 |
| **Lucide React** | Icons | ^0.561.0 |
| **LocalStorage** | Data Persistence | Native |

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Built with modern web technologies
- Inspired by the need for better AI prompt organization
- Thanks to the open-source community for amazing tools and libraries

---

<div align="center">

**PromptLibrary** - Making AI prompt discovery simple and accessible

</div>
