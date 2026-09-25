# this-and-context — this and Context

`this` isn't determined by where a function is defined — it's determined by
how it's CALLED (the call-site). This lesson covers:

- call-site rules — `obj.method()` vs a bare `fn()` vs `new Fn()`
- losing `this` — detaching a method, or passing it as a callback
- arrow functions — no own `this`, inherited lexically from the enclosing scope, and why that's usually wrong for object methods
- `call`/`apply`/`bind` — explicitly choosing what `this` is, immediately or permanently

## Files

- `lesson.js` — commented walkthrough plus 4 TODO exercises for you to solve.
- `solution.js` — worked answers to those TODOs.
- `index.html` — open in a browser (or use a tool like `live-server`) and check the console for output.

Work through `lesson.js` top to bottom, fill in the TODOs, then compare against `solution.js`.
