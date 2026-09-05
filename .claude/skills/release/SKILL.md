---
name: release
description: Commits all pending changes with an auto-generated commit message and pushes them to the GitHub remote. Use when the user says "release", "ship it", "publish this", "commit and push", or otherwise wants the current working-tree changes committed and pushed in one step.
---

# Release

Commit the current changes with a generated message and push to GitHub, without stopping to ask for approval of the message itself (invoking this skill is the user's authorization to commit + push). Still surface what you did afterward.

## Steps

1. Run these in parallel to understand the current state:
   - `git status` (never `-uall`)
   - `git diff` (unstaged) and `git diff --staged` (already-staged changes)
   - `git log -10 --oneline` (to match this repo's commit message style)
   - `git status -sb` or `git rev-parse --abbrev-ref --symbolic-full-name @{u}` to check whether the current branch tracks a remote

2. If there is nothing staged, unstaged, or untracked, tell the user there's nothing to release and stop.

3. Before staging, scan untracked/modified files for anything that looks like a secret (`.env`, `credentials.json`, private keys, tokens, etc.) even if the filename looks innocuous — if found, exclude it, warn the user, and continue with the rest.

4. Stage the relevant files explicitly by name (never `git add -A` or `git add .`) unless the status output shows only intentional, unambiguous changes.

5. Draft a concise commit message (1-2 sentences, focused on *why*, not a restatement of the diff) that matches the tone/style of recent commits from `git log`. Do not ask the user to approve the wording — pick the best message and proceed.

6. Create the commit via HEREDOC, ending with:
   ```
   Co-Authored-By: Claude Sonnet 5 <noreply@anthropic.com>
   ```

7. Push:
   - If the branch has no upstream yet: `git push -u origin <branch>`
   - Otherwise: `git push`

8. Report back concisely: the commit hash + message, and confirmation the push succeeded (or the exact error if it didn't).

## Safety rules

- Never use `--force`, `--force-with-lease`, `--no-verify`, or `-c commit.gpgsign=false` unless the user explicitly asks in this conversation.
- If a pre-commit/pre-push hook fails, fix the underlying issue, re-stage, and make a new commit rather than bypassing the hook.
- If `git push` is rejected (remote has commits you don't have), do NOT force-push. Tell the user and ask before doing `git pull --rebase` or a merge, since rewriting local history ordering is their call.
- Never amend an existing commit — always create a new one.
- If the user's request implies only a subset of the changes should ship (e.g. they mention a specific feature), stage only those files instead of everything in `git status`.
