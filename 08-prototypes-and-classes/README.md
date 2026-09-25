# prototypes-and-classes — Prototypes and Classes

Every JS object has a hidden link to another object — its prototype — and
`class` syntax is mostly sugar over that same system. This lesson covers:

- the prototype chain — constructor functions, `Fn.prototype`, and how property lookups walk up the chain
- `class` syntax — constructors and instance methods, and how they map onto prototypes underneath
- inheritance — `extends`/`super`, and `instanceof` across a chain
- static methods — members that live on the class itself, not on instances
- getters/setters — properties that run code but read/write like plain fields

## Files

- `lesson.js` — commented walkthrough plus 4 TODO exercises for you to solve.
- `solution.js` — worked answers to those TODOs.
- `index.html` — open in a browser (or use a tool like `live-server`) and check the console for output.

Work through `lesson.js` top to bottom, fill in the TODOs, then compare against `solution.js`.
