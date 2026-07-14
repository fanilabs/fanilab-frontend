# Security Policy

## Supported Versions

| Version | Supported          |
| ------- | ------------------ |
| 1.0.x   | :white_check_mark: |
| < 1.0   | :x:                |

## Security Best Practices

### Smart Contract Interactions

1. **Transaction Simulation**: All transactions are simulated before signing
2. **User Confirmation**: Users must approve all blockchain transactions via Freighter
3. **Input Validation**: All inputs are validated before submission
4. **Error Handling**: Comprehensive error handling prevents information leakage

### Wallet Security

- Never stores private keys
- Uses Freighter wallet for all signing operations
- Validates network before each transaction
- Session-based address storage (cleared on disconnect)

### Data Protection

- No sensitive data in localStorage beyond public addresses
- XSS protection via React's built-in escaping
- CSRF protection on API endpoints
- Rate limiting on sensitive operations

### API Security

```typescript
// All API calls include proper headers
headers: {
  'Content-Type': 'application/json',
  // Add authentication headers as needed
}
```

### Environment Variables

Never commit:
- Private keys
- Contract admin credentials
- API secrets
- Database credentials

### Dependencies

- Regular security audits via `npm audit`
- Automated updates via Dependabot
- Only use well-maintained packages

## Reporting a Vulnerability

**Please do not report security vulnerabilities through public GitHub issues.**

Instead, please report them via email to: security@fanilab.com

Include:
- Description of the vulnerability
- Steps to reproduce
- Potential impact
- Suggested fix (if any)

### What to Expect

- **Initial Response**: Within 48 hours
- **Status Update**: Within 7 days
- **Fix Timeline**: Depends on severity

### Bug Bounty

We currently do not offer a bug bounty program but greatly appreciate responsible disclosure.

## Security Measures Implemented

### Frontend

- [x] Input validation (Zod schemas)
- [x] XSS protection (React escaping)
- [x] HTTPS enforcement
- [x] Secure headers configuration
- [x] CSP headers (configure in next.config.js)
- [x] No inline scripts
- [x] Error boundary components

### Smart Contract Integration

- [x] Transaction simulation before signing
- [x] Gas estimation
- [x] Network validation
- [x] Amount validation
- [x] Address validation
- [x] Timeout handling

### State Management

- [x] Zustand for predictable state
- [x] No sensitive data in client state
- [x] Automatic session cleanup
- [x] Secure persisted state

### Error Handling

- [x] Never expose internal errors to users
- [x] Comprehensive logging (server-side only)
- [x] User-friendly error messages
- [x] Error tracking integration ready

## Audit History

| Date | Auditor | Findings | Status |
|------|---------|----------|--------|
| TBD  | TBD     | TBD      | Pending |

## Security Checklist for Deployment

### Pre-Deployment

- [ ] All dependencies updated and audited
- [ ] Environment variables configured correctly
- [ ] No secrets in codebase
- [ ] HTTPS certificate valid
- [ ] Security headers configured
- [ ] Rate limiting enabled
- [ ] Monitoring setup

### Post-Deployment

- [ ] Verify contract addresses
- [ ] Test wallet connection
- [ ] Test transaction flow
- [ ] Monitor error rates
- [ ] Verify analytics
- [ ] Document deployment

## Contact

- Security Team: security@fanilab.com
- General Contact: contact@fanilab.com

## References

- [OWASP Top 10](https://owasp.org/www-project-top-ten/)
- [Stellar Security Guidelines](https://developers.stellar.org/docs/learn/security)
- [Next.js Security](https://nextjs.org/docs/app/building-your-application/configuring/security-headers)
