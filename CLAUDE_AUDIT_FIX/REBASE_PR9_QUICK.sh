#!/bin/bash
# Quick Rebase Script for PR #9
# Run this to automatically rebase PR #9

set -e

echo "╔══════════════════════════════════════════════════════════════════╗"
echo "║         Rebasing PR #9: Documentation Overhaul                   ║"
echo "╚══════════════════════════════════════════════════════════════════╝"
echo ""

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m'

echo -e "${YELLOW}Step 1: Fetching latest changes...${NC}"
git fetch origin

echo -e "${YELLOW}Step 2: Checking out PR #9 branch...${NC}"
git checkout copilot/polish-repo-presentation

echo -e "${YELLOW}Step 3: Starting rebase onto main...${NC}"
if git rebase origin/main; then
    echo -e "${GREEN}✓ Rebase completed without conflicts!${NC}"
    echo ""
    echo -e "${YELLOW}Step 4: Force pushing to origin...${NC}"
    git push origin copilot/polish-repo-presentation --force-with-lease
    echo -e "${GREEN}✓ Successfully rebased and pushed PR #9!${NC}"
    echo ""
    echo "Next steps:"
    echo "  1. Go to https://github.com/iamjairo/manage.scrypted.app/pull/9"
    echo "  2. Verify the PR shows as ready to merge"
    echo "  3. Click 'Merge pull request'"
else
    echo -e "${RED}✗ Conflicts detected!${NC}"
    echo ""
    echo "Manual resolution required:"
    echo "  1. Edit conflicted files (mainly README.md)"
    echo "  2. Keep PR #9's comprehensive README version"
    echo "  3. Run: git add <resolved-files>"
    echo "  4. Run: git rebase --continue"
    echo "  5. Run: git push origin copilot/polish-repo-presentation --force-with-lease"
    echo ""
    echo "To abort: git rebase --abort"
    echo ""
    echo "See REBASE_PR9_GUIDE.md for detailed instructions"
fi
