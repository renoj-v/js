// ============================================================
// 06 — ASYNC: CALLBACKS, PROMISES, ASYNC/AWAIT
// ============================================================
//
// JS is single-threaded, but I/O (timers, network requests, file
// reads) doesn't block that thread. You register a function to run
// LATER, when the work finishes. Three generations of syntax for
// the same idea:
//   - callbacks    : pass a function to be called when done.
//   - promises     : an object representing a future value, with
//     .then/.catch/.finally.
//   - async/await  : synchronous-looking syntax built on promises.

// --- read-through example: callbacks ---

function loadUser(id, callback) {
  setTimeout(() => {
    callback(null, { id, name: "Ada" });
  }, 20);
}

loadUser(1, (err, user) => {
  if (err) {
    console.error(err);
    return;
  }
  console.log(user); // { id: 1, name: "Ada" }
});
console.log("loadUser called, waiting..."); // logs BEFORE the callback

// --- read-through example: callback hell ---
//
// Nesting callbacks to sequence async steps gets unreadable fast,
// and every level has to repeat its own error handling:

function loadUserCb(id, cb) {
  setTimeout(() => cb(null, { id, name: "Ada" }), 10);
}
function loadPostsCb(userId, cb) {
  setTimeout(() => cb(null, ["post1", "post2"]), 10);
}
function loadCommentsCb(post, cb) {
  setTimeout(() => cb(null, [`comment on ${post}`]), 10);
}

loadUserCb(1, (err, user) => {
  loadPostsCb(user.id, (err, posts) => {
    loadCommentsCb(posts[0], (err, comments) => {
      console.log(comments); // ["comment on post1"] — three levels deep
    });
  });
});

// --- read-through example: creating and consuming a promise ---

function delay(ms, value) {
  return new Promise((resolve) => {
    setTimeout(() => resolve(value), ms);
  });
}

delay(20, "done").then((value) => {
  console.log(value); // "done"
});
// A promise is always pending, fulfilled, or rejected — once
// settled (fulfilled/rejected) it stays that way forever.

// --- read-through example: rejection and .catch/.finally ---

function riskyDelay(ms, shouldFail) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldFail) reject(new Error("it failed"));
      else resolve("ok");
    }, ms);
  });
}

riskyDelay(10, true)
  .then((value) => console.log(value)) // skipped — promise rejected
  .catch((err) => console.log(err.message)) // "it failed"
  .finally(() => console.log("cleanup runs either way"));

// --- read-through example: chaining ---
//
// Each .then returns a NEW promise, so steps chain instead of
// nesting (this is the fix for the callback-hell shape above).
// Returning a promise from .then flattens it automatically.

delay(10, 1)
  .then((n) => n + 1)
  .then((n) => delay(10, n * 2))
  .then((n) => console.log(n)) // (1 + 1) * 2 = 4
  .catch((err) => console.error(err));

// --- read-through example: async/await ---
//
// `await` pauses the async function (not the whole program) until
// the promise settles, then unwraps its value — or throws, if it
// rejected, so ordinary try/catch handles errors.

async function loadProfile() {
  try {
    const user = await delay(10, { id: 1, name: "Ada" });
    const posts = await delay(10, ["post1", "post2"]);
    console.log(user, posts);
  } catch (err) {
    console.error("failed:", err.message);
  }
}
loadProfile();

// --- read-through example: Promise.all ---
//
// Promise.all runs promises CONCURRENTLY and waits for all of them
// (or rejects as soon as the first one does).

async function loadDashboard() {
  const [user, posts, notifications] = await Promise.all([
    delay(30, { id: 1, name: "Ada" }),
    delay(20, ["post1", "post2"]),
    delay(10, ["you have 3 notifications"]),
  ]);
  console.log(user, posts, notifications);
  // all three run in parallel — total wait is ~30ms, not 60ms
}
loadDashboard();

// --- shared helper for the TODOs below ---
// Resolves with id * 10 after a short delay, rejects for negative ids.

function fetchValue(id) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (id < 0) reject(new Error(`invalid id: ${id}`));
      else resolve(id * 10);
    }, 10);
  });
}

// --- TODO 1 ---
// `getDataCb` below is callback-style. Write `getData(id)` that
// wraps it in a `new Promise(...)` and returns that promise, so
// callers can use .then/await instead of passing a callback.

function getDataCb(id, callback) {
  setTimeout(() => {
    callback(null, { id, value: id * 100 });
  }, 10);
}

function getData(id) {

}

getData(2).then((data) => console.log(data)); // { id: 2, value: 200 }

// --- TODO 2 ---
// Write an async function `fetchTotalSequential(ids)` that awaits
// `fetchValue(id)` for each id ONE AT A TIME, in order, and returns
// the sum. (Sequential — each fetch waits for the previous one.)

async function fetchTotalSequential(ids) {

}

fetchTotalSequential([1, 2, 3]).then((total) => console.log(total)); // 60

// --- TODO 3 ---
// Write an async function `fetchTotalConcurrent(ids)` that starts
// all the `fetchValue(id)` calls at once and uses `Promise.all` to
// wait for them together, returning the sum. Same result as TODO 2,
// but faster since the fetches overlap instead of queuing.

async function fetchTotalConcurrent(ids) {

}

fetchTotalConcurrent([1, 2, 3]).then((total) => console.log(total)); // 60

// --- TODO 4 ---
// Write an async function `safeFetchValue(id)` that calls
// `fetchValue(id)` inside a try/catch. On success, return the
// value. On failure (id < 0 rejects), catch the error and return 0
// instead of letting it propagate.

async function safeFetchValue(id) {

}

safeFetchValue(-1).then((v) => console.log(v)); // 0
safeFetchValue(5).then((v) => console.log(v)); // 50

// --- TODO 5 ---
// Write an async function `fetchAllSettled(ids)` that uses
// `Promise.allSettled` to run `fetchValue(id)` for every id and
// return the raw results array — regardless of which ones reject.
// Each entry looks like { status: "fulfilled", value } or
// { status: "rejected", reason }.

async function fetchAllSettled(ids) {

}

fetchAllSettled([1, -1, 2]).then((results) => console.log(results));
// [ { status: "fulfilled", value: 10 },
//   { status: "rejected", reason: Error("invalid id: -1") },
//   { status: "fulfilled", value: 20 } ]

if (typeof document !== "undefined") {
  const output = document.getElementById("output");
  if (output) {
    output.textContent = "running async work — open the console to see the order things log in";
  }
}
