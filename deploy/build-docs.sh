#!/bin/bash

# Stentor API Documentation Build Script
# Builds complete documentation website from TypeScript sources

set -e

# Configuration
REPO_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
API_DIR="$REPO_ROOT/api"
WEBSITE_DIR="$REPO_ROOT/website"
BUILD_DIR="$WEBSITE_DIR/build"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

log() {
    echo -e "${BLUE}[BUILD]${NC} $1"
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

check_dependencies() {
    log "Checking dependencies..."
    
    if ! command -v node >/dev/null 2>&1; then
        error "Node.js is not installed. Please install Node.js 16+ and try again."
    fi
    
    if ! command -v yarn >/dev/null 2>&1; then
        error "Yarn is not installed. Please install Yarn and try again."
    fi
    
    local node_version=$(node --version | cut -d'v' -f2)
    local major_version=$(echo $node_version | cut -d'.' -f1)
    
    if [ "$major_version" -lt 16 ]; then
        error "Node.js version 16+ is required. Current version: $node_version"
    fi
    
    success "Dependencies check passed"
}

install_dependencies() {
    log "Installing dependencies..."
    
    cd "$REPO_ROOT"
    if [ ! -d "node_modules" ]; then
        log "Installing root dependencies..."
        yarn install --frozen-lockfile
    fi
    
    cd "$WEBSITE_DIR"
    if [ ! -d "node_modules" ]; then
        log "Installing website dependencies..."
        yarn install --frozen-lockfile
    fi
    
    success "Dependencies installed"
}

generate_api_docs() {
    log "Generating API documentation..."
    
    cd "$REPO_ROOT"
    
    # Build packages to generate API JSON
    log "Building packages..."
    yarn build 2>/dev/null || {
        warning "Some packages failed to build, continuing..."
    }
    
    # Generate API JSON metadata
    log "Extracting API metadata..."
    yarn api 2>/dev/null || {
        warning "Some API extraction failed, continuing..."
    }
    
    # Convert API JSON to Markdown
    log "Converting API to Markdown..."
    if [ -d "$API_DIR/json" ]; then
        yarn docs
        success "API documentation generated"
    else
        warning "No API JSON found, skipping API docs generation"
    fi
}

build_website() {
    log "Building documentation website..."
    
    cd "$WEBSITE_DIR"
    
    # Clean previous build
    if [ -d "$BUILD_DIR" ]; then
        log "Cleaning previous build..."
        rm -rf "$BUILD_DIR"
    fi
    
    # Build website
    log "Building Docusaurus site..."
    yarn build
    
    if [ ! -d "$BUILD_DIR" ]; then
        error "Build failed - no build directory created"
    fi
    
    local file_count=$(find "$BUILD_DIR" -type f | wc -l)
    success "Website built successfully ($file_count files)"
}

optimize_build() {
    log "Optimizing build..."
    
    cd "$BUILD_DIR"
    
    # Compress HTML files
    if command -v gzip >/dev/null 2>&1; then
        log "Pre-compressing files..."
        find . -type f \( -name "*.html" -o -name "*.css" -o -name "*.js" -o -name "*.json" \) \
            -exec gzip -9 -k {} \;
        success "Files pre-compressed"
    fi
    
    # Generate file manifest
    log "Generating file manifest..."
    find . -type f -name "*.html" | sed 's|^\./||' > "$BUILD_DIR/sitemap.txt"
    
    local html_count=$(find . -name "*.html" | wc -l)
    local asset_count=$(find . -name "*.js" -o -name "*.css" | wc -l)
    
    success "Build optimized: $html_count HTML files, $asset_count assets"
}

validate_build() {
    log "Validating build..."
    
    if [ ! -f "$BUILD_DIR/index.html" ]; then
        error "Missing index.html - build may be incomplete"
    fi
    
    if [ ! -d "$BUILD_DIR/api" ]; then
        warning "No API documentation directory found"
    fi
    
    if [ ! -f "$BUILD_DIR/sitemap.xml" ]; then
        warning "No sitemap.xml generated"
    fi
    
    local size=$(du -sh "$BUILD_DIR" | cut -f1)
    success "Build validation passed (Size: $size)"
}

print_summary() {
    echo
    echo "==================== BUILD SUMMARY ===================="
    echo "Build Directory: $BUILD_DIR"
    echo "Build Size: $(du -sh "$BUILD_DIR" | cut -f1)"
    echo "HTML Files: $(find "$BUILD_DIR" -name "*.html" | wc -l)"
    echo "API Pages: $(find "$BUILD_DIR/api" -name "*.html" 2>/dev/null | wc -l || echo "0")"
    echo "Static Assets: $(find "$BUILD_DIR" -name "*.js" -o -name "*.css" | wc -l)"
    echo
    echo "Next steps:"
    echo "  Local preview: cd website && yarn serve"
    echo "  Deploy to AWS: ./deploy/deploy-docs.sh"
    echo "========================================================"
}

main() {
    log "Starting Stentor API documentation build..."
    
    check_dependencies
    install_dependencies
    generate_api_docs
    build_website
    optimize_build
    validate_build
    print_summary
    
    success "Documentation build completed successfully!"
}

# Handle script arguments
case "${1:-}" in
    --help|-h)
        echo "Usage: $0 [options]"
        echo "Options:"
        echo "  --help, -h    Show this help message"
        echo "  --clean       Clean all build artifacts before building"
        exit 0
        ;;
    --clean)
        log "Cleaning build artifacts..."
        rm -rf "$WEBSITE_DIR/build" "$API_DIR/docs" "$REPO_ROOT/api/json"
        log "Clean completed"
        ;;
esac

main "$@"