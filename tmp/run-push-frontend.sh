#!/bin/bash
set -e

REPO_URL="https://github.com/darshanaramesh/Bit-library.git"
WORK_TREE="/workspace/chats/6586f1de0281443d1c8acca4"

cd "$WORK_TREE"

if [ -z "$REPO_URL" ]; then
  echo "No repository URL provided."
  exit 1
fi

if [ -z "$GITHUB_PAT" ]; then
  echo "GITHUB_PAT is not set. Push cannot proceed from this sandbox."
  echo "Option 1: set GITHUB_PAT in this environment and re-run this script."
  echo "Option 2: run the local commands below from your own machine."
  exit 2
fi

# Rebuild frontend so dist is current
cd frontend
npx vite build >/dev/null 2>&1 || true
cd ..

echo "---- staged files in the commit ----"
git diff --cached --name-only

git commit -m "Add BIT Central Library frontend

- Login-first flow: public routes are /, /login, /register
- Protected pages: dashboard and remaining library pages after sign-in
- Frontend UI only enforces @bitsathy.ac.in email at this stage
- Static production build included for preview"

git push origin HEAD
