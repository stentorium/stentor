#!/bin/bash

# Stentor API Documentation Deployment Script
# Deploys documentation to AWS S3 + CloudFront

set -e

# Default configuration
DEFAULT_BUCKET="stentor-api-docs"
DEFAULT_REGION="us-east-1"
DEFAULT_STACK_NAME="stentor-docs"

# Configuration from environment or defaults
BUCKET_NAME="${DOCS_BUCKET:-$DEFAULT_BUCKET}"
AWS_REGION="${AWS_REGION:-$DEFAULT_REGION}"
STACK_NAME="${DOCS_STACK_NAME:-$DEFAULT_STACK_NAME}"
CLOUDFRONT_DISTRIBUTION_ID="${CLOUDFRONT_DISTRIBUTION_ID:-}"

# Paths
REPO_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
WEBSITE_DIR="$REPO_ROOT/website"
BUILD_DIR="$WEBSITE_DIR/build"
DEPLOY_DIR="$(dirname "${BASH_SOURCE[0]}")"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

log() {
    echo -e "${BLUE}[DEPLOY]${NC} $1"
}

success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

error() {
    echo -e "${RED}[ERROR]${NC} $1"
    exit 1
}

show_help() {
    cat << EOF
Stentor API Documentation Deployment Script

Usage: $0 [options]

Options:
    --bucket BUCKET_NAME        S3 bucket name (default: $DEFAULT_BUCKET)
    --region REGION             AWS region (default: $DEFAULT_REGION)
    --stack STACK_NAME          CloudFormation stack name (default: $DEFAULT_STACK_NAME)
    --distribution-id ID        CloudFront distribution ID (auto-detect if not provided)
    --build-first               Build documentation before deploying
    --dry-run                   Show what would be deployed without actually deploying
    --help, -h                  Show this help message

Environment Variables:
    DOCS_BUCKET                 S3 bucket name
    AWS_REGION                  AWS region
    CLOUDFRONT_DISTRIBUTION_ID  CloudFront distribution ID
    DOCS_STACK_NAME             CloudFormation stack name

Examples:
    $0                                          # Deploy with defaults
    $0 --bucket my-docs --region us-west-2     # Deploy to specific bucket/region
    $0 --build-first                           # Build then deploy
    $0 --dry-run                               # Preview deployment

EOF
}

check_dependencies() {
    log "Checking dependencies..."
    
    if ! command -v aws >/dev/null 2>&1; then
        error "AWS CLI is not installed. Please install it and configure credentials."
    fi
    
    # Check AWS credentials
    if ! aws sts get-caller-identity >/dev/null 2>&1; then
        error "AWS credentials not configured. Run 'aws configure' or set environment variables."
    fi
    
    success "Dependencies check passed"
}

validate_build() {
    log "Validating build..."
    
    if [ ! -d "$BUILD_DIR" ]; then
        error "Build directory not found: $BUILD_DIR"
    fi
    
    if [ ! -f "$BUILD_DIR/index.html" ]; then
        error "No index.html found in build directory"
    fi
    
    local file_count=$(find "$BUILD_DIR" -type f | wc -l)
    if [ "$file_count" -lt 10 ]; then
        warning "Very few files in build directory ($file_count). Build may be incomplete."
    fi
    
    success "Build validation passed ($file_count files)"
}

get_distribution_id() {
    if [ -n "$CLOUDFRONT_DISTRIBUTION_ID" ]; then
        log "Using provided CloudFront distribution ID: $CLOUDFRONT_DISTRIBUTION_ID"
        return
    fi
    
    log "Auto-detecting CloudFront distribution ID..."
    
    # Try to get from CloudFormation stack
    CLOUDFRONT_DISTRIBUTION_ID=$(aws cloudformation describe-stacks \
        --stack-name "$STACK_NAME" \
        --region "$AWS_REGION" \
        --query 'Stacks[0].Outputs[?OutputKey==`CloudFrontDistributionId`].OutputValue' \
        --output text 2>/dev/null || echo "")
    
    if [ -n "$CLOUDFRONT_DISTRIBUTION_ID" ] && [ "$CLOUDFRONT_DISTRIBUTION_ID" != "None" ]; then
        success "Found distribution ID from stack: $CLOUDFRONT_DISTRIBUTION_ID"
        return
    fi
    
    # Try to find by S3 origin
    local distributions=$(aws cloudfront list-distributions \
        --query "DistributionList.Items[?Origins.Items[?DomainName==\`$BUCKET_NAME.s3.amazonaws.com\`]].Id" \
        --output text 2>/dev/null || echo "")
    
    if [ -n "$distributions" ]; then
        CLOUDFRONT_DISTRIBUTION_ID=$(echo "$distributions" | head -n1)
        success "Found distribution ID by S3 origin: $CLOUDFRONT_DISTRIBUTION_ID"
        return
    fi
    
    warning "Could not auto-detect CloudFront distribution ID. Cache invalidation will be skipped."
}

