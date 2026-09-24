// ============================================================
// 07 — `this` AND CONTEXT
// ============================================================
//
// `this` is not determined by where a function is DEFINED — it's
// determined by how the function is CALLED (the "call-site").
// The same function can have a different `this` every time it runs:
//   - obj.method()     -> `this` is `obj`
//   - fn()              -> `this` is undefined (strict mode) or the
//                          global object (sloppy mode)
//   - fn.call(x)         -> `this` is explicitly set to `x`
//   - new Fn()           -> `this` is the newly created object
//   - arrow functions    -> `this` is inherited from the ENCLOSING
//                           scope, ignoring all of the above rules.

// --- read-through example: this depends on the call-site ---

const user = {
  name: "Ada",
  greet() {
    return `Hi, I'm ${this.name}`;
  },
};

console.log(user.greet()); // "Hi, I'm Ada" — called as user.greet(), so this = user

const detachedGreet = user.greet;
// console.log(detachedGreet()); // TypeError-ish: this.name -> undefined, no crash but wrong
// Same function, no receiver at the call-site -> `this` is no longer `user`.

// --- read-through example: losing `this` in a callback ---

const timer = {
  seconds: 0,
  start() {
    // If we passed `this.tick` directly to setTimeout, `this` inside
    // tick would NOT be `timer` when the timer fires — it's called
    // as a bare function by the timer internals.
    setTimeout(() => {
      // an arrow function here captures `this` from `start`'s scope,
      // which is `timer`, because arrows don't have their own `this`.
      this.seconds += 1;
      console.log(`tick: ${this.seconds}`);
    }, 10);
  },
};
timer.start(); // "tick: 1"

// --- read-through example: call, apply, bind ---
//
// All three let you explicitly choose what `this` is inside a
// function, instead of relying on the call-site.
//   - fn.call(thisArg, arg1, arg2, ...)   — calls fn immediately
//   - fn.apply(thisArg, [arg1, arg2])     — calls fn immediately, args as array
//   - fn.bind(thisArg, arg1, ...)         — returns a NEW function
//     with `this` permanently locked, doesn't call it yet

function introduce(greeting) {
  return `${greeting}, I'm ${this.name}`;
}

const ada = { name: "Ada" };
const grace = { name: "Grace" };

console.log(introduce.call(ada, "Hello")); // "Hello, I'm Ada"
console.log(introduce.apply(grace, ["Hi"])); // "Hi, I'm Grace"

const introduceAsAda = introduce.bind(ada);
console.log(introduceAsAda("Hey")); // "Hey, I'm Ada" — this locked in, works no matter how it's called later

// --- read-through example: arrow functions as object methods (a trap) ---
//
// Arrow functions don't get their own `this`, so using one as an
// object METHOD is almost always wrong — it captures `this` from
// the surrounding scope at definition time (often the module/global
// scope), not the object it's attached to.

const brokenUser = {
  name: "Grace",
  greet: () => {
    return `Hi, I'm ${this?.name}`; // `this` here is NOT brokenUser
  },
};
console.log(brokenUser.greet()); // "Hi, I'm undefined" — the arrow-method trap

// --- shared helpers for the TODOs below ---

function makeCounter(start) {
  return { count: start };
}

// --- TODO 1 ---
// `logCount` below reads `this.count`. Call it three different ways
// using call/apply/bind so that it logs against each of the three
// counter objects below, without editing `logCount` itself.
//
// counterA -> "count: 5"
// counterB -> "count: 50"
// counterC (via a bound function called boundLog) -> "count: 500"

function logCount() {
  console.log(`count: ${this.count}`);
}

const counterA = makeCounter(5);
const counterB = makeCounter(50);
const counterC = makeCounter(500);



// --- TODO 2 ---
// Fix `brokenTicker` so that calling `brokenTicker.start()` correctly
// logs "tick: 1", "tick: 2", "tick: 3" (one per call) instead of
// losing `this` inside the setTimeout callback. Don't change
// `seconds`'s initial value or the TODO markers — just fix the
// callback so `this` refers to `brokenTicker`.

const brokenTicker = {
  seconds: 0,
  start() {
    setTimeout(function () {
      // TODO: this callback needs access to the outer `this`
      this.seconds += 1;
      console.log(`tick: ${this.seconds}`);
    }, 10);
  },
};



// --- TODO 3 ---
// Write a function `bindAll(obj, ...methodNames)` that rebinds each
// named method on `obj` so that `this` is permanently locked to
// `obj`, even if the method is later detached and called bare. It
// should mutate `obj` in place (reassign each method) and also
// return `obj`.
//
// const withBound = bindAll(user, "greet");
// const detached = withBound.greet;
// detached(); // still works, `this` stays `user`

function bindAll(obj, ...methodNames) {

}

const boundUser = bindAll(user, "greet");
const detachedBoundGreet = boundUser.greet;
console.log(detachedBoundGreet()); // "Hi, I'm Ada" — still correct after detaching

// --- TODO 4 ---
// Write a function `once(fn, thisArg)` that returns a new function
// which calls `fn` with `this` set to `thisArg` only the FIRST time
// it's invoked. Every call after that should do nothing and return
// undefined (no matter what arguments are passed).
//
// const initOnce = once(function () { console.log(`init for ${this.name}`); }, ada);
// initOnce(); // "init for Ada"
// initOnce(); // (nothing)

function once(fn, thisArg) {

}

const initOnce = once(function () {
  console.log(`init for ${this.name}`);
}, ada);
initOnce(); // "init for Ada"
initOnce(); // (nothing — already ran)

if (typeof document !== "undefined") {
  const output = document.getElementById("output");
  if (output) {
    output.textContent = "this-and-context lesson running — open the console to see the order things log in";
  }
}
