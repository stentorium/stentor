# Stentor API Documentation Deployment

This directory contains infrastructure and deployment scripts for the Stentor API documentation website.

## Overview

The documentation system consists of:
- **API Documentation**: Auto-generated from TypeScript using Microsoft API Documenter
- **Docusaurus Website**: Static site generator for the documentation portal
- **AWS Infrastructure**: S3 + CloudFront for hosting and CDN

## Quick Start

### Prerequisites
- Node.js 16+
- Yarn package manager
- AWS CLI configured with appropriate permissions

### Build Documentation
```bash
# From repository root
yarn docs:build
```

### Deploy to AWS
```bash
# Deploy infrastructure (one-time setup)
aws cloudformation create-stack \
  --stack-name stentor-docs \
  --template-body file://deploy/aws-infrastructure.yml \
  --parameters ParameterKey=BucketName,ParameterValue=stentor-api-docs

# Deploy documentation
yarn docs:deploy
```

## Architecture

### Build Process
1. **TypeScript → JSON**: Packages build API JSON metadata
2. **JSON → Markdown**: API Documenter converts to markdown files  
3. **Markdown → Website**: Docusaurus builds static website
4. **Upload**: Deploy script uploads to S3 with CloudFront invalidation

### AWS Resources
- **S3 Bucket**: Hosts static website files
- **CloudFront Distribution**: CDN with global edge locations
- **Cache Strategy**: 
  - HTML files: 1 hour TTL
  - Static assets: 1 year TTL

## Scripts

| Command | Description |
|---------|-------------|
| `yarn docs:build` | Build complete documentation website |
| `yarn docs:deploy` | Deploy to AWS S3/CloudFront |
| `yarn docs:serve` | Serve locally for testing |

## Configuration

### Environment Variables
- `AWS_REGION`: AWS region (default: us-east-1)
- `DOCS_BUCKET`: S3 bucket name
- `CLOUDFRONT_DISTRIBUTION_ID`: CloudFront distribution ID

### Customization
- Edit `website/docusaurus.config.js` for site configuration
- Modify `deploy/build-docs.sh` for build customization
- Update `deploy/aws-infrastructure.yml` for infrastructure changes

## Monitoring

The deployment includes:
- CloudFront access logs
- S3 server access logs  
- Error handling for failed deployments
- Automatic cache invalidation

## Security

- S3 bucket is configured for static website hosting only
- CloudFront serves all traffic over HTTPS
- No sensitive data is included in the documentation build