// ============================================================
// 01 — VARIABLES AND TYPES (solution)
// ============================================================
// Try the exercises in lesson.js yourself first!

let score = 10;
const playerName = "Ada";

score = score + 5;
console.log(`${playerName}'s score is now ${score}`);

console.log(typeof score);
console.log(typeof playerName);
console.log(typeof true);
console.log(typeof undefined);
console.log(typeof null);

// TODO 1
const isLearning = true;
console.log(isLearning, typeof isLearning);

// TODO 2
let temperature = 72;
temperature = 75;
console.log(temperature);

// TODO 3
// Uncommenting `playerName = "Grace";` throws:
//   TypeError: Assignment to constant variable.
// This confirms `const` bindings can't be reassigned after
// their initial declaration.

// TODO 4
console.log(typeof (10 + "5")); // "string" — number+string coerces to string
console.log(10 + "5");          // "105"    — concatenation, not addition
console.log("10" - 5);          // 5        — "-" coerces "10" back to a number

if (typeof document !== "undefined") {
  const output = document.getElementById("output");
  if (output) {
    output.textContent = `${playerName}'s score: ${score}`;
  }
}
