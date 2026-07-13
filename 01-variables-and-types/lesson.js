// ============================================================
// 01 — VARIABLES AND TYPES
// ============================================================
//
// JavaScript has three ways to declare a variable:
//   let    -> can be reassigned, block-scoped
//   const  -> cannot be reassigned, block-scoped
//   var    -> old-school, function-scoped (avoid using this)
//
// JavaScript has these primitive types:
//   string, number, boolean, undefined, null, symbol, bigint
// ...and one non-primitive type you'll use constantly: object
// (arrays and functions are technically objects too)
//
// Open this file's index.html with the dev server running
// (npm run dev) and check your browser console, or run it
// directly with: npm run node -- 01-variables-and-types/lesson.js

// --- read-through example ---

let score = 10; // can change later
const playerName = "Ada"; // cannot be reassigned

score = score + 5;
console.log(`${playerName}'s score is now ${score}`);

// typeof tells you a value's type at runtime
console.log(typeof score); // "number"
console.log(typeof playerName); // "string"
console.log(typeof true); // "boolean"
console.log(typeof undefined); // "undefined"
console.log(typeof null); // "object" <- a famous JS quirk, worth remembering!

// --- TODO 1 ---
// Declare a `const` called `isLearning` and set it to true.
// Then log its value and its typeof.


// --- TODO 2 ---
// Declare a `let` called `temperature` set to 72.
// Reassign it to 75.
// Log the final value.


// --- TODO 3 ---
// Try reassigning `playerName` above (uncomment the line below)
// and run this file. Read the error message carefully — what
// does it tell you about `const`?
//
// playerName = "Grace";


// --- TODO 4 ---
// Predict the output of the following BEFORE running it,
// then uncomment and check your prediction:
//
// console.log(typeof (10 + "5"));
// console.log(10 + "5");
// console.log("10" - 5);


// --- output helper for the browser (see index.html) ---
// If you're running this in the browser, this will also render
// your score to the page. Safe to ignore when running in Node.
if (typeof document !== "undefined") {
  const output = document.getElementById("output");
  if (output) {
    output.textContent = `${playerName}'s score: ${score}`;
  }
}
