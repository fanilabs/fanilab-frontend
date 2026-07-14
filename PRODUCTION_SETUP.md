# Production Setup Guide

This guide covers production deployment and configuration for FaniLab Frontend.

## Prerequisites

- Node.js 18+ and npm/yarn
- Deployed Stellar smart contracts
- Freighter wallet extension
- Production Stellar account with XLM

## Environment Configuration

### 1. Create Production Environment File

```bash
cp .env.example .env.production
```

### 2. Configure Production Variables

```env
# Use mainnet for production
NEXT_PUBLIC_STELLAR_NETWORK=mainnet
NEXT_PUBLIC_SOROBAN_RPC_URL=https://soroban.stellar.org
NEXT_PUBLIC_NETWORK_PASSPHRASE=Public Global Stellar Network ; September 2015

# Your deployed contract IDs
NEXT_PUBLIC_ESCROW_CONTRACT_ID=C...
NEXT_PUBLIC_DELIVERY_CONTRACT_ID=C...
NEXT_PUBLIC_DISPUTE_CONTRACT_ID=C...

# Your production API
NEXT_PUBLIC_API_URL=https://api.fanilab.com
```

## Build for Production

```bash
# Install dependencies
npm install

# Run tests
npm run test
npm run test:e2e

# Type check
npm run type-check

# Build
npm run build

# Start production server
npm start
```

## Deployment Options

### Vercel (Recommended)

1. Install Vercel CLI:
```bash
npm install -g vercel
```

2. Deploy:
```bash
vercel --prod
```

3. Set environment variables in Vercel dashboard

### Docker

```dockerfile
FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM node:18-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
COPY --from=builder /app/next.config.js ./
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json

EXPOSE 3000
CMD ["npm", "start"]
```

Build and run:
```bash
docker build -t fanilab-frontend .
docker run -p 3000:3000 --env-file .env.production fanilab-frontend
```

### Traditional Hosting

```bash
npm run build
# Upload .next, public, package.json to your server
npm install --production
npm start
```

## Security Checklist

- [ ] All contract addresses verified
- [ ] Environment variables secured
- [ ] HTTPS enabled
- [ ] CSP headers configured
- [ ] Rate limiting enabled on API
- [ ] Error tracking configured (Sentry)
- [ ] Monitoring setup
- [ ] Backup strategy in place

## Performance Optimization

### Next.js Config

```javascript
// next.config.js
module.exports = {
  reactStrictMode: true,
  swcMinify: true,
  compress: true,
  images: {
    formats: ['image/avif', 'image/webp'],
  },
};
```

### CDN Setup

- Use Vercel Edge Network or CloudFlare CDN
- Enable caching for static assets
- Configure image optimization

## Monitoring

### Recommended Services

- **Error Tracking**: Sentry
- **Analytics**: Vercel Analytics / Google Analytics
- **Performance**: Lighthouse CI
- **Uptime**: UptimeRobot

## Backup and Recovery

### Database Backups
- Regular backups of indexer database
- Off-site backup storage
- Test restore procedures

### Contract State
- Monitor contract state changes
- Maintain audit logs
- Emergency pause mechanism

## Scaling Considerations

### Horizontal Scaling
- Load balancer configuration
- Session management
- Database read replicas

### Caching Strategy
- Redis for API responses
- CDN for static assets
- Browser caching headers

## Maintenance

### Regular Tasks
- Monitor error logs daily
- Review performance metrics weekly
- Update dependencies monthly
- Security audit quarterly

### Incident Response
1. Error detection via monitoring
2. Rollback procedure documented
3. Communication plan in place
4. Post-mortem process

## Support Contacts

- Stellar Discord: https://discord.gg/stellar
- Support Email: support@fanilab.com
- Emergency: [Your emergency contact]
