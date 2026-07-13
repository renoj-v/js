// ============================================================
// 03 — SCOPE AND CLOSURES
// ============================================================
//
// Scope = where a variable is visible/accessible.
//   - Global scope: visible everywhere.
//   - Function scope: visible only inside that function.
//   - Block scope ({ }): `let`/`const` are block-scoped, `var` is not.
//
// A closure is a function that "remembers" the variables from
// the scope it was created in, even after that outer scope has
// finished running. This is one of the most important — and
// most interview-tested — JS concepts.

// --- read-through example: block scope ---

if (true) {
  let blockScoped = "I only exist in this block";
  var functionScoped = "I leak out of the block";
}
// console.log(blockScoped); // ReferenceError if uncommented
console.log(functionScoped); // works — var ignores block boundaries

// --- read-through example: a closure ---

function makeCounter() {
  let count = 0; // "count" is captured by the returned function below

  return function () {
    count += 1;
    return count;
  };
}

const counter = makeCounter();
console.log(counter()); // 1
console.log(counter()); // 2
console.log(counter()); // 3
// Each call to makeCounter() would create a brand new, independent `count`.

// --- TODO 1 ---
// Write a function `makeGreeter(greeting)` that returns a function
// which takes a `name` and returns `${greeting}, ${name}!`.
//
// const sayHello = makeGreeter("Hello");
// console.log(sayHello("Ada")); // "Hello, Ada!"


// --- TODO 2 ---
// The classic closure-in-a-loop gotcha. Predict what this logs,
// then uncomment and run it:
//
// const fns = [];
// for (var i = 0; i < 3; i++) {
//   fns.push(() => console.log(i));
// }
// fns.forEach((fn) => fn()); // what does this print? why?
//
// Now change `var` to `let` above and run again — what changes,
// and why? (Hint: it's about scope, not closures themselves.)


// --- TODO 3 ---
// Write a function `makeBankAccount(initialBalance)` that returns
// an object with two methods: `deposit(amount)` and `getBalance()`.
// The balance should be private — only accessible through these
// methods, not directly from outside.
//
// const account = makeBankAccount(100);
// account.deposit(50);
// console.log(account.getBalance()); // 150


if (typeof document !== "undefined") {
  const output = document.getElementById("output");
  if (output) {
    output.textContent = `counter() called 3x -> ${counter()}`;
  }
}
