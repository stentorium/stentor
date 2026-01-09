#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const packagesDir = path.join(__dirname, 'packages');
const results = [];
const depSizes = new Map();
const depUsage = new Map();

// Get package size from npm
function getPackageSize(pkgName) {
  if (depSizes.has(pkgName)) {
    return depSizes.get(pkgName);
  }

  try {
    const output = execSync(`npm view ${pkgName} dist.unpackedSize 2>/dev/null || echo "0"`, {
      encoding: 'utf8',
      timeout: 5000
    }).trim();

    const size = parseInt(output) || 0;
    depSizes.set(pkgName, size);
    return size;
  } catch (e) {
    depSizes.set(pkgName, 0);
    return 0;
  }
}

// Read all packages
const packages = fs.readdirSync(packagesDir)
  .filter(name => {
    const pkgPath = path.join(packagesDir, name);
    return fs.statSync(pkgPath).isDirectory();
  });

console.log('Analyzing dependencies across all packages...\n');

// Analyze each package
packages.forEach(pkgName => {
  const pkgJsonPath = path.join(packagesDir, pkgName, 'package.json');

  if (!fs.existsSync(pkgJsonPath)) {
    return;
  }

  const pkgJson = JSON.parse(fs.readFileSync(pkgJsonPath, 'utf8'));
  const deps = pkgJson.dependencies || {};

  // Skip internal stentor dependencies
  const externalDeps = Object.keys(deps).filter(dep => !dep.startsWith('stentor-'));

  if (externalDeps.length === 0) {
    return;
  }

  console.log(`Analyzing ${pkgName}...`);

  const packageDeps = [];
  externalDeps.forEach(dep => {
    const size = getPackageSize(dep);
    packageDeps.push({ name: dep, size });

    // Track usage across packages
    if (!depUsage.has(dep)) {
      depUsage.set(dep, []);
    }
    depUsage.get(dep).push(pkgName);
  });

  if (packageDeps.length > 0) {
    results.push({
      package: pkgName,
      dependencies: packageDeps.sort((a, b) => b.size - a.size)
    });
  }
});

console.log('\n\n=== LARGEST DEPENDENCIES BY PACKAGE ===\n');

results.forEach(result => {
  const totalSize = result.dependencies.reduce((sum, dep) => sum + dep.size, 0);
  console.log(`\n${result.package} (Total: ${(totalSize / 1024).toFixed(0)} KB)`);
  console.log('─'.repeat(60));

  result.dependencies.forEach((dep, i) => {
    if (i < 10) { // Show top 10
      const sizeKB = (dep.size / 1024).toFixed(1);
      const usedBy = depUsage.get(dep.name).length;
      console.log(`  ${dep.name.padEnd(35)} ${sizeKB.padStart(8)} KB  (${usedBy} pkg${usedBy > 1 ? 's' : ''})`);
    }
  });
});

// Find dependencies used across multiple packages
console.log('\n\n=== DEPENDENCIES USED ACROSS MULTIPLE PACKAGES ===\n');
const sharedDeps = Array.from(depUsage.entries())
  .filter(([_, packages]) => packages.length > 1)
  .map(([name, packages]) => ({
    name,
    packages: packages.length,
    size: depSizes.get(name) || 0,
    usedBy: packages
  }))
  .sort((a, b) => b.size - a.size);

sharedDeps.forEach(dep => {
  const sizeKB = (dep.size / 1024).toFixed(1);
  console.log(`${dep.name.padEnd(35)} ${sizeKB.padStart(8)} KB  (${dep.packages} packages)`);
  console.log(`  Used by: ${dep.usedBy.join(', ')}`);
  console.log('');
});

// Top dependencies overall
console.log('\n=== TOP 20 LARGEST DEPENDENCIES OVERALL ===\n');
const allDeps = Array.from(depSizes.entries())
  .filter(([name]) => !name.startsWith('stentor-'))
  .map(([name, size]) => ({
    name,
    size,
    packages: depUsage.get(name)?.length || 0
  }))
  .sort((a, b) => b.size - a.size)
  .slice(0, 20);

allDeps.forEach((dep, i) => {
  const sizeKB = (dep.size / 1024).toFixed(1);
  console.log(`${(i + 1).toString().padStart(2)}. ${dep.name.padEnd(35)} ${sizeKB.padStart(8)} KB  (${dep.packages} pkg${dep.packages > 1 ? 's' : ''})`);
});

console.log('\n');
