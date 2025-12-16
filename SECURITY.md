# Security Policy

## Supported Versions

Only the latest version of PromptLibrary is supported with security updates.

| Version | Supported          |
| ------- | ------------------ |
| 1.x.x   | :white_check_mark: |
| < 1.0   | :x:                |

## Reporting a Vulnerability

If you discover a security vulnerability in PromptLibrary, please report it responsibly.

**Do not open a public issue** for security vulnerabilities.

Instead, please email the maintainer directly at [maintainer-email] (replace with actual contact if known) with the following information:

- Description of the vulnerability
- Steps to reproduce
- Potential impact
- Any suggested fixes (if known)

We will acknowledge receipt within 48 hours and provide a more detailed response within 7 days.

## Security Considerations

This is a **frontend‑only demo application** with the following security characteristics:

### No Real Backend
- Authentication is simulated using localStorage
- No user credentials are transmitted or stored
- No server‑side validation exists

### Client‑Side Data
- All data (prompts, user info) is stored in `localStorage`
- Data is not encrypted and can be accessed/modified by the user
- No protection against XSS beyond React's built‑in escaping

### No External APIs
- The application does not call any real external APIs
- The "AI enhancement" feature is a mock simulation
- No API keys or secrets are required

### Deployment
- When deployed as a static site, the security model is that of a typical SPA
- No server‑side processing means no server‑side attack surface

## Best Practices for Users

If you extend this project with a real backend:

1. **Never commit secrets** – Use environment variables and `.gitignore`
2. **Validate user input** – Both client‑side and server‑side
3. **Use HTTPS** – For all deployments
4. **Implement proper authentication** – Use a proven library/framework
5. **Sanitize user‑generated content** – Prevent XSS

## Disclaimer

This project is provided as a **demo/educational tool**. The maintainers are not responsible for any security incidents resulting from its use in production environments.