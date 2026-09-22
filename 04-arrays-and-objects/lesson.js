// ============================================================
// 04 — ARRAYS AND OBJECTS
// ============================================================
//
// Arrays and objects are how JS groups values together.
//   - Arrays: ordered lists, indexed by number, with lots of
//     built-in iteration methods (map, filter, reduce, forEach...).
//   - Objects: unordered key/value bags, keys are strings (or symbols).
//
// Destructuring and spread/rest let you pull values out of (or
// combine values into) arrays and objects without manual
// index/key lookups.

// --- read-through example: array methods ---

const numbers = [1, 2, 3, 4, 5];

const doubled = numbers.map((n) => n * 2);
console.log(doubled); // [2, 4, 6, 8, 10]

const evens = numbers.filter((n) => n % 2 === 0);
console.log(evens); // [2, 4]

const total = numbers.reduce((sum, n) => sum + n, 0);
console.log(total); // 15

// map/filter/reduce all return NEW values — they don't mutate
// the original array.
console.log(numbers); // still [1, 2, 3, 4, 5]

// --- read-through example: destructuring ---

const point = { x: 10, y: 20 };
const { x, y } = point;
console.log(x, y); // 10 20

const coords = [1, 2, 3];
const [first, second] = coords;
console.log(first, second); // 1 2

// destructuring with renaming and a default value
const { x: posX, z = 0 } = point;
console.log(posX, z); // 10 0

// --- read-through example: spread and rest ---

const arr1 = [1, 2, 3];
const arr2 = [...arr1, 4, 5]; // spread: copy arr1's items into a new array
console.log(arr2); // [1, 2, 3, 4, 5]

const person = { name: "Ada", age: 30 };
const updatedPerson = { ...person, age: 31 }; // spread into a new object
console.log(updatedPerson); // { name: "Ada", age: 31 }
console.log(person.age); // 30 — original is untouched

function logAll(...args) {
  // rest: gathers however many arguments are passed into one array
  console.log(args);
}
logAll(1, 2, 3); // [1, 2, 3]

// --- read-through example: shallow vs deep copy ---

const original = { name: "Ada", address: { city: "London" } };
const shallowCopy = { ...original };
shallowCopy.name = "Grace"; // fine — top-level property, doesn't affect original
shallowCopy.address.city = "Paris"; // NOT fine — nested object is shared!
console.log(original.name); // "Ada" — untouched
console.log(original.address.city); // "Paris" — oops, mutated the original too!
// Spread only copies one level deep. For nested structures, use
// structuredClone(), or copy each nested level yourself.

// --- TODO 1 ---
// Given `prices`, use .map() to create a new array `withTax` where
// each price has 8% tax added.
//
// const prices = [10, 25, 50, 100];
// console.log(withTax); // [10.8, 27, 54, 108]

const prices = [10, 25, 50, 100];
console.log(prices.map((price) => { return price * 1.08; }));

// --- TODO 2 ---
// Given `products`, find the total value (price * quantity) of all
// products that are `inStock`. Use .filter() and .reduce() (you can
// chain them).
//
// console.log(inStockValue); // 550  (50*3 + 200*2)

const products = [
  { name: "Keyboard", price: 50, quantity: 3, inStock: true },
  { name: "Mouse", price: 20, quantity: 5, inStock: false },
  { name: "Monitor", price: 200, quantity: 2, inStock: true },
];

let inStockValue = products.filter(p => p.inStock).reduce((acc, p) => p.price * p.quantity + acc, 0);
console.log(inStockValue);

// --- TODO 3 ---
// Destructure `city` and `country` out of `address` below, and
// destructure the first two items out of `topScores` into
// `gold` and `silver`.
//
// console.log(city, country); // "London" "UK"
// console.log(gold, silver);  // 98 91

const address = { street: "221B Baker St", city: "London", country: "UK" };
const topScores = [98, 91, 87, 80];

// --- TODO 4 ---
// Write a function `mergeSettings(defaults, overrides)` that returns
// a NEW object combining both, where `overrides` wins on conflicts.
// Use spread — don't mutate either argument.
//
// const result = mergeSettings({ theme: "light", fontSize: 14 }, { theme: "dark" });
// console.log(result); // { theme: "dark", fontSize: 14 }

// --- TODO 5 ---
// `originalUser` below has a nested `stats` object. Write a function
// `deepCloneUser(user)` that returns a copy where changing the
// clone's nested `stats.wins` does NOT affect the original.
// (Hint: structuredClone(), or spread both the top level and the
// nested `stats` object.)
//
// const clonedUser = deepCloneUser(originalUser);
// clonedUser.stats.wins = 100;
// console.log(originalUser.stats.wins); // should still be 5

const originalUser = { name: "Ada", stats: { wins: 5, losses: 2 } };

if (typeof document !== "undefined") {
  const output = document.getElementById("output");
  if (output) {
    output.textContent = `doubled = ${doubled}, total = ${total}`;
  }
}
