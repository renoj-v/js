// ============================================================
// 11 — ERROR HANDLING (solution)
// ============================================================

function parseAge(input) {
  const age = Number(input);
  if (Number.isNaN(age)) {
    throw new Error(`"${input}" is not a number`);
  }
  return age;
}

try {
  console.log(parseAge("42"));
  console.log(parseAge("banana"));
} catch (err) {
  console.log("caught:", err.message);
} finally {
  console.log("finally always runs");
}

try {
  throw new Error("something broke");
} catch (err) {
  console.log(err instanceof Error);
  console.log(err.name);
  console.log(err.message);
  console.log(typeof err.stack);
}

class ValidationError extends Error {
  constructor(message) {
    super(message);
    this.name = "ValidationError";
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
    throw err;
  }
}

console.log(describeUser(1));
console.log(describeUser("x"));
console.log(describeUser(2));

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
    console.log(data);
  } catch (err) {
    console.log("async catch:", err.message);
  }
}
await loadData();

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
  console.log(err.message);
  console.log(err.cause.message);
}

class RangeValidationError extends Error {
  constructor(message) {
    super(message);
    this.name = "RangeValidationError";
  }
}

// TODO 1
function assertPositive(n) {
  if (n <= 0) {
    throw new RangeValidationError(`${n} is not positive`);
  }
  return n;
}

try {
  console.log(assertPositive(5)); // 5
  console.log(assertPositive(-1)); // throws before this logs
} catch (err) {
  console.log(err.name, "-", err.message); // "RangeValidationError - -1 is not positive"
}

// TODO 2
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

// TODO 3
async function fetchWithRetry(fn, attempts) {
  for (let attempt = 1; attempt <= attempts; attempt++) {
    try {
      return await fn();
    } catch (err) {
      if (attempt === attempts) throw err;
    }
  }
}

let calls = 0;
const flaky = async () => {
  calls += 1;
  if (calls < 3) throw new Error("fail");
  return "ok";
};
console.log(await fetchWithRetry(flaky, 3)); // "ok"
console.log(calls); // 3

// TODO 4
async function loadUserSafely(id) {
  try {
    const value = findUser(id);
    return { ok: true, value };
  } catch (err) {
    return { ok: false, error: err.message };
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
