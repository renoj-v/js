// ============================================================
// 09 — MODULES
// ============================================================
//
// Modules let you split code across files, each with its own
// scope — nothing is global by default. A file shares code by
// EXPORTing it, and other files pull it in by IMPORTing it.
// This repo already runs everything as ES modules ("type": "module"
// in package.json, and <script type="module"> in each index.html),
// so `import`/`export` work directly, no bundler needed.
//
// This lesson has two extra files sitting next to it:
//   - mathUtils.js   — named exports: PI, add, multiply, square
//   - stringUtils.js — a default export (capitalize) + a named
//     export (shout)
// Open them — they're short. Everything below imports from them.

// --- read-through example: named imports ---
//
// mathUtils.js has: `export const PI = ...`, `export function add...`
// A named import's braces must match the export's name exactly
// (unless you rename it with `as` — see below).

import { add, multiply, PI } from "./mathUtils.js";

console.log(add(2, 3)); // 5
console.log(multiply(2, 3)); // 6
console.log(PI); // 3.14159

// --- read-through example: default import ---
//
// stringUtils.js has: `export default function capitalize...`
// A default import has NO braces, and you can call it whatever you
// want on this side — the name isn't tied to how it was exported.

import capitalize from "./stringUtils.js";

console.log(capitalize("ada")); // "Ada"

// --- read-through example: mixing a default and named import ---
//
// A single import statement can pull in a module's default export
// AND its named exports together.

import formatName, { shout } from "./stringUtils.js";

console.log(formatName("grace")); // "Grace" — same function as `capitalize`, just a different local name
console.log(shout("hi")); // "HI!"

// --- read-through example: renaming a named import ---
//
// Useful to avoid name collisions, or just for a clearer local name.

import { square as sq } from "./mathUtils.js";

console.log(sq(4)); // 16

// --- read-through example: namespace import ---
//
// `import * as name` bundles every named export (and, as `.default`,
// the default export) into one object. Handy when you want to pass
// "the whole module" around, or look up an export dynamically by name.

import * as mathUtils from "./mathUtils.js";

console.log(mathUtils.add(10, 5)); // 15
console.log(Object.keys(mathUtils)); // ["PI", "add", "multiply", "square"]

// --- read-through: default vs named, at a glance ---
//
//   export default function foo() {}   // at most ONE per module
//   export function bar() {}           // as many as you want
//
//   import anything   from "./x.js";   // default: name is your choice
//   import { bar }    from "./x.js";   // named: name must match (or use `as`)
//
// Rule of thumb: default export for "the one main thing this file
// provides" (like stringUtils' capitalize), named exports for a
// grab-bag of related utilities (like mathUtils).

// --- shared imports for the TODOs below ---
// (already imported above: add, multiply, PI, capitalize, shout, sq, mathUtils)

// --- TODO 1 ---
// Write `circleArea(radius)` using `multiply` and `PI` from
// mathUtils.js (don't use Math.PI or the `*` operator directly).

function circleArea(radius) {

}

console.log(circleArea(2).toFixed(2)); // "12.57"

// --- TODO 2 ---
// Write `sumOfSquares(nums)` that returns the sum of the squares of
// every number in the array, using `sq` (the renamed `square`
// import from above).

function sumOfSquares(nums) {

}

console.log(sumOfSquares([1, 2, 3])); // 14  (1 + 4 + 9)

// --- TODO 3 ---
// Write `announce(name)` that capitalizes `name` (using `capitalize`)
// and then shouts it (using `shout`), returning the combined result.

function announce(name) {

}

console.log(announce("ada")); // "ADA!"

// --- TODO 4 ---
// Write `callMathFn(fnName, ...args)` that looks up `fnName` on the
// `mathUtils` namespace import and calls it with `...args`. This is
// the kind of dynamic dispatch a namespace import makes easy — you
// couldn't do this with named imports alone, since `add` and
// `multiply` would just be separate local variables.

function callMathFn(fnName, ...args) {

}

console.log(callMathFn("add", 2, 3)); // 5
console.log(callMathFn("multiply", 4, 5)); // 20

// --- TODO 5 ---
// Write an async function `loadFormatter()` that DYNAMICALLY imports
// "./stringUtils.js" using `await import(...)` (instead of a static
// top-of-file import) and returns its default export. Dynamic
// import() returns a promise for the module's namespace object —
// useful for lazy-loading code that isn't always needed.
//
// const fn = await loadFormatter();
// console.log(fn("world")); // "World"

async function loadFormatter() {

}

const fn = await loadFormatter();
console.log(fn("world")); // "World"

if (typeof document !== "undefined") {
  const output = document.getElementById("output");
  if (output) {
    output.textContent = "modules lesson running — open the console to see the order things log in";
  }
}
