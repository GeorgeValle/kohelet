---
name: docs-maintenance
description: Use when updating project documentation, docs/task.md, docs/phases/*, docs/decisions.md, docs/index.md, roadmap.md, project_requirements.md, DESIGN.md, or when implementation changes scope, architecture, modules, data model, storage, editor behavior, export behavior, or Codex workflow. Do not use for tiny code-only fixes with no behavior or documentation impact.
---

# Docs Maintenance Skill — Kohelet

Use this skill when maintaining Kohelet documentation, especially after implementation work changes behavior, architecture, scope, modules, or decisions.

The goal is to keep `AGENTS.md` small and keep long-lived knowledge in the right document.

## Required reading

Before documentation changes, read the relevant files:

1. `roadmap.md`
2. `project_requirements.md`
3. `DESIGN.md`, if UX/UI changed
4. `docs/index.md`, if it exists
5. `docs/task.md`, if it exists
6. `docs/decisions.md`, if it exists
7. Current phase file under `docs/phases/`, if it exists
8. The code files that changed, if documenting implementation

## Documentation roles

Use the right document for the right job:

```text
AGENTS.md
→ behavior rules for Codex/agentes, workflow expectations, validation commands.

DESIGN.md
→ UX, layout, visual system, themes, component behavior, design rules.

roadmap.md
→ product vision, phases, priorities, scope direction.

project_requirements.md
→ technical contract, stack, architecture, model, modules, constraints.

docs/index.md
→ documentation map and where to find things.

docs/task.md
→ living checklist of remaining/done work.

docs/decisions.md
→ decisions made and why.

docs/phases/*
→ what was implemented in each phase.
```

Do not duplicate full content across many docs. Cross-reference instead.

## When to update docs

Update docs when a change affects:

```text
module scope
1.0 vs post-1.0 boundaries
data model
storage behavior
editor behavior
export behavior
UI layout / design system
i18n conventions
testing strategy
Codex workflow
folder structure
public project terminology
```

Small internal refactors may not require docs unless they change how future agents should work.

## docs/task.md conventions

`docs/task.md` is a living checklist.

Recommended structure:

```md
# Task Checklist

## Current phase

- [ ] Item not started
- [x] Item completed
- [~] Item in progress / partial

## 1.0 Core

- [ ] ...

## Post-1.0

- [ ] ...
```

Each checklist item should be short and actionable.

Avoid turning `docs/task.md` into a long essay.

## docs/decisions.md conventions

Use decision records for meaningful decisions.

Recommended format:

```md
## YYYY-MM-DD — Decision title

Status: Accepted | Revisited | Superseded

Decision:
Brief statement of what was decided.

Rationale:
Why this decision was made.

Implications:
What this changes for implementation or future work.
```

Record decisions such as:

```text
StoryWorld as top-level container
Scene as mandatory writing unit
Narrative Core as 1.0 module
RTF as first export target
CSS Modules as component styling strategy
Light/dark/system theme support
```

## docs/phases conventions

Each phase file should summarize implementation, not repeat every line of code.

Recommended naming:

```text
docs/phases/phase-01-foundation.md
docs/phases/phase-02-editor-core.md
docs/phases/phase-03-project-structure.md
docs/phases/phase-04-writing-modules.md
docs/phases/phase-05-export.md
docs/phases/phase-06-polish-release.md
```

Recommended format:

```md
# Phase 01 — Foundation

## Goal

## Implemented

## Not implemented yet

## Decisions

## Follow-up tasks

## Validation
```

## docs/index.md conventions

`docs/index.md` should help humans and Codex find the right document quickly.

Include:

```text
root docs
technical docs
phase docs
when to read each doc
which docs to update after changes
```

Keep it concise.

## Updating project_requirements.md

Update `project_requirements.md` when technical contract changes:

```text
stack
architecture
model entities
module scope
storage rules
export rules
testing rules
folder structure
i18n rules
Codex implementation constraints
```

Do not put day-to-day task progress here.

## Updating roadmap.md

Update `roadmap.md` when product direction, phases, or scope boundaries change.

Do not use it for detailed implementation notes.

## Updating DESIGN.md

Update `DESIGN.md` when changing:

```text
color tokens
themes
layout modes
panel behavior
button/component styling rules
typography
accessibility rules
visual anti-patterns
```

If visual implementation changes but `DESIGN.md` still says the old thing, update the doc or revert the implementation.

## AGENTS.md boundaries

Keep `AGENTS.md` lean.

Good content for `AGENTS.md`:

```text
which docs to read
validation commands
repo-wide rules
skill routing
critical do/don't rules
```

Move detailed workflows into:

```text
docs/codex-workflow.md
skills under .agents/skills/
specific docs under docs/
```

## Honesty rule

When documenting validation, distinguish clearly between:

```text
Ran and passed
Ran and failed
Not run
Not available
```

Do not claim a command passed if it was not actually run.

## Do not

- Do not inflate `AGENTS.md` with long technical details.
- Do not duplicate entire sections from `project_requirements.md` into `roadmap.md`.
- Do not mark tasks as done unless implementation exists.
- Do not hide post-1.0 features inside 1.0 docs.
- Do not change scope silently.
- Do not remove decisions without recording supersession.

## Completion checklist

Before finishing a docs-maintenance task:

1. Updated the smallest set of docs needed.
2. Kept each doc's role clear.
3. Updated `docs/task.md` if task status changed.
4. Added a decision record if a meaningful decision was made.
5. Updated phase file if implementation landed.
6. Avoided duplicating large sections unnecessarily.
7. Validation status is honest.
