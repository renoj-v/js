# async-callbacks-promises-async-await — Async: Callbacks, Promises, Async/Await

JavaScript is single-threaded, but I/O (timers, network requests, file
reads) doesn't block that thread — you register work to run later,
when it finishes. This lesson covers:

- callbacks — passing a function to run when async work completes, and why nesting them ("callback hell") gets unreadable
- promises — `new Promise`, `.then`/`.catch`/`.finally`, and the pending/fulfilled/rejected states
- chaining — returning values or promises from `.then` to sequence steps instead of nesting
- `async`/`await` — synchronous-looking syntax built on promises, plus `try`/`catch` for error handling
- `Promise.all` — running independent async work concurrently instead of one-at-a-time
- `Promise.allSettled` — collecting results even when some promises reject

## Files

- `lesson.js` — commented walkthrough plus 5 TODO exercises for you to solve.
- `solution.js` — worked answers to those TODOs.
- `index.html` — open in a browser (or use a tool like `live-server`) and check the console for output.

Work through `lesson.js` top to bottom, fill in the TODOs, then compare against `solution.js`. Since everything here is async, pay attention to the ORDER things log in, not just their values.
