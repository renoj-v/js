// ============================================================
// 11 — ERROR HANDLING
// ============================================================
//
// Errors are how JS signals "something went wrong" up the call
// stack. `throw` raises one, `try/catch` catches it, `finally` runs
// regardless of whether an error was thrown. Async code (promises,
// async/await) has its own error-propagation rules — see below.

// --- read-through example: basic try/catch/finally ---

function parseAge(input) {
  const age = Number(input);
  if (Number.isNaN(age)) {
    throw new Error(`"${input}" is not a number`);
  }
  return age;
}

try {
  console.log(parseAge("42")); // 42
  console.log(parseAge("banana")); // throws before this logs
} catch (err) {
  console.log("caught:", err.message); // caught: "banana" is not a number
} finally {
  console.log("finally always runs"); // runs whether or not an error was thrown
}

// --- read-through example: anatomy of an Error ---

try {
  throw new Error("something broke");
} catch (err) {
  console.log(err instanceof Error); // true
  console.log(err.name); // "Error"
  console.log(err.message); // "something broke"
  console.log(typeof err.stack); // "string" — a trace, useful for debugging, not for logic
}
// You CAN throw a plain string/number instead of an Error, but don't —
// you lose .stack and .message, and every catch block has to guess
// what shape the thrown thing is.

// --- read-through example: custom error classes ---
//
// Extending Error lets catch blocks distinguish error KINDS with
// instanceof, instead of parsing message strings.

class ValidationError extends Error {
  constructor(message) {
    super(message);
    this.name = "ValidationError"; // shows up in stack traces and console.error
  }
}

class NotFoundError extends Error {
  constructor(message) {
    super(message);
    this.name = "NotFoundError";
  }
}

function findUser(id) {
  if (typeof id !== "number") {
    throw new ValidationError("id must be a number");
  }
  if (id !== 1) {
    throw new NotFoundError(`no user with id ${id}`);
  }
  return { id, name: "Ada" };
}

function describeUser(id) {
  try {
    return findUser(id).name;
  } catch (err) {
    if (err instanceof ValidationError) {
      return `bad input: ${err.message}`;
    }
    if (err instanceof NotFoundError) {
      return `not found: ${err.message}`;
    }
    throw err; // unknown error kind — rethrow, don't swallow it silently
  }
}

console.log(describeUser(1)); // "Ada"
console.log(describeUser("x")); // "bad input: id must be a number"
console.log(describeUser(2)); // "not found: no user with id 2"

// --- read-through example: async error handling ---
//
// A rejected promise is just an async "throw" — `await` on a
// rejected promise throws in the surrounding try/catch, same as
// synchronous code.

function riskyFetch(shouldFail) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldFail) reject(new Error("network error"));
      else resolve("data");
    }, 10);
  });
}

async function loadData() {
  try {
    const data = await riskyFetch(true);
    console.log(data); // never runs
  } catch (err) {
    console.log("async catch:", err.message); // "async catch: network error"
  }
}
await loadData();

// A promise's rejection is only "caught" by .catch() or an awaiting
// try/catch — an uncaught rejection doesn't crash synchronously the
// way a thrown error would, but Node/browsers will still report it.

// --- read-through example: rethrowing and wrapping errors ---
//
// Sometimes you want to catch an error, add context, and let it keep
// propagating instead of swallowing it. The `cause` option (ES2022)
// keeps the original error attached instead of losing it.

function loadConfig() {
  try {
    throw new Error("file not found");
  } catch (err) {
    throw new Error("failed to load config", { cause: err });
  }
}

try {
  loadConfig();
} catch (err) {
  console.log(err.message); // "failed to load config"
  console.log(err.cause.message); // "file not found" — the original error, preserved
}

// --- shared helper for the TODOs below ---

class RangeValidationError extends Error {
  constructor(message) {
    super(message);
    this.name = "RangeValidationError";
  }
}

// --- TODO 1 ---
// Write `assertPositive(n)` that throws a `RangeValidationError` if
// `n <= 0`, and otherwise returns `n` unchanged.

function assertPositive(n) {
  if (n <= 0) {
    throw new RangeValidationError("not a positive number")
  }
  return n;
}

try {
  console.log(assertPositive(5)); // 5
  console.log(assertPositive(-1)); // throws before this logs
} catch (err) {
  console.log(err.name, "-", err.message); // "RangeValidationError - ..."
}

// --- TODO 2 ---
// Write `safeDivide(a, b)` that returns `a / b`, but instead of
// letting division by zero silently produce Infinity/NaN, throws a
// plain `Error` with the message "division by zero" when `b === 0`.

function safeDivide(a, b) {
  if (b === 0) {
    throw new Error("division by zero");
  }
  return a / b;
}

console.log(safeDivide(10, 2)); // 5
try {
  safeDivide(1, 0);
} catch (err) {
  console.log(err.message); // "division by zero"
}

// --- TODO 3 ---
// Write async function `fetchWithRetry(fn, attempts)` that calls the
// async function `fn` and, if it rejects, retries — up to `attempts`
// total calls — before giving up and letting the final rejection
// propagate. (No delay needed between attempts.)

async function fetchWithRetry(fn, attempts) {
  let tries = 0;
  while (tries < attempts) {
    try {
      return await fn();
    }
    catch(err) {
      if (tries >= attempts) {
        throw err;
      }
    }
    tries++;
  }
  return prom;
}

let calls = 0;
const flaky = async () => {
  calls += 1;
  if (calls < 3) throw new Error("fail");
  return "ok";
};
console.log(await fetchWithRetry(flaky, 3)); // "ok"
console.log(calls); // 3

// --- TODO 4 ---
// Write async function `loadUserSafely(id)` that calls `findUser(id)`
// (defined above) and returns `{ ok: true, value }` on success, or
// `{ ok: false, error: err.message }` on failure — never letting the
// error propagate out of `loadUserSafely` itself.

async function loadUserSafely(id) {
  try {
    let value = findUser(id);
    return { ok: true, value}
  }
  catch (err) {
    return { ok: false, error: err.message }
  }
}

console.log(await loadUserSafely(1)); // { ok: true, value: { id: 1, name: "Ada" } }
console.log(await loadUserSafely(99)); // { ok: false, error: "no user with id 99" }

if (typeof document !== "undefined") {
  const output = document.getElementById("output");
  if (output) {
    output.textContent = "error-handling lesson running — check the console for output";
  }
}
