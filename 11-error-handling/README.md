# error-handling — Error Handling

`throw` raises an error, `try/catch` catches it, `finally` runs regardless.
Async code has its own propagation rules built on the same mechanism. This
lesson covers:

- `try`/`catch`/`finally` — and what actually lands in the `catch` variable
- the anatomy of an `Error` — `.message`, `.name`, `.stack`, and why you should always throw an `Error` (or subclass) instead of a plain value
- custom error classes — `extends Error` so callers can use `instanceof` to branch on error KIND instead of parsing message strings
- async error handling — a rejected promise is just an async `throw`; `await` on it throws into a surrounding `try/catch`
- rethrowing and wrapping — adding context to an error with `{ cause }` (ES2022) instead of swallowing or losing the original

## Files

- `lesson.js` — commented walkthrough plus 4 TODO exercises for you to solve.
- `solution.js` — worked answers to those TODOs.
- `index.html` — open in a browser (or use a tool like `live-server`) and check the console for output.

Work through `lesson.js` top to bottom, fill in the TODOs, then compare against `solution.js`. Note: leaving a TODO blank here generally won't crash the script (an unfilled function just returns `undefined`, and nothing throws) — compare the console output against the comments carefully rather than waiting for an error.
