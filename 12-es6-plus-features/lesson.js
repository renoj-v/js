// ============================================================
// 12 — ES6+ FEATURES
// ============================================================
//
// A grab-bag of syntax that makes everyday JS less noisy. You've
// already used destructuring and spread/rest in 04 — this lesson
// covers template literals (including tagged templates), a couple
// of destructuring patterns beyond the basics, and the optional
// chaining / nullish coalescing operators that make "safely read a
// maybe-missing value" a one-liner instead of a chain of `&&` checks.

// --- read-through example: template literals ---

const name = "Ada";
console.log(`Hello, ${name}! ${1 + 1} = two.`); // expressions, not just variables, work inside ${}

const multiline = `line one
line two`;
console.log(multiline); // a real newline between the two lines — no \n needed

// --- read-through example: tagged template literals ---
//
// Put a function name right before a template literal and it
// receives the literal's string PIECES and interpolated VALUES
// separately, instead of one already-concatenated string. This is
// how libraries like styled-components and SQL-escaping tags work.

function shout(strings, ...values) {
  // strings: ["I would like some ", ", please."]
  // values:  ["coffee"]
  return strings.reduce((result, str, i) => {
    const value = values[i] !== undefined ? String(values[i]).toUpperCase() : "";
    return result + str + value;
  }, "");
}

const item = "coffee";
console.log(shout`I would like some ${item}, please.`); // "I would like some COFFEE, please."

// --- read-through example: destructuring beyond the basics ---

const response = { data: { user: { id: 1, name: "Ada" } }, status: 200 };
const { data: { user: { name: userName } }, status } = response; // nested + renamed in one go
console.log(userName, status); // "Ada" 200

function printPoint({ x, y } = { x: 0, y: 0 }) {
  console.log(`(${x}, ${y})`);
}
printPoint({ x: 3, y: 4 }); // "(3, 4)"
printPoint(); // "(0, 0)" — the default only kicks in when NO argument at all is passed

let a = 1;
let b = 2;
[a, b] = [b, a]; // swap without a temp variable
console.log(a, b); // 2 1

// --- read-through example: optional chaining (?.) ---
//
// `?.` short-circuits to `undefined` the moment it hits a
// null/undefined link, instead of throwing.

const user = { profile: { social: { twitter: "@ada" } } };
console.log(user.profile?.social?.twitter); // "@ada"
console.log(user.profile?.social?.github); // undefined — .github just isn't there
console.log(user.address?.city); // undefined — short-circuits at .address, city is never touched

const emptyUser = {};
console.log(emptyUser.profile?.social?.twitter); // undefined, NOT a TypeError

const api = { fetchData: () => "data" }; // works on calls too — only calls if the fn exists
console.log(api.fetchData?.()); // "data"
console.log(api.saveData?.()); // undefined — saveData doesn't exist, never called, never throws

const key = "twitter"; // and on computed/bracket access
console.log(user.profile?.social?.[key]); // "@ada"

// --- read-through example: nullish coalescing (??) vs || ---
//
// `||` falls back on ANY falsy value (0, "", false, null, undefined).
// `??` only falls back on null/undefined — the right choice when 0,
// "", or false are valid values you don't want overridden.

const settings = { volume: 0, brightness: null };
console.log(settings.volume || 50); // 50 — WRONG here, 0 is a legit volume
console.log(settings.volume ?? 50); // 0 — RIGHT, 0 isn't nullish
console.log(settings.brightness ?? 50); // 50 — null counts as "missing"

console.log(user.profile?.social?.github ?? "no github"); // chaining ?. and ?? together is a very common pairing

// --- read-through example: logical assignment operators (ES2021) ---

let count = 0;
count ||= 10; // count is falsy (0), so this assigns
console.log(count); // 10

let retries = 0;
retries ??= 3; // 0 is not nullish, so this does NOT assign
console.log(retries); // 0

// --- TODO 1 ---
// Write a tagged template function `price` that formats every
// interpolated NUMBER as `$X.XX` (2 decimal places), leaving the
// literal string pieces untouched.
//
// price`Total: ${19.5}, plus tax: ${1.234}`
// -> "Total: $19.50, plus tax: $1.23"

function price(strings, ...values) {
  return strings.reduce((result, str, i) => {
    let value = values[i] !== undefined ?  values[i] : "";
    return result + str + value;
  }, "");
}

console.log(price`Total: ${19.5}, plus tax: ${1.234}`); // "Total: $19.50, plus tax: $1.23"

// --- TODO 2 ---
// Write `getTwitterHandle(someUser)` that returns
// `someUser.profile.social.twitter` if it exists, or "no twitter" if
// ANY link in that chain is missing. Use optional chaining and
// nullish coalescing — no manual if/else checks.

function getTwitterHandle(someUser) {
  let val = someUser.profile?.social?.twitter;
  return  val !== undefined ? val : "no twitter";
}

console.log(getTwitterHandle(user)); // "@ada"
console.log(getTwitterHandle(emptyUser)); // "no twitter"

// --- TODO 3 ---
// Write `makePoint({ x, y } = {})` that destructures `x` and `y`
// out of its argument, defaulting EACH to 0 individually (so
// `makePoint({ x: 5 })` gets `y: 0`, not a crash), and returns the
// string `(x, y)`.

function makePoint({ x, y } = { x:0 , y:0}) {
  return `(${x}, ${y})`;
}

console.log(makePoint({ x: 5, y: 9 })); // "(5, 9)"
console.log(makePoint({ x: 5 })); // "(5, 0)"
console.log(makePoint()); // "(0, 0)"

// --- TODO 4 ---
// Write `ensureDefaults(config)` that mutates `config` in place,
// using `??=` to set `config.timeout` to 3000 and `config.retries`
// to 3, but ONLY if they're currently null/undefined — an explicit
// `0` should be left alone. Return `config`.

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
