<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# PromptLibrary - AI Prompt Discovery Platform

A modern, fully functional website for discovering, sharing, and managing AI prompts. Built with React, TypeScript, and Vite.

**Key Features:**
- Browse prompts by category, type, and tags
- View detailed prompt information with copy functionality
- Admin dashboard for managing prompts
- Fully functional without external AI APIs
- Responsive design with dark mode support
- Static website deployment ready

## 🚀 Quick Start

**Prerequisites:** Node.js 18+ and npm

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Run the development server:**
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

## 🔧 Configuration

No API keys or environment variables are required. The application uses mock data and simulated services.

**Demo Accounts:**
- Admin: `admin@promptlib.com` (no password required)
- User: `wizard@promptlib.com` (no password required)

## 📁 Project Structure

```
├── components/     # Reusable UI components
├── pages/         # Page components (Browse, Detail, Admin, etc.)
├── services/      # Mock services (no external APIs)
├── context/       # React context (Authentication)
├── types/         # TypeScript type definitions
└── constants/     # Constants and mock data
```

## 🛠️ Built With

- **React 19** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **React Router 7** - Client-side routing
- **Tailwind CSS** - Styling
- **Lucide React** - Icons

## 📄 License

MIT
