// ============================================================
// 06 — ASYNC: CALLBACKS, PROMISES, ASYNC/AWAIT (solution)
// ============================================================

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
  console.log(user);
});
console.log("loadUser called, waiting...");

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
      console.log(comments);
    });
  });
});

function delay(ms, value) {
  return new Promise((resolve) => {
    setTimeout(() => resolve(value), ms);
  });
}

delay(20, "done").then((value) => {
  console.log(value);
});

function riskyDelay(ms, shouldFail) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldFail) reject(new Error("it failed"));
      else resolve("ok");
    }, ms);
  });
}

riskyDelay(10, true)
  .then((value) => console.log(value))
  .catch((err) => console.log(err.message))
  .finally(() => console.log("cleanup runs either way"));

delay(10, 1)
  .then((n) => n + 1)
  .then((n) => delay(10, n * 2))
  .then((n) => console.log(n))
  .catch((err) => console.error(err));

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

async function loadDashboard() {
  const [user, posts, notifications] = await Promise.all([
    delay(30, { id: 1, name: "Ada" }),
    delay(20, ["post1", "post2"]),
    delay(10, ["you have 3 notifications"]),
  ]);
  console.log(user, posts, notifications);
}
loadDashboard();

function fetchValue(id) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (id < 0) reject(new Error(`invalid id: ${id}`));
      else resolve(id * 10);
    }, 10);
  });
}

// TODO 1
function getDataCb(id, callback) {
  setTimeout(() => {
    callback(null, { id, value: id * 100 });
  }, 10);
}

function getData(id) {
  return new Promise((resolve, reject) => {
    getDataCb(id, (err, data) => {
      if (err) reject(err);
      else resolve(data);
    });
  });
}
getData(2).then((data) => console.log(data)); // { id: 2, value: 200 }

// TODO 2
async function fetchTotalSequential(ids) {
  let total = 0;
  for (const id of ids) {
    total += await fetchValue(id);
  }
  return total;
}
fetchTotalSequential([1, 2, 3]).then((total) => console.log(total)); // 60

// TODO 3
async function fetchTotalConcurrent(ids) {
  const values = await Promise.all(ids.map((id) => fetchValue(id)));
  return values.reduce((sum, value) => sum + value, 0);
}
fetchTotalConcurrent([1, 2, 3]).then((total) => console.log(total)); // 60

// TODO 4
async function safeFetchValue(id) {
  try {
    return await fetchValue(id);
  } catch {
    return 0;
  }
}
safeFetchValue(-1).then((v) => console.log(v)); // 0
safeFetchValue(5).then((v) => console.log(v)); // 50

// TODO 5
async function fetchAllSettled(ids) {
  return Promise.allSettled(ids.map((id) => fetchValue(id)));
}
fetchAllSettled([1, -1, 2]).then((results) => console.log(results));

if (typeof document !== "undefined") {
  const output = document.getElementById("output");
  if (output) {
    output.textContent = "running async work — open the console to see the order things log in";
  }
}
