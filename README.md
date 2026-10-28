# Budget Tracker

A Next.js web application for the Budget Tracker project. This repository contains the application source code and the configuration developers need to run, check, and improve it locally.

## Contents

- [Project overview](#project-overview)
- [Prerequisites](#prerequisites)
- [Local development setup](#local-development-setup)
- [Environment variables](#environment-variables)
- [Available commands](#available-commands)
- [Project structure](#project-structure)
- [How we collaborate](#how-we-collaborate)
- [Git workflow: Jira task to pull request](#git-workflow-jira-task-to-pull-request)
- [Staging and committing changes](#staging-and-committing-changes)
- [Pull request and review checklist](#pull-request-and-review-checklist)
- [Troubleshooting](#troubleshooting)
- [Learn more](#learn-more)
- [Deployment](#deployment)

## Project overview

The current project configuration declares Next.js **16.4.3**, React **19.3.0**, TypeScript 5, Tailwind CSS 4, and ESLint 9. It uses the Next.js App Router: `app/page.tsx` is the root page route (`/`). The root layout loads the Geist font family through `next/font`.

The aim of this repository is to let contributors make changes in isolated branches, verify those changes locally, and submit them for review before they are merged into the shared branch.

## Prerequisites

Install the following before setting up the project:

| Tool | Requirement | Why it is needed |
| --- | --- | --- |
| Git | A current version | Cloning the repository and collaborating through branches and commits. |
| Node.js | **Node.js 22.x recommended**; Next.js requires Node.js **20.9 or newer**. Use any version pinned by this repository if one is present. | Runs the JavaScript tooling and Next.js. |
| npm | The npm version bundled with your Node.js installation | Installs and manages the project's packages. This project uses npm commands in the examples below. |
| Code editor | VS Code or another editor (recommended) | Reading and editing the project files. |
| Browser | A current Chrome, Firefox, Edge, or Safari release | Testing the application locally. |

Check that Node.js and npm are installed:

```bash
node --version
npm --version
git --version
```

The Node.js command should report version `v22.x.x` if you are using the recommendation above. If the repository later adds an `.nvmrc` file or a Node.js version in `package.json` under `engines`, follow that project-specific version instead.

> **Package manager rule:** use npm for this repository unless the team explicitly changes the package manager. Keep `package-lock.json` committed and use `npm ci` for a clean, repeatable installation. Do not mix npm, pnpm, Yarn, and Bun lockfiles in the same project without an agreed migration.

## Local development setup

### 1. Clone the repository

Open a terminal and move to the folder where you keep development projects. Then clone the GitHub repository:

```bash
git clone https://github.com/Huey-dev/budget_tracker.git
cd budget_tracker
```

If you already cloned the repository, do not clone it again. Move into the existing project directory instead.

### 2. Check the repository state

```bash
git status --short --branch
git branch --show-current
```

Make sure you understand any existing changes before editing files. Do not overwrite or discard another contributor's uncommitted work.

### 3. Install dependencies

From the directory that contains `package.json`, run:

```bash
npm ci
```

`npm ci` installs the dependency versions recorded in `package-lock.json` and is the preferred clean installation for a cloned repository. It may remove an existing `node_modules` directory before reinstalling packages, so commit or back up any work that was incorrectly stored there (normally, source code should not be stored in `node_modules`).

If `npm ci` reports that there is no `package-lock.json`, check with the team before generating or changing lockfiles. If this repository is intentionally managed with npm but has no lockfile yet, run `npm install` once, review the generated `package-lock.json`, and commit it so everyone can use `npm ci` subsequently.

### 4. Start the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in a browser. Keep the terminal running while using the app. Stop the server with `Ctrl+C` in that terminal.

When you edit a page or stylesheet, Next.js normally refreshes the development page automatically. If the app does not appear at port `3000`, read the terminal output; Next.js may have selected another port because `3000` was already in use.

### 5. Make a change

For the standard App Router structure, `app/page.tsx` defines the page at `/`. Shared HTML structure and metadata normally live in `app/layout.tsx`, and global styles normally live in `app/globals.css`. Read the existing code before changing it and follow the current conventions in the repository.

### 6. Run the development checks

Before opening a pull request, run the checks defined by this repository:

```bash
npm run lint
npm run build
```

Both commands should finish successfully. The lint command checks code style and common mistakes; the production build checks whether Next.js can compile and prepare the application for production.

If either command reports that the script does not exist, run `npm run` to list the scripts in `package.json`. Do not silently substitute a command or claim a check passed if it was not run. Update this README if the project scripts are deliberately changed.

## Environment variables

The current starter application does not require environment variables to run locally. Do not create credentials or invent configuration values just to fill this section.

Before adding or changing an integration that requires configuration, search the source and configuration files for references such as `process.env` or `NEXT_PUBLIC_`. Document every required variable in this section and add an `.env.example` containing placeholders, never real credentials. If the application has no such references, no `.env.local` file is needed to start it.

When environment variables are required, use this workflow:

1. Add a variable name, purpose, whether it is required, and a safe example value to the table below.
2. Add the same variable to `.env.example` with a placeholder value.
3. The current `.gitignore` ignores files matching `.env*`. If you add a safe `.env.example`, add the exception `!.env.example` after the `.env*` rule so the example can be committed while `.env.local` remains ignored.
4. Copy `.env.example` to `.env.local` on your machine and replace placeholders with your own local values.
5. Keep `.env.local` out of Git. Never commit API keys, database passwords, access tokens, or production credentials.

| Variable | Required? | Purpose | Example value |
| --- | --- | --- | --- |
| None | No | The current starter code has no required application environment variables. Add entries here only when the source code introduces a real requirement. | Not applicable |

Example commands, **only after an `.env.example` has been added to the repository**:

```bash
# macOS / Linux / Git Bash
cp .env.example .env.local
```

PowerShell equivalent:

```powershell
Copy-Item .env.example .env.local
```

Do not put secret values in variables prefixed with `NEXT_PUBLIC_`: Next.js can expose those values in browser-delivered code. Variables without that prefix should also be treated as secrets when they contain credentials.

## Available commands

Run commands from the project root, where `package.json` is located.

| Command | Purpose |
| --- | --- |
| `npm ci` | Install the exact dependency versions recorded in `package-lock.json`. |
| `npm run dev` | Start the local development server. |
| `npm run lint` | Run the configured linter, if the `lint` script exists in `package.json`. |
| `npm run build` | Compile and prepare the production build. |
| `npm run start` | Start the production server after a successful build, if the `start` script exists. |
| `npm run` | List the scripts configured in `package.json`. |

To test the production server locally, run:

```bash
npm run build
npm run start
```

Then open [http://localhost:3000](http://localhost:3000). Stop the server using `Ctrl+C`. A production server is different from the development server: changes do not automatically appear until you rebuild the app.

Only treat commands as supported if they are present in the project's `package.json`. If a script is missing, either add and test it as part of an agreed task or remove that command from the documented command list.

## Project structure

The current repository tracks `app/`, `public/`, `.gitignore`, `AGENTS.md`, `README.md`, `eslint.config.mjs`, `next.config.ts`, `package.json`, `package-lock.json`, and `tsconfig.json`. Use `git ls-files` to confirm the exact files tracked in your local checkout. The following tree includes optional folders for future organization; they do not necessarily exist yet.

```text
budget_tracker/
├── app/                    # App Router pages, layouts, routes, and styles
│   ├── page.tsx            # UI for the root route: /
│   ├── layout.tsx          # Shared page shell, metadata, and document structure
│   ├── globals.css         # Global CSS rules (if present)
│   └── favicon.ico         # Browser tab icon (if present)
├── public/                 # Static files served from the site root (if present)
├── components/             # Reusable UI components (add when the project needs them)
├── lib/                    # Shared helpers, data access, and business logic (if added)
├── .gitignore              # Files and folders Git should not track
├── AGENTS.md               # Next.js-generated agent guidance for this repository
├── eslint.config.mjs       # ESLint rules and configuration
├── next.config.ts          # Next.js configuration, including the current build/runtime options
├── package.json            # Dependencies and scripts used by npm
├── package-lock.json       # Locked dependency tree for repeatable npm installs
├── tsconfig.json           # TypeScript compiler configuration
└── README.md               # Setup and collaboration guide
```

### What the important files do

- **`package.json`**: names the project, lists installed package dependencies, and defines commands under `scripts`. Read this before assuming a command exists.
- **`package-lock.json`**: records the resolved npm dependency tree so team members can install consistent versions. Commit changes to this file when dependency changes are intentional.
- **`app/page.tsx`**: defines the root page, normally shown at `http://localhost:3000/`.
- **`app/layout.tsx`**: provides the shared layout around pages, such as the document language, shared elements, and metadata.
- **`app/globals.css`**: defines styles that apply globally, if this file is part of the project.
- **`public/`**: contains static assets that can be referenced by their path, such as `/logo.svg`.
- **`next.config.ts`**: configures Next.js behavior. Read it before changing build or bundler settings; the current file includes project-specific options.
- **`AGENTS.md`**: contains Next.js-generated guidance for coding agents and notes that this repository's Next.js version may differ from older conventions. Do not delete or rewrite generated content casually; check the local Next.js documentation under `node_modules/next/dist/docs/` when working on framework APIs.
- **`tsconfig.json`**: configures TypeScript and how the editor/compiler understands the project's code.
- **`eslint.config.*`**: configures the lint rules, if the project uses ESLint.
- **`.gitignore`**: prevents machine-specific or generated files (such as `node_modules`, build output, and local secrets) from being committed.
- **`.env.local`**: local environment configuration, only needed if the application uses environment variables. It must not be committed.
- **`components/` and `lib/`**: optional organizational folders for reusable UI and shared logic. Create them when they improve the current code structure; do not create empty folders simply to match this example.

## How we collaborate

This is a shared codebase. Every contributor should be able to understand what is changing, why it is changing, how it was checked, and what is needed from the next person.

### Responsibilities

- **Task owner / assignee:** understands the Jira description and acceptance criteria, asks questions before implementation becomes blocked, and keeps the ticket current.
- **Contributor:** works on the assigned scope in a separate branch, communicates changes that affect other people, tests the work, and opens a pull request.
- **Reviewer:** checks correctness, readability, security, scope, and test evidence. A review is a technical check, not merely an approval click.
- **Team / project lead:** clarifies priorities and decisions, resolves competing approaches, and confirms which branch is the merge target. One person may hold more than one responsibility on a small team.

### Collaboration rules

1. **One Jira issue, one working branch, one pull request** by default. Keep unrelated fixes in separate issues and branches so reviews stay small and understandable.
2. **Agree on shared interfaces early.** If one contributor changes a component's props, a data shape, a route, or a configuration file another contributor depends on, communicate it in Jira or the pull request before both sides build against different assumptions.
3. **Use Jira as the decision log.** Record scope clarifications, blockers, important technical decisions, and links to commits or pull requests on the relevant ticket.
4. **Avoid overlapping edits.** Coordinate before multiple contributors change the same file. If ownership is unclear, agree who edits which parts and who integrates the changes.
5. **Keep secrets and personal machine configuration out of Git.** Share variable names and setup instructions, not private values.
6. **Review before merging.** Contributors should not merge their own pull request unless the team's process explicitly allows it. Required checks and approvals take priority over this general guide.
7. **Report the truth.** State which checks passed, failed, or could not run. Do not mark a Jira issue done just because the code was pushed.

## Git workflow: Jira task to pull request

Use the team's agreed default branch as the base. The examples below use `main`; replace it if the repository uses a different default branch. The ticket key below is an example. Replace `BT-3` with the actual Jira key assigned to your work.

### 1. Start from an up-to-date base branch

```bash
git switch main
git pull --ff-only origin main
git status --short --branch
```

The working tree should be clean before you begin. If Git reports uncommitted changes, inspect them first and do not discard work you need.

### 2. Create a task branch

Use a consistent naming pattern:

```text
<type>/<JIRA-KEY>-short-description
```

Examples:

```text
docs/BT-3-local-development-setup
feat/BT-7-budget-summary
fix/BT-4-lint-configuration
chore/BT-5-docker-setup
```

Create your branch from the updated base branch:

```bash
git switch -c docs/BT-3-local-development-setup
```

Suggested branch types:

- `feat/`: a new application capability.
- `fix/`: a bug fix.
- `docs/`: documentation only.
- `test/`: tests or test infrastructure.
- `chore/`: maintenance, tooling, or build configuration.

Keep the description short, lowercase, and specific. Include the Jira key so teammates can connect the branch to the work item.

### 3. Make focused changes and inspect them

Change only what is needed to satisfy the ticket. Check the current state often:

```bash
git status --short
git diff
```

For this documentation task, the intended change may be only `README.md`. If other files appear in `git status`, inspect them to confirm they are intentional before staging anything.

### 4. Stage only the intended files

Staging selects which changes will enter the next commit. Prefer explicit file paths:

```bash
git add README.md
git diff --cached
```

If the ticket intentionally adds another file, such as `.env.example`, stage that file explicitly too:

```bash
git add .env.example
```

Check for whitespace errors and review the exact staged patch:

```bash
git diff --check
git diff --cached --check
git diff --cached
```

Do not stage `.env.local`, secrets, generated build output, `node_modules`, or unrelated work. Avoid `git add .` unless you have checked every listed change and are sure they belong in this commit.

### 5. Commit with a meaningful message

Use this format:

```text
<type>(<JIRA-KEY>): <short imperative description>
```

Examples:

```bash
git commit -m "docs(BT-3): document local development setup"
```

Other examples:

```text
feat(BT-7): add budget summary
fix(BT-4): correct lint configuration
test(BT-4): add application smoke checks
chore(BT-5): add Docker configuration
```

Use `docs`, `feat`, `fix`, `test`, or `chore` to describe the kind of change. Say what the commit does, not just `updates`, `changes`, or `work done`. One commit should represent a coherent set of changes.

### 6. Push the branch

```bash
git push -u origin docs/BT-3-local-development-setup
```

The `-u` option connects your local branch to its remote counterpart, making later `git push` and `git pull` commands simpler.

Do not push directly to `main` or force-push a shared branch unless the project lead has explicitly instructed you and the repository policy permits it.

### 7. Open a pull request

On GitHub, open a pull request from your task branch into the team's agreed base branch. Include:

- The Jira issue key and link.
- A short description of what changed and why.
- Acceptance criteria addressed.
- Commands run and their results.
- Screenshots for visible UI changes, where useful.
- Known limitations or anything the reviewer needs to do.

Request the appropriate reviewer(s), respond to feedback, and push additional commits to the same branch when fixes are needed. The pull request updates automatically as the branch receives commits.

### 8. Keep the ticket in sync

Update Jira when work starts, when a blocker appears, and when a pull request is ready. Link the branch or pull request where the team's Jira integration or workflow supports it. Move the issue to **Done** only after the Definition of Done is satisfied and required review/merge steps are complete.

## Staging and committing changes

These commands help inspect exactly what Git will include:

```bash
# Current branch and short working-tree status
git status --short --branch

# Unstaged changes
git diff

# Stage one intended file
git add README.md

# Review staged changes
git diff --cached

# Commit staged changes
git commit -m "docs(BT-3): document local development setup"

# Push this branch
git push -u origin HEAD
```

If you staged a file by mistake but have not committed it, remove it from the staging area without deleting the file:

```bash
git restore --staged path/to/file
```

If you have already committed a change, do not rewrite a shared branch's history to hide it. Make a corrective commit or ask the team how to proceed. Never commit secrets and then assume deleting them in a later commit removes them from Git history.

## Pull request and review checklist

Before requesting review, confirm the following:

- [ ] The change directly addresses the Jira ticket and does not contain unrelated edits.
- [ ] The application starts locally using the documented instructions.
- [ ] `npm run lint` passes, if the script is configured.
- [ ] `npm run build` passes.
- [ ] Setup instructions and environment variable requirements are accurate.
- [ ] No secrets, local-only files, or generated dependencies are staged.
- [ ] The commit message includes the correct Jira key and describes the change.
- [ ] The pull request explains what changed and records test results.
- [ ] Review comments are resolved and required approvals/checks have passed.
- [ ] Jira reflects the actual status of the work.

For this setup-documentation issue, the Definition of Done is met when `README.md` is committed, its setup commands have been checked against `package.json` and the repository configuration, and a clean local setup has been tested successfully.

## Troubleshooting

### `node` or `npm` is not recognized

Install Node.js, close and reopen the terminal, then run `node --version` and `npm --version` again. If the command still is not found, check that Node.js is included in your system `PATH`.

### `npm ci` fails

Confirm you are in the directory containing `package.json` and `package-lock.json`. Check the Node.js version and read the exact npm error before changing dependencies. Do not delete the lockfile as a first troubleshooting step.

### Port 3000 is already in use

Read the terminal output for the alternate port Next.js selected, or stop the other process using port 3000 if you know it is safe to do so.

### `npm run lint` or `npm run build` is missing

Run `npm run` and compare the available scripts with this README. Update the documentation or add the agreed script in a separate, reviewed change. Do not report a check as passed unless it ran successfully.

### A change is missing from Git status

Check whether the file is ignored by `.gitignore`, whether it is outside the repository, or whether it has already been committed. Use `git status --ignored` only when investigating ignored files; do not force-add secrets or dependency folders.

### Git reports a merge conflict

Read the conflicted files, discuss competing changes with the relevant contributor, resolve the conflict deliberately, run the relevant checks, and only then continue the merge or rebase. Do not blindly choose one side when both contain required work.

## Learn more

- [Next.js Documentation](https://nextjs.org/docs) — learn about Next.js features and APIs.
- [Next.js Installation](https://nextjs.org/docs/app/getting-started/installation) — prerequisites and local setup.
- [Next.js Project Structure](https://nextjs.org/docs/app/getting-started/project-structure) — what the standard files and folders mean.
- [Learn Next.js](https://nextjs.org/learn) — an interactive Next.js tutorial.
- [Next.js CLI](https://nextjs.org/docs/app/api-reference/cli/next) — development, build, and production commands.
- [Next.js on GitHub](https://github.com/vercel/next.js) — the Next.js source repository.
- [GitHub: About pull requests](https://docs.github.com/en/pull-requests) — collaboration and code review.
- [GitHub: Writing code for a project](https://docs.github.com/en/pull-requests/concepts/writing-code-for-a-project) — branches, commits, and pull requests.

## Deployment

The easiest path for many Next.js applications is the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme), built by the creators of Next.js. Deployment configuration and environment variables must be set in the hosting platform before release.

Read the [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for deployment options and the requirements of each platform.

Local development setup and production deployment are separate tasks. Do not treat a successful local build as proof that the application has been deployed or configured correctly in production.
