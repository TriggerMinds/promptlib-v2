# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added
- Edit functionality for prompts in Admin Dashboard
- Limitations section in README for transparency
- CONTRIBUTING.md and CHANGELOG.md files
- .env.example file for future environment variables

### Changed
- Updated README tagline to reflect demo nature
- Adjusted feature list to be honest about mock authentication
- Fixed category inconsistency between constants and mock database
- Removed console.error statements from components

### Fixed
- Missing updatePrompt method in mockDb service
- Category mismatch in constants.ts (now matches SEED_CATEGORIES)

## [1.0.0] - 2025-12-16

### Initial Release
- Basic CRUD operations for AI prompts
- Mock authentication with user/admin roles
- Admin dashboard with statistics
- Browse, search, and filter prompts
- Dark/light theme toggle
- Responsive design with Tailwind CSS
- LocalStorage persistence
- TypeScript for type safety
- Vite build tooling