sync_to_s3() {
    log "Syncing files to S3..."
    
    local sync_args=(
        --region "$AWS_REGION"
        --delete
        --size-only
        --cache-control "max-age=31536000" # 1 year for most files
    )
    
    if [ "$DRY_RUN" = "true" ]; then
        sync_args+=(--dryrun)
        log "DRY RUN: Would sync to s3://$BUCKET_NAME"
    fi
    
    cd "$BUILD_DIR"
    
    # Sync most files with long cache
    aws s3 sync . "s3://$BUCKET_NAME" "${sync_args[@]}"
    
    # Override cache for HTML files (short cache for content updates)
    local html_args=(
        --region "$AWS_REGION"
        --cache-control "max-age=3600" # 1 hour for HTML
        --content-type "text/html"
        --metadata-directive REPLACE
    )
    
    if [ "$DRY_RUN" = "true" ]; then
        html_args+=(--dryrun)
    fi
    
    # Update HTML files with shorter cache
    find . -name "*.html" -type f | while read -r file; do
        local s3_path="${file#./}"
        aws s3 cp "$file" "s3://$BUCKET_NAME/$s3_path" "${html_args[@]}"
    done
    
    if [ "$DRY_RUN" != "true" ]; then
        success "Files synced to S3"
    else
        success "DRY RUN: Sync preview completed"
    fi
}

invalidate_cloudfront() {
    if [ -z "$CLOUDFRONT_DISTRIBUTION_ID" ]; then
        warning "No CloudFront distribution ID available, skipping invalidation"
        return
    fi
    
    if [ "$DRY_RUN" = "true" ]; then
        log "DRY RUN: Would invalidate CloudFront distribution $CLOUDFRONT_DISTRIBUTION_ID"
        return
    fi
    
    log "Invalidating CloudFront cache..."
    
    local invalidation_id=$(aws cloudfront create-invalidation \
        --distribution-id "$CLOUDFRONT_DISTRIBUTION_ID" \
        --paths "/*" \
        --query 'Invalidation.Id' \
        --output text)
    
    success "CloudFront invalidation created: $invalidation_id"
    log "Invalidation will complete in 5-15 minutes"
}

print_summary() {
    echo
    echo "=================== DEPLOYMENT SUMMARY ==================="
    echo "Bucket: s3://$BUCKET_NAME"
    echo "Region: $AWS_REGION"
    echo "Files Deployed: $(find "$BUILD_DIR" -type f | wc -l)"
    echo "Build Size: $(du -sh "$BUILD_DIR" | cut -f1)"
    
    if [ -n "$CLOUDFRONT_DISTRIBUTION_ID" ]; then
        echo "CloudFront Distribution: $CLOUDFRONT_DISTRIBUTION_ID"
        echo "CDN URL: https://$(aws cloudfront get-distribution \
            --id "$CLOUDFRONT_DISTRIBUTION_ID" \
            --query 'Distribution.DomainName' \
            --output text 2>/dev/null || echo "unknown")"
    fi
    
    echo "S3 Website URL: http://$BUCKET_NAME.s3-website-$AWS_REGION.amazonaws.com"
    echo "Deployment Time: $(date)"
    
    if [ "$DRY_RUN" = "true" ]; then
        echo "Mode: DRY RUN (no changes made)"
    fi
    echo "==========================================================="
}

main() {
    log "Starting Stentor API documentation deployment..."
    
    check_dependencies
    validate_build
    get_distribution_id
    sync_to_s3
    invalidate_cloudfront
    print_summary
    
    if [ "$DRY_RUN" != "true" ]; then
        success "Documentation deployment completed successfully!"
    else
        success "DRY RUN completed successfully!"
    fi
}

# Parse command line arguments
DRY_RUN=false
BUILD_FIRST=false

while [[ $# -gt 0 ]]; do
    case $1 in
        --bucket)
            BUCKET_NAME="$2"
            shift 2
            ;;
        --region)
            AWS_REGION="$2"
            shift 2
            ;;
        --stack)
            STACK_NAME="$2"
            shift 2
            ;;
        --distribution-id)
            CLOUDFRONT_DISTRIBUTION_ID="$2"
            shift 2
            ;;
        --build-first)
            BUILD_FIRST=true
            shift
            ;;
        --dry-run)
            DRY_RUN=true
            shift
            ;;
        --help|-h)
            show_help
            exit 0
            ;;
        *)
            error "Unknown option: $1"
            ;;
    esac
done

# Build first if requested
if [ "$BUILD_FIRST" = "true" ]; then
    log "Building documentation first..."
    "$DEPLOY_DIR/build-docs.sh"
fi

main "$@"