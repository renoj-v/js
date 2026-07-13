// ============================================================
// 02 — FUNCTIONS (solution)
// ============================================================

function add(a, b) {
  return a + b;
}
console.log(add(2, 3));

const multiply = (a, b) => a * b;
console.log(multiply(4, 5));

function greet(name = "friend") {
  return `Hello, ${name}!`;
}
console.log(greet());
console.log(greet("Grace"));

function sum(...numbers) {
  return numbers.reduce((total, n) => total + n, 0);
}
console.log(sum(1, 2, 3, 4));

// TODO 1
function square(n) {
  return n * n;
}
console.log(square(6)); // 36

// TODO 2
const isEven = (n) => n % 2 === 0;
console.log(isEven(4)); // true
console.log(isEven(7)); // false

// TODO 3
function describePet(name, kind = "dog") {
  return `${name} is a ${kind}`;
}
console.log(describePet("Rex"));            // "Rex is a dog"
console.log(describePet("Whiskers", "cat")); // "Whiskers is a cat"

// TODO 4
function makeMultiplier(factor) {
  return function (n) {
    return n * factor;
  };
}
const triple = makeMultiplier(3);
console.log(triple(5)); // 15

if (typeof document !== "undefined") {
  const output = document.getElementById("output");
  if (output) {
    output.textContent = `add(2,3) = ${add(2, 3)}, greet() = ${greet()}`;
  }
}
