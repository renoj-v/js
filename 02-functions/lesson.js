// ============================================================
// 02 — FUNCTIONS
// ============================================================
//
// JavaScript has several ways to write functions:
//
//   function greet() { ... }        // function declaration
//   const greet = function() {...}  // function expression
//   const greet = () => { ... }     // arrow function
//
// Key differences to notice as you go:
//   - Function declarations are "hoisted" (usable before they
//     appear in the file). Expressions and arrow functions are not.
//   - Arrow functions don't get their own `this` (see lesson 07).
//   - All of them can take default parameters and rest parameters.

// --- read-through example ---

function add(a, b) {
  return a + b;
}
console.log(add(2, 3)); // 5

const multiply = (a, b) => a * b;
console.log(multiply(4, 5)); // 20

// default parameters
function greet(name = "friend") {
  return `Hello, ${name}!`;
}
console.log(greet());        // "Hello, friend!"
console.log(greet("Grace")); // "Hello, Grace!"

// rest parameters — gather any number of args into an array
function sum(...numbers) {
  return numbers.reduce((total, n) => total + n, 0);
}
console.log(sum(1, 2, 3, 4)); // 10

// --- TODO 1 ---
// Write a function `square` (any style you like) that takes a
// number and returns its square. Log square(6).

function square (x = 0) {
  return x * x;
}

console.log(square(6));

// --- TODO 2 ---
// Write an arrow function `isEven` that takes a number and
// returns true/false depending on whether it's even.
// Log isEven(4) and isEven(7).
 
const isEven = (x) => {
  return x % 2 == 0 ? true : false;
}

console.log(isEven(4));
console.log(isEven(7));
// --- TODO 3 ---
// Write a function `describePet` with a default parameter:
// describePet(name, kind = "dog") should return
// e.g. "Rex is a dog" or "Whiskers is a cat" if kind is passed.


const describePet = function(name, kind="dog") {
  return `${name} is a ${kind}`;
}

console.log(describePet("Rex"));
console.log(describePet("Whiskers", "cat"));

// --- TODO 4 ---
// Higher-order functions: functions that take/return functions.
// Write a function `makeMultiplier(factor)` that RETURNS a new
// function which multiplies its input by `factor`.
//
// const triple = makeMultiplier(3);
// console.log(triple(5)); // should log 15


if (typeof document !== "undefined") {
  const output = document.getElementById("output");
  if (output) {
    output.textContent = `add(2,3) = ${add(2, 3)}, greet() = ${greet()}`;
  }
}
