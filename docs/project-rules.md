# Polaris Project Rules

## Development Order

Work in this order for implementation tasks:

1. Code changes
2. Linting
3. Tests, including browser verification for UI work
4. Formatting
5. Git commits

Do not bundle unrelated work into one commit. Split commits by feature, code area, or file group so each commit has a clear reason to exist.

## File And Folder Shape

- Keep each source file at 500 lines or fewer.
- Do not place many unrelated files in one directory.
- Create feature or domain folders when a group of files begins to form a unit.
- Prefer small components and focused data modules over one large page file.

## Coding Style

Use TypeScript and Svelte idiomatically, while borrowing the useful parts of Go style:

- Favor simple, explicit control flow.
- Keep names short when the scope is small and descriptive when the scope is broad.
- Prefer flat, readable code over deeply nested abstractions.
- Make data shapes clear near the code that consumes them.
- Add abstractions only when they remove real duplication or clarify ownership.

Do not force Go syntax or patterns into Svelte. Absorb the clarity, not the costume.

## Product UX Rules

- Maintain a Polaris logo, favicon, and route-aware browser title.
- Korean text should avoid awkward character-level line breaks; use layout and CSS that preserve word readability.
- Header controls should use familiar controls: language as a dropdown, display settings as a modal.

## Verification

- For UI changes, test in a browser at desktop and mobile widths.
- Check that no horizontal overflow appears.
- Check that modals, dropdowns, and route titles behave as expected.
- Run formatting after linting and tests, then commit focused groups of files.
