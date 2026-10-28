#!/bin/bash
set -e

REPO_URL="https://github.com/darshanaramesh/Bit-library.git"
WORK_TREE="/workspace/chats/6586f1de0281443d1c8acca4"
GIT_DIR="$WORK_TREE/.git"

cd "$WORK_TREE"

# safety: only allow push when we have explicit remote and branch
if [ -z "$REPO_URL" ]; then
  echo "No repository URL provided."
  exit 1
fi

# Ensure preview build is current
cd frontend
npx vite build >/dev/null 2>&1 || true
cd ..

# Add the project files, respecting .gitignore
git add -A

# Show what will be committed next
echo "---- staged files ----"
git diff --cached --name-only

echo "---- proceeding to commit and push ----"
git commit -m "Add BIT Central Library frontend

- Login-first flow: public routes are /, /login, /register
- Protected pages: dashboard and remaining library pages after sign-in
- Frontend only enforces @bitsathy.ac.in email on the UI
- Static production build and runner added for preview

This commit is generated from the local workspace and is pushed
to the configured remote once credentials are available."

git push "$REPO_URL" HEAD
