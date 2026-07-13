// ============================================================
// 03 — SCOPE AND CLOSURES (solution)
// ============================================================

if (true) {
  let blockScoped = "I only exist in this block";
  var functionScoped = "I leak out of the block";
}
console.log(functionScoped);

function makeCounter() {
  let count = 0;
  return function () {
    count += 1;
    return count;
  };
}
const counter = makeCounter();
console.log(counter());
console.log(counter());
console.log(counter());

// TODO 1
function makeGreeter(greeting) {
  return function (name) {
    return `${greeting}, ${name}!`;
  };
}
const sayHello = makeGreeter("Hello");
console.log(sayHello("Ada")); // "Hello, Ada!"

// TODO 2
const fns = [];
for (var i = 0; i < 3; i++) {
  fns.push(() => console.log(i));
}
fns.forEach((fn) => fn());
// Logs 3, 3, 3 — with `var`, there's only ONE shared `i` (function-scoped),
// and by the time the arrow functions run, the loop has already finished
// and `i` is 3.
//
// Switching to `let` logs 0, 1, 2 — `let` creates a NEW binding of `i`
// for each loop iteration, so each closure captures its own separate `i`.

// TODO 3
function makeBankAccount(initialBalance) {
  let balance = initialBalance; // private — not accessible from outside
  return {
    deposit(amount) {
      balance += amount;
    },
    getBalance() {
      return balance;
    },
  };
}
const account = makeBankAccount(100);
account.deposit(50);
console.log(account.getBalance()); // 150

if (typeof document !== "undefined") {
  const output = document.getElementById("output");
  if (output) {
    output.textContent = `counter() called 3x -> ${counter()}`;
  }
}
