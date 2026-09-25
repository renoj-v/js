// ============================================================
// 10 — DOM AND EVENTS (solution)
// ============================================================

const greeting = document.querySelector("#greeting");
console.log(greeting.textContent);

const allListItems = document.querySelectorAll("#todo-list li");
console.log(allListItems.length);

greeting.textContent = "Hello, world.";
console.log(greeting.textContent);

const greetBtn = document.querySelector("#greet-btn");
greetBtn.addEventListener("click", () => {
  greeting.textContent = "Hello, Ada!";
  console.log("greet button clicked");
});
greetBtn.click();

const todoForm = document.querySelector("#todo-form");
todoForm.addEventListener("submit", (e) => {
  e.preventDefault();
  console.log("form submitted, target was:", e.target.id);
});

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

const todoList = document.querySelector("#todo-list");
todoList.addEventListener("click", (e) => {
  if (e.target.tagName === "LI") {
    e.target.classList.toggle("done");
    console.log(`toggled: ${e.target.textContent}`);
  }
});
todoList.querySelector("li").click();

const counterBtn = document.querySelector("#counter-btn");
const todoInput = document.querySelector("#todo-input");
const clearDoneBtn = document.querySelector("#clear-done-btn");

// TODO 1
let clickCount = 0;

counterBtn.addEventListener("click", () => {
  clickCount += 1;
  counterBtn.textContent = `Clicked ${clickCount} times`;
});

counterBtn.click();
counterBtn.click();
console.log(counterBtn.textContent); // "Clicked 2 times"

// TODO 2
function addTodoItem(text) {
  const li = document.createElement("li");
  li.textContent = text;
  todoList.appendChild(li);
}

todoForm.addEventListener("submit", () => {
  addTodoItem(todoInput.value);
  todoInput.value = "";
});

todoInput.value = "Ship the DOM lesson";
todoForm.dispatchEvent(new Event("submit", { bubbles: true, cancelable: true }));
console.log(todoList.lastElementChild.textContent); // "Ship the DOM lesson"
console.log(todoInput.value); // ""

// TODO 3
function clearDoneItems() {
  todoList.querySelectorAll("li.done").forEach((li) => li.remove());
}

clearDoneBtn.addEventListener("click", clearDoneItems);

clearDoneBtn.click();
console.log(todoList.querySelectorAll("li.done").length); // 0

// TODO 4
document.querySelector("#bubble-btn").addEventListener("click", (e) => {
  e.stopPropagation();
});

document.querySelector("#bubble-btn").click();
// only "button handler" logs this time

if (typeof document !== "undefined") {
  const output = document.getElementById("output");
  if (output) {
    output.textContent = "dom-and-events lesson running — open the console and try clicking things";
  }
}
