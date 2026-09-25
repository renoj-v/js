// ============================================================
// 09 — MODULES (solution)
// ============================================================

import { add, multiply, PI } from "./mathUtils.js";

console.log(add(2, 3));
console.log(multiply(2, 3));
console.log(PI);

import capitalize from "./stringUtils.js";

console.log(capitalize("ada"));

import formatName, { shout } from "./stringUtils.js";

console.log(formatName("grace"));
console.log(shout("hi"));

import { square as sq } from "./mathUtils.js";

console.log(sq(4));

import * as mathUtils from "./mathUtils.js";

console.log(mathUtils.add(10, 5));
console.log(Object.keys(mathUtils));

// TODO 1
function circleArea(radius) {
  return multiply(PI, multiply(radius, radius));
}
console.log(circleArea(2).toFixed(2)); // "12.57"

// TODO 2
function sumOfSquares(nums) {
  return nums.reduce((sum, n) => sum + sq(n), 0);
}
console.log(sumOfSquares([1, 2, 3])); // 14

// TODO 3
function announce(name) {
  return shout(capitalize(name));
}
console.log(announce("ada")); // "ADA!"

// TODO 4
function callMathFn(fnName, ...args) {
  return mathUtils[fnName](...args);
}
console.log(callMathFn("add", 2, 3)); // 5
console.log(callMathFn("multiply", 4, 5)); // 20

// TODO 5
async function loadFormatter() {
  const mod = await import("./stringUtils.js");
  return mod.default;
}

const fn = await loadFormatter();
console.log(fn("world")); // "World"

if (typeof document !== "undefined") {
  const output = document.getElementById("output");
  if (output) {
    output.textContent = "modules lesson running — open the console to see the order things log in";
  }
}
