# stentor

[![CircleCI](https://circleci.com/gh/stentorium/stentor/tree/master.svg?style=svg)](https://circleci.com/gh/stentorium/stentor/tree/master) [![Conventional Commits](https://img.shields.io/badge/Conventional%20Commits-1.0.0-yellow.svg)](https://conventionalcommits.org)

### Note

This is currently under construction. We are in the process of migrating the packages from closed-source to this open-source repository.

<p align="center">
Copyright (c) 2020, <a href="https://xappmedia.com" target="__blank">XAPPmedia</a>
</p>

## Prerelease

From time to time, you may want a prerelease version.

To do this, you first need to set the environment variable `CIRCLE_BRANCH` to allow your prerelease.

```bash
$ export CIRCLE_BRANCH=assistant-with-lambdahandler
```

Then run the pre-release command:

```bash
$ yarn release:pre
```
