# Contributing to PromptLibrary

Thank you for your interest in contributing to PromptLibrary! This is a demo React/TypeScript application that showcases a local AI prompt management interface.

## How to Contribute

### Reporting Issues
If you find a bug or have a suggestion, please open an issue on GitHub. Include:
- A clear description of the problem or suggestion
- Steps to reproduce (if applicable)
- Screenshots (if helpful)
- Your environment (OS, browser, Node version)

### Feature Requests
Feature requests are welcome! Please explain:
- The problem you're trying to solve
- How the feature would work
- Why it would benefit the project

### Pull Requests
1. **Fork the repository** and create a new branch from `main`.
2. **Make your changes** following the existing code style.
3. **Test your changes** by running the app locally (`npm run dev`).
4. **Update documentation** if needed (README, comments).
5. **Submit a pull request** with a clear description of what you changed and why.

## Development Setup

1. Clone your fork:
   ```bash
   git clone https://github.com/your-username/promptlib-v2.git
   cd promptlib-v2
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Code Style

- **TypeScript**: Use strict typing; avoid `any` when possible.
- **Components**: Use functional components with hooks.
- **Styling**: Use Tailwind CSS utility classes; keep custom CSS minimal.
- **Naming**: Use PascalCase for components, camelCase for variables/functions, kebab-case for files.
- **Imports**: Group imports (React, external libraries, internal modules).
- **Formatting**: Use Prettier (if configured) or follow existing indentation (2 spaces).

## Project Structure

```
promptlib-v2/
├── components/     # Reusable UI components
├── pages/         # Page components
├── services/      # Mock services (database, AI)
├── context/       # React context providers
├── types/         # TypeScript type definitions
├── constants/     # Constants and configuration
└── public/        # Static assets
```

## Testing

Currently, the project relies on manual testing. Ensure your changes don't break:
- Navigation between pages
- Creating, editing, deleting prompts
- Authentication flow (mock)
- Responsive design

## License

By contributing, you agree that your contributions will be licensed under the project's MIT License.