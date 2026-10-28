#!/bin/bash
set -e

REPO_URL="https://github.com/darshanaramesh/Bit-library.git"
WORK_TREE="/workspace/chats/6586f1de0281443d1c8acca4"

cd "$WORK_TREE"

if [ -z "$REPO_URL" ]; then
  echo "No repository URL provided."
  exit 1
fi

# Rebuild the frontend so the published dist is current
cd frontend
npx vite build >/dev/null 2>&1 || true
cd ..

# Stage only the frontend folder
git add frontend

echo "---- staged frontend files ----"
git diff --cached --name-only

echo "---- proceeding to commit and push ----"
git commit -m "Add BIT Central Library frontend

- Login-first flow: public routes are /, /login, /register
- Protected pages: dashboard and remaining library pages after sign-in
- Frontend UI only enforces @bitsathy.ac.in email at this stage
- Static production build and simple runner included for preview"

git push "$REPO_URL" HEAD
