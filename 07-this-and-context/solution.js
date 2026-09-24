// ============================================================
// 07 — `this` AND CONTEXT (solution)
// ============================================================

const user = {
  name: "Ada",
  greet() {
    return `Hi, I'm ${this.name}`;
  },
};

console.log(user.greet());

const detachedGreet = user.greet;

const timer = {
  seconds: 0,
  start() {
    setTimeout(() => {
      this.seconds += 1;
      console.log(`tick: ${this.seconds}`);
    }, 10);
  },
};
timer.start();

function introduce(greeting) {
  return `${greeting}, I'm ${this.name}`;
}

const ada = { name: "Ada" };
const grace = { name: "Grace" };

console.log(introduce.call(ada, "Hello"));
console.log(introduce.apply(grace, ["Hi"]));

const introduceAsAda = introduce.bind(ada);
console.log(introduceAsAda("Hey"));

const brokenUser = {
  name: "Grace",
  greet: () => {
    return `Hi, I'm ${this?.name}`;
  },
};
console.log(brokenUser.greet());

function makeCounter(start) {
  return { count: start };
}

// TODO 1
function logCount() {
  console.log(`count: ${this.count}`);
}

const counterA = makeCounter(5);
const counterB = makeCounter(50);
const counterC = makeCounter(500);

logCount.call(counterA); // "count: 5"
logCount.apply(counterB); // "count: 50"
const boundLog = logCount.bind(counterC);
boundLog(); // "count: 500"

// TODO 2
const brokenTicker = {
  seconds: 0,
  start() {
    setTimeout(() => {
      this.seconds += 1;
      console.log(`tick: ${this.seconds}`);
    }, 10);
  },
};
brokenTicker.start(); // "tick: 1"
brokenTicker.start(); // "tick: 2"
brokenTicker.start(); // "tick: 3"

// TODO 3
function bindAll(obj, ...methodNames) {
  for (const name of methodNames) {
    obj[name] = obj[name].bind(obj);
  }
  return obj;
}

const boundUser = bindAll(user, "greet");
const detachedBoundGreet = boundUser.greet;
console.log(detachedBoundGreet()); // "Hi, I'm Ada"

// TODO 4
function once(fn, thisArg) {
  let called = false;
  return function (...args) {
    if (called) return undefined;
    called = true;
    return fn.apply(thisArg, args);
  };
}

const initOnce = once(function () {
  console.log(`init for ${this.name}`);
}, ada);
initOnce(); // "init for Ada"
initOnce(); // (nothing)

if (typeof document !== "undefined") {
  const output = document.getElementById("output");
  if (output) {
    output.textContent = "this-and-context lesson running — open the console to see the order things log in";
  }
}
