# Major Upgrades Test Branch — Analysis Plan

**Branch:** `test/major-upgrades`
**PR:** #34 (Draft)
**Status:** Ready for CI analysis
**Created:** 2026-05-18

---

## Overview

This test branch coordinates three major dependency upgrades simultaneously to identify compatibility issues and breaking changes before production deployment.

---

## Version Upgrades

### TypeScript: 5.8.2 → 6.0.3 (Major)

**What to Watch:**
- Stricter type checking and null safety
- Removed or deprecated compiler features
- Breaking changes in type inference
- Changes to module resolution

**Known TS6 Breaking Changes:**
- Enhanced strict mode defaults
- Stricter function signature matching
- Changes to tuple types and spreads
- Updates to mapped types behavior

### OpenAI SDK: 4.85.0 → 6.38.0 (Major)

**What to Watch:**
- Client initialization changes (constructor/config)
- Response object structure changes
- Deprecated API methods or fields
- Stream handling modifications
- Error handling updates

**Common v4 → v6 Migrations:**
- Client init: `new OpenAI({ apiKey })` may have different options
- Response access: `.choices[0].message.content` structure may change
- Completion types: `ChatCompletionMessage` vs new types
- Stream API: Different event handlers

### @types/node: 22.13.10 → 25.9.0 (Major)

**What to Watch:**
- Global namespace changes (Buffer, process, etc.)
- Module type definitions updates
- Stricter built-in types (fs, path, http)
- Node.js 22+ specific type additions

**Common Issues:**
- Implicit `any` types now require explicit annotation
- Global types may need importing (e.g., `import type { Buffer }`)
- `tsconfig.json` may need lib updates for Node 22 features

---

## CI Test Strategy

### Build Steps to Monitor

1. **agent-harness compile check:**
   ```bash
   cd agent-harness
   npm ci
   npm run compile-check  # tsc --noEmit
   ```

2. **Repository root build:**
   ```bash
   npm ci
   npm run build  # vue-tsc --noEmit && vite build
   ```

### Expected CI Behavior

- ✅ **Success:** All types compatible, no migration needed
- ⚠️ **Warnings:** Non-breaking deprecations, should still build
- ❌ **Failure:** Breaking changes requiring code updates

---

## Analysis Checklist

### Step 1: Collect TypeScript Errors

**From CI logs, extract:**

