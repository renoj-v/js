# es6-plus-features — ES6+ Features

A grab-bag of syntax that makes everyday JS less noisy. You've already used
basic destructuring and spread/rest in 04-arrays-and-objects — this lesson
covers the rest of the toolbox:

- template literals — interpolation, multiline strings, and tagged templates (a function that receives a literal's string pieces and values separately)
- destructuring beyond the basics — nested + renamed in one go, defaults inside function parameters, the swap-without-a-temp-variable trick
- optional chaining (`?.`) — short-circuits to `undefined` at the first missing link instead of throwing, works on calls and computed access too
- nullish coalescing (`??`) — falls back only on `null`/`undefined`, unlike `||` which falls back on any falsy value (`0`, `""`, `false`)
- logical assignment (`||=`, `??=`) — assign only if a condition holds

## Files

- `lesson.js` — commented walkthrough plus 4 TODO exercises for you to solve.
- `solution.js` — worked answers to those TODOs.
- `index.html` — open in a browser (or use a tool like `live-server`) and check the console for output.

Work through `lesson.js` top to bottom, fill in the TODOs, then compare against `solution.js`. Note: as with 11-error-handling, leaving a TODO blank here won't crash the script — compare console output against the comments rather than waiting for an error.
