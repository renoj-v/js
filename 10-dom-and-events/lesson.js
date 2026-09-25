// ============================================================
// 10 — DOM AND EVENTS
// ============================================================
//
// The DOM is the browser's live, in-memory tree of the page's HTML.
// JS reads and mutates it, and the browser re-renders on change.
// Unlike every lesson before this one, there's no meaningful way to
// run this in Node — `document` only exists in a browser. Run
// `npm run dev`, open this folder's page, and check the console.
//
// Each example below also fires itself once automatically (via a
// synthetic .click() or dispatchEvent()), so you get console output
// the moment the page loads — but everything is wired to real
// listeners too, so keep clicking around the page after.

// --- read-through example: selecting elements ---

const greeting = document.querySelector("#greeting");
console.log(greeting.textContent); // "Hello, stranger."

const allListItems = document.querySelectorAll("#todo-list li");
console.log(allListItems.length); // 3 — a static NodeList, a snapshot at call time

// --- read-through example: reading/writing content ---

greeting.textContent = "Hello, world.";
console.log(greeting.textContent); // "Hello, world."
// textContent is safe for plain text. innerHTML parses a string as
// HTML — only use it for content YOU control, since attacker-supplied
// HTML in innerHTML is a classic XSS vector.

// --- read-through example: a basic event listener ---

const greetBtn = document.querySelector("#greet-btn");
greetBtn.addEventListener("click", () => {
  greeting.textContent = "Hello, Ada!";
  console.log("greet button clicked");
});
greetBtn.click(); // simulate a click so you see the log without clicking yourself

// --- read-through example: the event object ---
//
// The listener receives an Event object. `e.target` is the exact
// element that triggered it — useful when one listener handles many
// elements (see delegation below).

const todoForm = document.querySelector("#todo-form");
todoForm.addEventListener("submit", (e) => {
  e.preventDefault(); // stop the browser's default full-page reload on submit
  console.log("form submitted, target was:", e.target.id);
});

// --- read-through example: bubbling ---
//
// Events fire on the target first, then bubble UP through every
// ancestor. Clicking the innermost button below fires all three
// handlers, innermost first — the order the DOM nests them in.

document.querySelector("#outer").addEventListener("click", () => {
  console.log("outer handler");
});
document.querySelector("#inner").addEventListener("click", () => {
  console.log("inner handler");
});
document.querySelector("#bubble-btn").addEventListener("click", () => {
  console.log("button handler");
});
document.querySelector("#bubble-btn").click();
// logs, in order: "button handler", "inner handler", "outer handler"

// --- read-through example: event delegation ---
//
// Instead of one listener per <li> (and every FUTURE li you add),
// attach ONE listener to the shared parent and use e.target to find
// which child was actually clicked. This also automatically covers
// elements added later — no re-wiring needed.

const todoList = document.querySelector("#todo-list");
todoList.addEventListener("click", (e) => {
  if (e.target.tagName === "LI") {
    e.target.classList.toggle("done");
    console.log(`toggled: ${e.target.textContent}`);
  }
});
todoList.querySelector("li").click();
// "toggled: Learn the DOM" — delegation caught a click on a child
// that never got its own listener

// --- shared elements for the TODOs below ---

const counterBtn = document.querySelector("#counter-btn");
const todoInput = document.querySelector("#todo-input");
const clearDoneBtn = document.querySelector("#clear-done-btn");

// --- TODO 1 ---
// Add a click listener to `counterBtn` that increments `clickCount`
// (declared below) and updates the button's text to
// `Clicked ${clickCount} times`.

let clickCount = 0;



counterBtn.click();
counterBtn.click();
console.log(counterBtn.textContent); // "Clicked 2 times"

// --- TODO 2 ---
// Write `addTodoItem(text)` that creates a new <li> with `text` as
// its content and appends it to `todoList`. Then add a SECOND submit
// listener on `todoForm` (don't edit the read-through one above)
// that calls `addTodoItem` with `todoInput.value` and clears the
// input afterward.

function addTodoItem(text) {

}



todoInput.value = "Ship the DOM lesson";
todoForm.dispatchEvent(new Event("submit", { bubbles: true, cancelable: true }));
console.log(todoList.lastElementChild.textContent); // "Ship the DOM lesson"
console.log(todoInput.value); // "" — cleared after adding

// --- TODO 3 ---
// Write `clearDoneItems()` that removes every `<li class="done">`
// from `todoList`. Wire `clearDoneBtn`'s click listener to call it.

function clearDoneItems() {

}



clearDoneBtn.click();
console.log(todoList.querySelectorAll("li.done").length); // 0 — the one toggled above is gone

// --- TODO 4 ---
// Add a SECOND click listener to `#bubble-btn` (alongside the
// read-through's) that calls `e.stopPropagation()`. Listeners on the
// same element still all run — stopPropagation only stops the event
// from reaching ANCESTOR elements, not sibling listeners here.



document.querySelector("#bubble-btn").click();
// only "button handler" logs this time — no "inner handler"/
// "outer handler", since propagation was stopped before it could bubble

if (typeof document !== "undefined") {
  const output = document.getElementById("output");
  if (output) {
    output.textContent = "dom-and-events lesson running — open the console and try clicking things";
  }
}
