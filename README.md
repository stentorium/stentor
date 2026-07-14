# stentor

[![CI](https://github.com/stentorium/stentor/actions/workflows/ci.yml/badge.svg)](https://github.com/stentorium/stentor/actions/workflows/ci.yml) [![Conventional Commits](https://img.shields.io/badge/Conventional%20Commits-1.0.0-yellow.svg)](https://conventionalcommits.org)

### Note

This is currently under construction. We are in the process of migrating the packages from closed-source to this open-source repository.

<p align="center">
Copyright (c) 2020, <a href="https://xappmedia.com" target="__blank">XAPPmedia</a>
</p>

## Releases

Releases are automated with [release-please](https://github.com/googleapis/release-please) and run in GitHub Actions — there is no local release command.

Land [conventional commits](https://conventionalcommits.org) on `master` and release-please opens a release PR that bumps the affected packages and updates their changelogs. Merging that PR tags the release and publishes the bumped packages to npm.

Packages are versioned independently: only the packages whose commits changed them are bumped and published.
