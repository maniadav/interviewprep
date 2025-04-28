# Git Command Cheatsheet

A comprehensive collection of essential Git commands for developers


## 📑 Table of Contents
1. [Repository Setup](#repository-setup)
2. [Basic Workflow](#basic-workflow)
3. [Stashing Changes](#stashing-changes)
4. [Branch Management](#branch-management)
5. [Merging & Rebasing](#merging--rebasing)
6. [Remote Operations](#remote-operations)
7. [Undoing Changes](#undoing-changes)
8. [Inspection & Comparison](#inspection--comparison)
9. [Configuration](#configuration)

---

## <a name="repository-setup"></a>🔧 Repository Setup
| Command | Description |
|---------|-------------|
| `git init` | Initialize a local Git repository |
| `git clone ssh://git@github.com/[user]/[repo].git` | Clone a remote repository |

## <a name="basic-workflow"></a>🔄 Basic Workflow
| Command | Description |
|---------|-------------|
| `git status` | Show working tree status |
| `git add [file]` | Add file to staging area |
| `git add -A` | Add all new/changed files to staging |
| `git commit -m "[message]"` | Commit staged changes |
| `git commit --amend -m "message"` | Change last commit message |
| `git rm -r [file]` | Remove file/folder |

## <a name="stashing-changes"></a>📦 Stashing Changes
| Command | Description |
|---------|-------------|
| `git stash` | Stash changes in dirty working directory |
| `git stash pop` | Apply most recent stash and remove it |
| `git stash clear` | Remove all stashed entries |

## <a name="branch-management"></a>🌿 Branch Management
| Command | Description |
|---------|-------------|
| `git branch` | List local branches |
| `git branch -a` | List all branches (local and remote) |
| `git checkout -b <branch>` | Create and switch to new branch |
| `git branch -d localBranchName` | Delete local branch |
| `git push origin --delete remoteBranchName` | Delete remote branch |
| `git branch \| grep -v "develop" \| grep -v "master" \| xargs git branch -D` | Delete all branches except master/develop |
| `git branch -m [old] [new]` | Rename local branch |

## <a name="merging--rebasing"></a>🔀 Merging & Rebasing
| Command | Description |
|---------|-------------|
| `git merge <branch>` | Merge branch into current branch |
| `git rebase <base>` | Rebase current branch onto base |
| `git rebase -i <base>` | Interactive rebase |

## <a name="remote-operations"></a>🌐 Remote Operations
| Command | Description |
|---------|-------------|
| `git remote -v` | List remote repositories |
| `git remote add origin <REMOTE_URL>` | Add new remote |
| `git remote remove origin` | Remove remote named 'origin' |
| `git remote set-url origin <url>` | Change remote URL |
| `git push origin [branch]` | Push branch to remote |
| `git push -u origin [branch]` | Push and set upstream |
| `git push <remote> --force` | Force push changes |
| `git push <remote> --all` | Push all local branches |
| `git push <remote> --tags` | Push tags separately |
| `git pull` | Fetch and merge from remote |
| `git pull --rebase <remote>` | Rebase instead of merge when pulling |

## <a name="undoing-changes"></a>⏪ Undoing Changes
| Command | Description |
|---------|-------------|
| `git reset --soft HEAD~1` | Undo last commit, keep changes staged |
| `git reset <file>` | Unstage file |
| `git reset` | Reset staging area (keep working dir) |
| `git reset --hard` | Reset everything (hard reset) |
| `git reset <commit>` | Reset to commit (keep working dir) |
| `git reset --hard <commit>` | Reset to commit (destroy changes) |
| `git revert <commit>` | Create new commit that undoes changes |
| `git clean -n` | Preview files to be removed |
| `git clean -f` | Remove untracked files |

## <a name="inspection--comparison"></a>🔍 Inspection & Comparison
| Command | Description |
|---------|-------------|
| `git log` | Show commit logs |
| `git log --summary` | Detailed commit logs |
| `git log --oneline` | Compact commit logs |
| `git diff` | Show unstaged changes |
| `git diff [source] [target]` | Show changes between branches |
| `git reflog` | View HEAD movement history |

## <a name="configuration"></a>⚙️ Configuration
| Command | Description |
|---------|-------------|
| `git config --global user.name "<name>"` | Set global username |
| `git config --global user.email "<email>"` | Set global email |
| `git config --global alias.<alias> "<cmd>"` | Create command alias |
| `git config --system core.editor <editor>` | Set default text editor |
| `git config --global --edit` | Edit global config |

---

