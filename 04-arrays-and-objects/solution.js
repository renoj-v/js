// ============================================================
// 04 — ARRAYS AND OBJECTS (solution)
// ============================================================

const numbers = [1, 2, 3, 4, 5];

const doubled = numbers.map((n) => n * 2);
console.log(doubled);

const evens = numbers.filter((n) => n % 2 === 0);
console.log(evens);

const total = numbers.reduce((sum, n) => sum + n, 0);
console.log(total);

console.log(numbers);

const point = { x: 10, y: 20 };
const { x, y } = point;
console.log(x, y);

const coords = [1, 2, 3];
const [first, second] = coords;
console.log(first, second);

const { x: posX, z = 0 } = point;
console.log(posX, z);

const arr1 = [1, 2, 3];
const arr2 = [...arr1, 4, 5];
console.log(arr2);

const person = { name: "Ada", age: 30 };
const updatedPerson = { ...person, age: 31 };
console.log(updatedPerson);
console.log(person.age);

function logAll(...args) {
  console.log(args);
}
logAll(1, 2, 3);

const original = { name: "Ada", address: { city: "London" } };
const shallowCopy = { ...original };
shallowCopy.name = "Grace";
shallowCopy.address.city = "Paris";
console.log(original.name);
console.log(original.address.city);

// TODO 1
const prices = [10, 25, 50, 100];
const withTax = prices.map((price) => price * 1.08);
console.log(withTax); // [10.8, 27, 54, 108]

// TODO 2
const products = [
  { name: "Keyboard", price: 50, quantity: 3, inStock: true },
  { name: "Mouse", price: 20, quantity: 5, inStock: false },
  { name: "Monitor", price: 200, quantity: 2, inStock: true },
];
const inStockValue = products
  .filter((product) => product.inStock)
  .reduce((sum, product) => sum + product.price * product.quantity, 0);
console.log(inStockValue); // 550

// TODO 3
const address = { street: "221B Baker St", city: "London", country: "UK" };
const { city, country } = address;
console.log(city, country); // "London" "UK"

const topScores = [98, 91, 87, 80];
const [gold, silver] = topScores;
console.log(gold, silver); // 98 91

// TODO 4
function mergeSettings(defaults, overrides) {
  return { ...defaults, ...overrides };
}
const result = mergeSettings({ theme: "light", fontSize: 14 }, { theme: "dark" });
console.log(result); // { theme: "dark", fontSize: 14 }

// TODO 5
function deepCloneUser(user) {
  return { ...user, stats: { ...user.stats } };
}
const originalUser = { name: "Ada", stats: { wins: 5, losses: 2 } };
const clonedUser = deepCloneUser(originalUser);
clonedUser.stats.wins = 100;
console.log(originalUser.stats.wins); // 5 — untouched
console.log(clonedUser.stats.wins); // 100

if (typeof document !== "undefined") {
  const output = document.getElementById("output");
  if (output) {
    output.textContent = `doubled = ${doubled}, total = ${total}`;
  }
}
