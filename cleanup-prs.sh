#!/bin/bash
# Repository Cleanup Automation Script
# This script helps automate the PR cleanup process

set -e

echo "╔══════════════════════════════════════════════════════════════════════════════╗"
echo "║          Repository Cleanup Script - iamjairo/manage.scrypted.app            ║"
echo "╚══════════════════════════════════════════════════════════════════════════════╝"
echo ""

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to close a PR via GitHub CLI
close_pr() {
    local pr_number=$1
    local reason=$2

    echo -e "${YELLOW}Closing PR #${pr_number}...${NC}"
    if gh pr close "$pr_number" --repo iamjairo/manage.scrypted.app --comment "$reason" 2>/dev/null; then
        echo -e "${GREEN}✓ Closed PR #${pr_number}${NC}"
        return 0
    else
        echo -e "${RED}✗ Failed to close PR #${pr_number} (may need manual action)${NC}"
        return 1
    fi
}

# Check if gh is authenticated
if ! gh auth status >/dev/null 2>&1; then
    echo -e "${RED}ERROR: GitHub CLI (gh) is not authenticated${NC}"
    echo "Please run: gh auth login"
    echo ""
    echo "Alternatively, you can close PRs manually via the GitHub web interface:"
    echo "  - Go to https://github.com/iamjairo/manage.scrypted.app/pulls"
    echo "  - Click on each PR number below"
    echo "  - Click 'Close pull request'"
    echo ""
fi

echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "PHASE 1: Closing Superseded/Unwanted PRs"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

# PR #11 - Superseded
echo "PR #11: CI auto-merge workflow (superseded by merged PR #28)"
close_pr 11 "Closing as superseded by merged PR #28 which provides a production-ready auto-merge workflow."

# PR #16 - Unwanted major upgrade
echo "PR #16: OpenAI 4→6 upgrade"
close_pr 16 "Declining OpenAI 4→6 major upgrade at this time. Current version (4.x) is stable and meets all requirements. We can revisit if a specific v6 feature is needed."

# PR #19 - Unwanted major upgrade
echo "PR #19: TypeScript 5→6 upgrade"
close_pr 19 "Declining TypeScript 6 upgrade at this time. TS 5.9.3 is stable and LTS. Major version upgrades require careful migration planning and we have no immediate need for TS6 features."

# PR #20 - Follows TypeScript decision
echo "PR #20: @types/node 22→25 upgrade"
close_pr 20 "Declining in alignment with TypeScript version decision. Current @types/node version is appropriate for our TypeScript 5.9.x setup."

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "PHASE 2: Closing Redundant Draft PRs"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

# PR #13 - Redundant integration work
echo "PR #13: Integration work (redundant)"
close_pr 13 "Closing as redundant. The CI improvements and cleanup work have been successfully integrated through PRs #22-28."

# PR #10 - CodeQL improvements already done
echo "PR #10: CodeQL CI stabilization"
close_pr 10 "Closing as addressed by merged PR #24 (CodeQL action v3→v4 update) and other CI improvements."

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "PHASE 3: Launcher Decision (Recommended: Close Electron, Keep Tauri)"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

# PR #2 - Electron launcher (recommend closing in favor of Tauri)
echo "PR #2: Electron launcher (has conflicts, large binary)"
echo -e "${YELLOW}Recommended: Close in favor of Tauri (PR #5)${NC}"
close_pr 2 "Closing in favor of PR #5 (Tauri launcher). Tauri provides a smaller binary (~10MB vs ~100MB), better security model, and cleaner implementation without merge conflicts."

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "SUMMARY"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "PRs Targeted for Closure: #11, #16, #19, #20, #13, #10, #2"
echo ""
echo "Remaining PRs (valuable, keep open):"
echo "  - PR #9: README overhaul (needs rebase)"
echo "  - PR #7: Repo hygiene baseline (check conflicts, then merge)"
echo "  - PR #5: Tauri launcher (recommended)"
echo "  - PR #4: Release workflow (optional)"
echo "  - PR #3: Caddy sub-path (optional)"
echo "  - PR #29: Recent draft (evaluate when ready)"
echo ""
echo -e "${GREEN}Expected result: 13 → 6 open PRs (54% reduction!)${NC}"
echo ""
echo "If gh CLI doesn't work, manually close PRs at:"
echo "  https://github.com/iamjairo/manage.scrypted.app/pulls"
echo ""
