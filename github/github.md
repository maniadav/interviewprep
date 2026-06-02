# Git & GitHub Complete Cheatsheet

A practical collection of Git and GitHub commands for daily development, collaboration, troubleshooting, recovery, and advanced workflows.

---

# Table of Contents

1. [Repository Setup](#repository-setup)
2. [Daily Workflow](#daily-workflow)
3. [Staging & Commits](#staging--commits)
4. [Stashing](#stashing)
5. [Branch Management](#branch-management)
6. [Remote Operations](#remote-operations)
7. [Merging & Rebasing](#merging--rebasing)
8. [Pull Request Workflow](#pull-request-workflow)
9. [Undoing Changes](#undoing-changes)
10. [Inspection & Debugging](#inspection--debugging)
11. [Recovery Scenarios](#recovery-scenarios)
12. [Common Errors & Fixes](#common-errors--fixes)
13. [SSH & Authentication](#ssh--authentication)
14. [Tags & Releases](#tags--releases)
15. [Advanced Commands](#advanced-commands)
16. [Configuration](#configuration)
17. [Best Practices](#best-practices)
18. [Most Used Commands](#most-used-commands)

---

# Repository Setup

| Command                           | Description                             | When To Use                    |
| --------------------------------- | --------------------------------------- | ------------------------------ |
| `git init`                        | Initialize a new local Git repository   | Starting a new project         |
| `git clone <url>`                 | Download a remote repository locally    | Working on an existing project |
| `git clone -b <branch> <url>`     | Clone a specific branch only            | Working on a specific branch   |
| `git remote -v`                   | Show all configured remote repositories | Checking connected remotes     |
| `git remote add origin <url>`     | Connect local repository to remote      | Linking GitHub repository      |
| `git remote remove origin`        | Remove remote repository connection     | Replacing or cleaning remotes  |
| `git remote set-url origin <url>` | Change remote repository URL            | Migrating repository URLs      |

---

# Daily Workflow

| Step                         | Commands                                                     |
| ---------------------------- | ------------------------------------------------------------ |
| Start working on latest code | `git checkout develop`<br>`git pull --rebase origin develop` |
| Create feature branch        | `git checkout -b feature/new-feature`                        |
| Stage changes                | `git add .`                                                  |
| Commit changes               | `git commit -m "Add new feature"`                            |
| Push branch                  | `git push -u origin feature/new-feature`                     |

---

# Staging & Commits

| Command                           | Description                                       | When To Use                |
| --------------------------------- | ------------------------------------------------- | -------------------------- |
| `git status`                      | Show current working directory and staging status | Before every Git operation |
| `git add <file>`                  | Stage specific file changes                       | Adding selected files      |
| `git add .`                       | Stage changes from current directory              | Adding current changes     |
| `git add -A`                      | Stage all changes including deletions             | Staging entire repository  |
| `git commit -m "message"`         | Save staged changes into Git history              | Creating commit            |
| `git commit --amend -m "message"` | Modify last commit message or content             | Fixing recent commit       |
| `git rm <file>`                   | Remove tracked file                               | Deleting files             |
| `git rm -r <folder>`              | Remove tracked folder                             | Deleting directories       |
| `git mv old new`                  | Rename/move file while preserving history         | Renaming files             |

---

# Stashing

| Command                       | Description                          | When To Use                           |
| ----------------------------- | ------------------------------------ | ------------------------------------- |
| `git stash`                   | Temporarily save uncommitted changes | Switching branches without committing |
| `git stash push -m "message"` | Create named stash                   | Managing multiple stashes             |
| `git stash list`              | View all saved stashes               | Finding previous stash                |
| `git stash show`              | Show stash changes                   | Inspecting stash contents             |
| `git stash apply`             | Apply stash without removing it      | Reusing stash later                   |
| `git stash pop`               | Apply and remove latest stash        | Restoring work                        |
| `git stash drop`              | Delete specific stash                | Cleaning old stashes                  |
| `git stash clear`             | Remove all stashes                   | Resetting stash history               |

---

# Branch Management

| Command                             | Description                      | When To Use                  |
| ----------------------------------- | -------------------------------- | ---------------------------- |
| `git branch`                        | List local branches              | Viewing local branches       |
| `git branch -a`                     | List local and remote branches   | Viewing all branches         |
| `git branch -r`                     | List remote branches             | Checking remote branches     |
| `git checkout <branch>`             | Switch to another branch         | Moving between branches      |
| `git switch <branch>`               | Modern alternative to checkout   | Switching branches           |
| `git checkout -b <branch>`          | Create and switch to branch      | Starting new feature         |
| `git switch -c <branch>`            | Modern create-and-switch command | Starting new feature         |
| `git branch -d <branch>`            | Delete merged local branch       | Cleaning old branches        |
| `git branch -D <branch>`            | Force delete local branch        | Removing unmerged branch     |
| `git push origin --delete <branch>` | Delete remote branch             | Cleaning GitHub branches     |
| `git branch -m old new`             | Rename local branch              | Updating branch names        |
| `git branch --merged`               | Show merged branches             | Safe branch cleanup          |
| `git branch --no-merged`            | Show unmerged branches           | Avoiding accidental deletion |

### Delete All Local Branches Except Main/Develop

```bash
git branch | grep -v "main" | grep -v "develop" | xargs git branch -D
```

---

# Remote Operations

| Command                       | Description                                              | When To Use                    |
| ----------------------------- | -------------------------------------------------------- | ------------------------------ |
| `git fetch`                   | Download remote changes without modifying local branches | Checking remote updates safely |
| `git fetch --all`             | Fetch updates from all remotes                           | Multi-remote repositories      |
| `git pull`                    | Download and merge remote changes                        | Updating local branch          |
| `git pull --rebase`           | Download changes and replay local commits on top         | Keeping clean linear history   |
| `git pull origin <branch>`    | Pull specific branch changes                             | Updating targeted branch       |
| `git push`                    | Upload local commits to remote                           | Sharing changes                |
| `git push origin <branch>`    | Push specific branch                                     | Uploading feature branch       |
| `git push -u origin <branch>` | Push branch and track upstream                           | First push of branch           |
| `git push --force-with-lease` | Force push safely after history rewrite                  | Rebasing pushed commits        |
| `git push --force`            | Overwrite remote branch history                          | Emergency history rewrite      |
| `git push origin --all`       | Push all local branches                                  | Syncing all branches           |
| `git push origin --tags`      | Push all tags                                            | Publishing releases            |

---

# Merging & Rebasing

| Command                       | Description                                                         | When To Use                            |
| ----------------------------- | ------------------------------------------------------------------- | -------------------------------------- |
| `git merge <branch>`          | Combine another branch into current branch while preserving history | Merging completed feature              |
| `git merge --abort`           | Cancel merge process and restore previous state                     | Aborting failed merge                  |
| `git merge --squash <branch>` | Combine all branch commits into one commit                          | Cleaner merge history                  |
| `git rebase <branch>`         | Replay current branch commits on top of another branch              | Keeping feature branch updated cleanly |
| `git rebase -i HEAD~3`        | Interactively edit recent commits                                   | Squashing or editing commits           |
| `git rebase --continue`       | Continue rebase after resolving conflicts                           | Conflict resolution                    |
| `git rebase --abort`          | Cancel rebase operation                                             | Reverting failed rebase                |
| `git rebase --skip`           | Skip problematic commit during rebase                               | Ignoring broken commit                 |

## Merge vs Rebase

| Merge                          | Rebase                         |
| ------------------------------ | ------------------------------ |
| Preserves exact branch history | Creates cleaner linear history |
| Creates merge commits          | Avoids merge commits           |
| Better for shared branches     | Better for feature branches    |
| Easier for beginners           | Cleaner commit history         |

---

# Pull Request Workflow

| Step                  | Commands                                                     |
| --------------------- | ------------------------------------------------------------ |
| Update develop branch | `git checkout develop`<br>`git pull --rebase origin develop` |
| Create feature branch | `git checkout -b feature/new-feature`                        |
| Commit work           | `git add .`<br>`git commit -m "Add new feature"`             |
| Push branch           | `git push -u origin feature/new-feature`                     |
| Open Pull Request     | Create PR on GitHub                                          |
| Merge Pull Request    | Merge after review approval                                  |
| Cleanup branch        | `git branch -d feature/new-feature`                          |

---

# Undoing Changes

| Command                     | Description                                  | When To Use              |
| --------------------------- | -------------------------------------------- | ------------------------ |
| `git reset <file>`          | Unstage file while keeping changes           | Removing staged file     |
| `git reset`                 | Unstage all files                            | Reset staging area       |
| `git reset --soft HEAD~1`   | Remove last commit but keep staged changes   | Editing recent commit    |
| `git reset HEAD~1`          | Remove last commit but keep file changes     | Undoing local commit     |
| `git reset --hard HEAD~1`   | Delete last commit and changes permanently   | Discarding unwanted work |
| `git reset --hard <commit>` | Move branch to specific commit               | Rolling back history     |
| `git restore <file>`        | Restore file to last committed state         | Discarding file changes  |
| `git restore .`             | Restore all working directory changes        | Resetting local changes  |
| `git revert <commit>`       | Create new commit that undoes changes safely | Undoing pushed commit    |
| `git clean -n`              | Preview untracked files for removal          | Safe cleanup preview     |
| `git clean -f`              | Remove untracked files                       | Cleaning workspace       |
| `git clean -fd`             | Remove untracked files and folders           | Full workspace cleanup   |
| `git clean -fdx`            | Remove ignored files too                     | Complete reset           |

---

# Inspection & Debugging

| Command                           | Description                          | When To Use                        |
| --------------------------------- | ------------------------------------ | ---------------------------------- |
| `git status`                      | View current branch and file state   | Before Git operations              |
| `git log`                         | Show detailed commit history         | Reviewing project history          |
| `git log --oneline`               | Show compact commit history          | Quick history inspection           |
| `git log --graph --oneline --all` | Visualize branch and merge history   | Understanding repository structure |
| `git show <commit>`               | Show commit details and file changes | Reviewing specific commit          |
| `git diff`                        | Show unstaged file changes           | Reviewing local modifications      |
| `git diff --staged`               | Show staged changes                  | Reviewing staged content           |
| `git diff branch1..branch2`       | Compare changes between branches     | Reviewing branch differences       |
| `git blame <file>`                | Show author and commit for each line | Tracking code ownership            |
| `git reflog`                      | Show every HEAD and branch movement  | Recovering lost work               |
| `git shortlog -sn`                | Show commit count by contributor     | Team contribution analysis         |

---

# Recovery Scenarios

| Scenario                      | Commands                                                    |
| ----------------------------- | ----------------------------------------------------------- |
| Recover deleted branch        | `git reflog`<br>`git checkout -b recovered-branch <commit>` |
| Recover after hard reset      | `git reflog`<br>`git reset --hard <commit>`                 |
| Recover lost commit           | `git reflog`<br>`git reset --hard <commit>`                 |
| Move commit to another branch | `git cherry-pick <commit>`                                  |
| Undo pushed commit safely     | `git revert <commit>`                                       |
| Restore deleted file          | `git checkout <commit> -- <file>`                           |
| Find dangling commits         | `git fsck --lost-found`                                     |
| Recover detached HEAD work    | `git checkout -b recovery-branch`                           |

---

# Common Errors & Fixes

| Error/Scenario                           | Fix                                                                          |
| ---------------------------------------- | ---------------------------------------------------------------------------- |
| Divergent branches                       | `git pull --rebase origin <branch>`                                          |
| Permanently fix divergent branch warning | `git config --global pull.rebase true`                                       |
| Non-fast-forward rejection               | `git pull --rebase`<br>`git push`                                            |
| No upstream branch                       | `git push -u origin <branch>`                                                |
| Detached HEAD                            | `git checkout -b recovery-branch`                                            |
| Merge conflict                           | `git status`<br>`git add .`<br>`git commit`                                  |
| Rebase conflict                          | `git add .`<br>`git rebase --continue`                                       |
| Abort failed rebase                      | `git rebase --abort`                                                         |
| Untracked files would be overwritten     | `git stash`<br>`git pull`<br>`git stash pop`                                 |
| Authentication failed                    | `git remote -v`<br>`ssh -T git@github.com`                                   |
| Wrong commit on wrong branch             | `git cherry-pick <commit>`<br>`git reset --hard HEAD~1`                      |
| Accidentally force pushed                | `git reflog`<br>`git reset --hard <commit>`<br>`git push --force-with-lease` |

---

# SSH & Authentication

| Command                                        | Description                  | When To Use               |
| ---------------------------------------------- | ---------------------------- | ------------------------- |
| `ssh-keygen -t ed25519 -C "email@example.com"` | Generate SSH key pair        | Initial GitHub setup      |
| `eval "$(ssh-agent -s)"`                       | Start SSH agent              | Loading SSH keys          |
| `ssh-add ~/.ssh/id_ed25519`                    | Add SSH key to agent         | Enabling authentication   |
| `cat ~/.ssh/id_ed25519.pub`                    | View public SSH key          | Adding key to GitHub      |
| `ssh -T git@github.com`                        | Test GitHub SSH connection   | Verifying authentication  |
| `git remote -v`                                | Check repository remote URLs | Verifying HTTPS/SSH setup |

---

# Tags & Releases

| Command                           | Description                       | When To Use            |
| --------------------------------- | --------------------------------- | ---------------------- |
| `git tag`                         | List all tags                     | Viewing releases       |
| `git tag v1.0.0`                  | Create lightweight tag            | Simple version marking |
| `git tag -a v1.0.0 -m "release"`  | Create annotated tag with message | Official releases      |
| `git show v1.0.0`                 | Show tag details                  | Inspecting release     |
| `git push origin v1.0.0`          | Push specific tag                 | Publishing release     |
| `git push origin --tags`          | Push all tags                     | Syncing releases       |
| `git tag -d v1.0.0`               | Delete local tag                  | Cleaning tags          |
| `git push origin --delete v1.0.0` | Delete remote tag                 | Removing release tag   |

---

# Advanced Commands

| Command                                      | Description                                | When To Use                     |
| -------------------------------------------- | ------------------------------------------ | ------------------------------- |
| `git cherry-pick <commit>`                   | Copy specific commit into current branch   | Moving commits between branches |
| `git bisect start`                           | Start binary search for bug-causing commit | Debugging regressions           |
| `git bisect good <commit>`                   | Mark commit as working                     | Bisect workflow                 |
| `git bisect bad`                             | Mark commit as broken                      | Bisect workflow                 |
| `git worktree add ../branch branch-name`     | Use multiple working directories           | Parallel branch work            |
| `git archive --format zip HEAD > source.zip` | Export repository without Git history      | Sharing source code             |
| `git gc`                                     | Optimize and clean repository              | Repository maintenance          |
| `git fsck`                                   | Verify repository integrity                | Detecting corruption            |
| `git submodule update --init --recursive`    | Initialize Git submodules                  | Projects with submodules        |

## Interactive Rebase Options

| Option   | Description                            |
| -------- | -------------------------------------- |
| `pick`   | Keep commit unchanged                  |
| `reword` | Edit commit message                    |
| `edit`   | Pause to modify commit                 |
| `squash` | Combine commit with previous commit    |
| `fixup`  | Combine commit without keeping message |
| `drop`   | Remove commit entirely                 |

---

# Configuration

| Command                                         | Description                       | When To Use                |
| ----------------------------------------------- | --------------------------------- | -------------------------- |
| `git config --global user.name "name"`          | Set Git username                  | Initial setup              |
| `git config --global user.email "email"`        | Set Git email                     | Initial setup              |
| `git config --global pull.rebase true`          | Use rebase during pull by default | Cleaner history            |
| `git config --global init.defaultBranch main`   | Set default branch name           | Standardizing repositories |
| `git config --global core.editor "code --wait"` | Set default editor                | Improving Git workflow     |
| `git config --global alias.st status`           | Create custom Git alias           | Faster commands            |
| `git config --list`                             | Show all Git configuration        | Debugging config           |
| `git config --global --edit`                    | Edit Git config file directly     | Advanced configuration     |

---

# Best Practices

## Always

* Pull latest changes before starting work
* Use feature branches
* Create Pull Requests for changes
* Write meaningful commit messages
* Keep commits small and focused
* Use `.gitignore`
* Prefer `git pull --rebase`
* Prefer `git push --force-with-lease`
* Learn `reflog`, `rebase`, and `cherry-pick`
* Review code before merging

## Never

* Force push shared branches
* Commit secrets or credentials
* Work directly on production branch
* Ignore merge conflicts
* Delete branches without verifying merge status
* Use `git reset --hard` carelessly
* Rewrite public shared history unnecessarily

---

# Most Used Commands

```bash
git status

git pull --rebase

git add .

git commit -m "message"

git push

git checkout -b feature/new-feature

git fetch

git stash

git stash pop

git log --graph --oneline --decorate --all

git reflog

git cherry-pick <commit>

git reset --soft HEAD~1

git revert <commit>

git push --force-with-lease
```

---

# Golden Rules

1. Never panic. Git rarely loses data.
2. Run `git status` before major operations.
3. Run `git reflog` when work seems lost.
4. Use feature branches for all development.
5. Prefer `git pull --rebase`.
6. Prefer `git push --force-with-lease`.
7. Never force push production branches.
8. Create backup branches before destructive operations.
9. Keep commits meaningful and focused.
10. Learn `reflog`, `rebase`, and `cherry-pick` deeply.
