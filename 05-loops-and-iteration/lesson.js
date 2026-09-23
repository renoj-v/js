// ============================================================
// 05 — LOOPS AND ITERATION
// ============================================================
//
// Loops repeat a block of code. JS gives you several flavors,
// each suited to a different situation:
//   - for            : you know how many times (a counter).
//   - while / do...while : you don't know how many times, only
//     when to stop.
//   - for...of       : step through the VALUES of anything
//     iterable (arrays, strings, Maps, Sets...).
//   - for...in       : step through the ENUMERABLE KEYS of an
//     object (use with care on arrays — see below).
//   - iterators/iterables : the protocol that makes for...of work,
//     and how to build your own iterable.

// --- read-through example: classic for loop ---

for (let i = 0; i < 5; i++) {
  console.log(i); // 0 1 2 3 4
}
// The three parts: init (let i = 0), condition (i < 5), and the
// step that runs after each pass (i++). All three are optional.

// --- read-through example: while and do...while ---

let n = 8;
while (n > 1) {
  n = n % 2 === 0 ? n / 2 : n * 3 + 1; // Collatz sequence
  console.log(n);
}
// while checks the condition BEFORE running the body — it might
// run zero times.

let attempts = 0;
do {
  attempts++;
} while (attempts < 0); // condition is false immediately
console.log(attempts); // 1 — do...while always runs at least once

// --- read-through example: for...of ---

const fruits = ["apple", "banana", "cherry"];
for (const fruit of fruits) {
  console.log(fruit);
}
// for...of gives you VALUES directly — no index bookkeeping.
// It also works on strings (iterates characters), Maps, Sets, etc.

for (const letter of "abc") {
  console.log(letter); // "a" "b" "c"
}

// --- read-through example: for...in ---

const car = { make: "Toyota", model: "Corolla", year: 2022 };
for (const key in car) {
  console.log(key, car[key]);
}
// for...in gives you KEYS (as strings), and walks the whole
// prototype chain's enumerable properties — that's why it's
// generally avoided for arrays (use for...of or .forEach instead,
// since for...in would give you index strings, "0", "1", "2"...).

// --- read-through example: break and continue ---

for (const num of [1, 2, 3, 4, 5, 6]) {
  if (num === 4) break; // stop the loop entirely
  if (num % 2 === 0) continue; // skip to the next iteration
  console.log(num); // 1 3
}

// --- read-through example: iterators and iterables ---
//
// for...of works on anything "iterable" — anything with a
// Symbol.iterator method that returns an iterator (an object
// with a .next() method returning { value, done }).

const range = {
  from: 1,
  to: 3,
  [Symbol.iterator]() {
    let current = this.from;
    const last = this.to;
    return {
      next() {
        if (current <= last) {
          return { value: current++, done: false };
        }
        return { value: undefined, done: true };
      },
    };
  },
};

for (const num of range) {
  console.log(num); // 1 2 3
}
console.log([...range]); // [1, 2, 3] — spread also uses the iterator protocol

// --- TODO 1 ---
// Write a function `sumTo(n)` that uses a `for` loop to add up
// every whole number from 1 to n (inclusive) and returns the total.
//
// console.log(sumTo(5)); // 15  (1+2+3+4+5)

// --- TODO 2 ---
// Write a function `firstPowerOfTwoAbove(target)` that uses a
// `while` loop to find and return the smallest power of 2 that is
// greater than `target`.
//
// console.log(firstPowerOfTwoAbove(10)); // 16
// console.log(firstPowerOfTwoAbove(200)); // 256

// --- TODO 3 ---
// Given `sentence`, use `for...of` to count how many vowels
// (a, e, i, o, u — case-insensitive) it contains. Store the
// result in `vowelCount`.
//
// const sentence = "The Quick Brown Fox";
// console.log(vowelCount); // 5

// --- TODO 4 ---
// Given `inventory`, use `for...in` to build a single number,
// `totalValue`, equal to the sum of (price * quantity) across
// every item in the object.
//
// const inventory = {
//   widget: { price: 5, quantity: 10 },
//   gadget: { price: 20, quantity: 3 },
//   gizmo: { price: 8, quantity: 7 },
// };
// console.log(totalValue); // 166

// --- TODO 5 ---
// Write a custom iterable object `evensUpTo` (like `range` above)
// whose `[Symbol.iterator]` yields only even numbers from 2 up to
// (and including) `evensUpTo.max`. Use it in a for...of loop and
// also collect it into an array with spread.
//
// evensUpTo.max = 10;
// for (const n of evensUpTo) console.log(n); // 2 4 6 8 10
// console.log([...evensUpTo]); // [2, 4, 6, 8, 10]

if (typeof document !== "undefined") {
  const output = document.getElementById("output");
  if (output) {
    output.textContent = `fruits = ${fruits.join(", ")}, range = ${[...range]}`;
  }
}
