// ============================================================
// 12 — ES6+ FEATURES (solution)
// ============================================================

const name = "Ada";
console.log(`Hello, ${name}! ${1 + 1} = two.`);

const multiline = `line one
line two`;
console.log(multiline);

function shout(strings, ...values) {
  return strings.reduce((result, str, i) => {
    const value = values[i] !== undefined ? String(values[i]).toUpperCase() : "";
    return result + str + value;
  }, "");
}

const item = "coffee";
console.log(shout`I would like some ${item}, please.`);

const response = { data: { user: { id: 1, name: "Ada" } }, status: 200 };
const { data: { user: { name: userName } }, status } = response;
console.log(userName, status);

function printPoint({ x, y } = { x: 0, y: 0 }) {
  console.log(`(${x}, ${y})`);
}
printPoint({ x: 3, y: 4 });
printPoint();

let a = 1;
let b = 2;
[a, b] = [b, a];
console.log(a, b);

const user = { profile: { social: { twitter: "@ada" } } };
console.log(user.profile?.social?.twitter);
console.log(user.profile?.social?.github);
console.log(user.address?.city);

const emptyUser = {};
console.log(emptyUser.profile?.social?.twitter);

const api = { fetchData: () => "data" };
console.log(api.fetchData?.());
console.log(api.saveData?.());

const key = "twitter";
console.log(user.profile?.social?.[key]);

const settings = { volume: 0, brightness: null };
console.log(settings.volume || 50);
console.log(settings.volume ?? 50);
console.log(settings.brightness ?? 50);

console.log(user.profile?.social?.github ?? "no github");

let count = 0;
count ||= 10;
console.log(count);

let retries = 0;
retries ??= 3;
console.log(retries);

// TODO 1
function price(strings, ...values) {
  return strings.reduce((result, str, i) => {
    const value = values[i] !== undefined ? `$${values[i].toFixed(2)}` : "";
    return result + str + value;
  }, "");
}

console.log(price`Total: ${19.5}, plus tax: ${1.234}`); // "Total: $19.50, plus tax: $1.23"

// TODO 2
function getTwitterHandle(someUser) {
  return someUser.profile?.social?.twitter ?? "no twitter";
}

console.log(getTwitterHandle(user)); // "@ada"
console.log(getTwitterHandle(emptyUser)); // "no twitter"

// TODO 3
function makePoint({ x = 0, y = 0 } = {}) {
  return `(${x}, ${y})`;
}

console.log(makePoint({ x: 5, y: 9 })); // "(5, 9)"
console.log(makePoint({ x: 5 })); // "(5, 0)"
console.log(makePoint()); // "(0, 0)"

// TODO 4
function ensureDefaults(config) {
  config.timeout ??= 3000;
  config.retries ??= 3;
  return config;
}

console.log(ensureDefaults({ retries: 0 })); // { retries: 0, timeout: 3000 }
console.log(ensureDefaults({})); // { timeout: 3000, retries: 3 }

if (typeof document !== "undefined") {
  const output = document.getElementById("output");
  if (output) {
    output.textContent = "es6-plus-features lesson running — check the console for output";
  }
}
