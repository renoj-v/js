// ============================================================
// 05 — LOOPS AND ITERATION (solution)
// ============================================================

for (let i = 0; i < 5; i++) {
  console.log(i);
}

let n = 8;
while (n > 1) {
  n = n % 2 === 0 ? n / 2 : n * 3 + 1;
  console.log(n);
}

let attempts = 0;
do {
  attempts++;
} while (attempts < 0);
console.log(attempts);

const fruits = ["apple", "banana", "cherry"];
for (const fruit of fruits) {
  console.log(fruit);
}

for (const letter of "abc") {
  console.log(letter);
}

const car = { make: "Toyota", model: "Corolla", year: 2022 };
for (const key in car) {
  console.log(key, car[key]);
}

for (const num of [1, 2, 3, 4, 5, 6]) {
  if (num === 4) break;
  if (num % 2 === 0) continue;
  console.log(num);
}

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
  console.log(num);
}
console.log([...range]);

// TODO 1
function sumTo(n) {
  let total = 0;
  for (let i = 1; i <= n; i++) {
    total += i;
  }
  return total;
}
console.log(sumTo(5)); // 15

// TODO 2
function firstPowerOfTwoAbove(target) {
  let power = 1;
  while (power <= target) {
    power *= 2;
  }
  return power;
}
console.log(firstPowerOfTwoAbove(10)); // 16
console.log(firstPowerOfTwoAbove(200)); // 256

// TODO 3
const sentence = "The Quick Brown Fox";
let vowelCount = 0;
for (const char of sentence.toLowerCase()) {
  if ("aeiou".includes(char)) {
    vowelCount++;
  }
}
console.log(vowelCount); // 5

// TODO 4
const inventory = {
  widget: { price: 5, quantity: 10 },
  gadget: { price: 20, quantity: 3 },
  gizmo: { price: 8, quantity: 7 },
};
let totalValue = 0;
for (const key in inventory) {
  const item = inventory[key];
  totalValue += item.price * item.quantity;
}
console.log(totalValue); // 166

// TODO 5
const evensUpTo = {
  max: 10,
  [Symbol.iterator]() {
    let current = 2;
    const max = this.max;
    return {
      next() {
        if (current <= max) {
          const value = current;
          current += 2;
          return { value, done: false };
        }
        return { value: undefined, done: true };
      },
    };
  },
};
for (const num of evensUpTo) console.log(num); // 2 4 6 8 10
console.log([...evensUpTo]); // [2, 4, 6, 8, 10]

if (typeof document !== "undefined") {
  const output = document.getElementById("output");
  if (output) {
    output.textContent = `fruits = ${fruits.join(", ")}, range = ${[...range]}`;
  }
}
