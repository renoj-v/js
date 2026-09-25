# modules — Modules

ES modules let you split code across files, each with its own scope — code
is only shared when explicitly exported and imported. This lesson covers:

- named imports/exports — `export function foo() {}` / `import { foo } from "./x.js"`, as many per module as you want
- default exports — `export default ...`, at most one per module, imported without braces under any local name
- renaming — `import { foo as bar }` to avoid collisions
- namespace imports — `import * as ns from "./x.js"` for grabbing everything at once, including dynamic lookup by name
- dynamic `import()` — lazily loading a module at runtime instead of at the top of the file

## Files

- `lesson.js` — commented walkthrough plus 5 TODO exercises for you to solve.
- `solution.js` — worked answers to those TODOs.
- `index.html` — open in a browser (or use a tool like `live-server`) and check the console for output.
- `mathUtils.js` / `stringUtils.js` — small "given" library modules that `lesson.js`/`solution.js` import from. You don't need to edit these — open them to see the export side of every import below.

Work through `lesson.js` top to bottom, fill in the TODOs, then compare against `solution.js`.