- [ ] First 20 unique `tsc` error messages
- [ ] File paths where errors occur
- [ ] Error codes (TS####)
- [ ] Common error patterns

**Document format:**
```
File: agent-harness/src/index.ts:42
Error: TS2345: Argument of type 'X' is not assignable to parameter of type 'Y'
Pattern: Stricter function signature matching
```

### Step 2: Analyze OpenAI v6 Changes

**Search codebase for:**

- [ ] `new OpenAI(` — client initialization
- [ ] `.chat.completions.create(` — API calls
- [ ] `.choices[0]` — response field access
- [ ] `.stream(` — streaming usage
- [ ] `ChatCompletionMessage` — type imports

**Document required changes:**
```typescript
// Before (v4)
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
const response = await openai.chat.completions.create({...});
const content = response.choices[0].message.content;

// After (v6) — check if structure changed
// Document any required updates
```

### Step 3: Review @types/node Changes

**Check for:**

- [ ] Implicit global usage (Buffer, process without imports)
- [ ] `any` types that need explicit annotation
- [ ] fs/path method signatures changes
- [ ] Node.js 22 specific type issues

**Suggested fixes:**
```typescript
// If Buffer is not global:
import type { Buffer } from 'node:buffer';

// If process types changed:
import type { ProcessEnv } from 'node:process';

// Update tsconfig.json if needed:
{
  "compilerOptions": {
    "lib": ["ES2023", "DOM"],
    "types": ["node"]
  }
}
```

---

## Error Analysis Template

### TypeScript 6.0 Errors

**Total Errors:** _[Fill after CI run]_

**Top Error Categories:**

1. **Null/Undefined Strictness:**
   - Count: __
   - Files affected: __
   - Example: __
   - Fix approach: __

2. **Type Inference Changes:**
   - Count: __
   - Files affected: __
   - Example: __
   - Fix approach: __

3. **Function Signature Mismatches:**
   - Count: __
   - Files affected: __
   - Example: __
   - Fix approach: __

### OpenAI v6 Migration

**Breaking Changes Found:**

- [ ] Client initialization
  - Current code pattern: __
  - Required change: __
  - Files affected: __

- [ ] Response structure
  - Current access pattern: __
  - Required change: __
  - Files affected: __

- [ ] Type imports
  - Current imports: __
  - Required imports: __
  - Files affected: __

### @types/node 25 Issues

**Global Type Issues:**

- [ ] Buffer usage without import
  - Occurrences: __
  - Fix: Add `import type { Buffer } from 'node:buffer'`

- [ ] Process type narrowing
  - Occurrences: __
  - Fix: __

- [ ] File system type changes
  - Occurrences: __
  - Fix: __

---

## Migration Decision Matrix

| Upgrade | Complexity | Risk | Effort | Recommendation |
|---------|-----------|------|--------|----------------|
| TypeScript 6.0 | TBD | TBD | TBD | Pending CI analysis |
| OpenAI v6 | TBD | TBD | TBD | Pending CI analysis |
| @types/node 25 | TBD | TBD | TBD | Pending CI analysis |

**Legend:**
- **Complexity:** Low / Medium / High
- **Risk:** Low / Medium / High
- **Effort:** Hours / Days / Weeks

---

## Upgrade Strategy Options

### Option A: All-at-once (Coordinated)

**Pros:**
- Single migration effort
- Test all interactions simultaneously
- One PR to review

**Cons:**
- Larger change surface
- Harder to isolate issues
- Longer review time

### Option B: Incremental (Sequential)

**Sequence:**
1. @types/node 25 (usually lowest impact)
2. TypeScript 6.0 (fixes may reveal openai issues)
3. OpenAI v6 (last, isolated)

**Pros:**
- Easier debugging
- Smaller PRs
- Gradual risk management

**Cons:**
- Multiple migration efforts
- Potential version conflicts
- Longer calendar time

### Option C: Defer (Stay on current)

**When to choose:**
- Breaking changes too extensive
- No critical features needed
- Team bandwidth limited

---

## Next Steps After CI Completes

1. **Review CI logs thoroughly:**
   - Open failed workflow run
   - Copy full tsc error output
   - Note any runtime warnings

2. **Fill out analysis template above:**
   - Document all error categories
   - List specific code changes needed
   - Estimate migration effort

3. **Post summary comment on PR #34:**
   - Include error counts by category
   - List required code changes
   - Recommend upgrade strategy

4. **Make go/no-go decision:**
   - If feasible: Create migration issues/PRs
   - If blocked: Document blockers and close test PR
   - If risky: Consider incremental approach

5. **Clean up test branch:**
   - Close PR #34 once analysis is complete
   - Keep branch for reference if needed
   - Document findings in repository wiki/docs

---

## Reference Links

- **Test Branch:** https://github.com/iamjairo/manage.scrypted.app/tree/test/major-upgrades
- **PR #34:** https://github.com/iamjairo/manage.scrypted.app/pull/34
- **CI Runs:** https://github.com/iamjairo/manage.scrypted.app/actions
- **Package.json:** `agent-harness/package.json`

---

## Useful Commands

```bash
# Check CI status
gh pr checks 34

# View CI logs
gh run view --log

# Locally reproduce (if needed)
git checkout test/major-upgrades
cd agent-harness
npm ci
npm run compile-check 2>&1 | tee tsc-errors.log

# Search for OpenAI usage
git grep -n "new OpenAI("
git grep -n "openai.chat.completions"

# Search for Node.js global usage
git grep -n "Buffer\."
git grep -n "process\."
```

---

## Notes

- **Do not merge this PR** — It's for testing only
- CI failures are expected and valuable
- Document everything for future reference
- This analysis informs the actual migration PRs

---

**Last Updated:** 2026-05-18
**Analyst:** Claude Code Agent
**Status:** Awaiting CI results
