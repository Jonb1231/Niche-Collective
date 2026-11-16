# Development workflow

The repository is https://github.com/Jonb1231/Niche-Collective.git. Run Git commands from the `niche-collective` application directory.

Start subsequent development on a feature branch from an up-to-date `main`:

```powershell
git switch main
git pull --ff-only origin main
git switch -c feature/describe-the-change
```

Use descriptive commits, review `git diff --cached` before committing, and run checks appropriate to the change. For application changes, use the typecheck, lint, test and build scripts documented in README.md.

Keep real environment files, credentials, private keys, dependencies, build outputs and local Supabase caches out of Git. Only `.env.example` with empty credential placeholders belongs in the repository. Never put secrets in commit messages or logs. Ignore rules do not remove previously committed files or protect credentials embedded in source; inspect staged changes as well.

Push feature branches for review and merge through a pull request. Obtain the owner's approval before publishing the prepared repository setup changes to `main`. Never force-push, rewrite existing remote history or bypass a non-fast-forward rejection. If the remote advances, fetch and reconcile its changes before retrying.
