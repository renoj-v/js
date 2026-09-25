# dom-and-events — DOM and Events

The DOM is the browser's live, in-memory tree of the page's HTML — JS reads
and mutates it, and the browser re-renders on change. This lesson covers:

- selecting elements — `querySelector`/`querySelectorAll`, reading/writing `textContent`
- listeners — `addEventListener`, the event object, `e.target` vs `e.currentTarget`
- bubbling — how a click travels from the target up through its ancestors, and `e.stopPropagation()`
- delegation — one listener on a parent instead of one per child, which also covers elements added later
- mutating the DOM — creating elements, appending/removing them

Unlike every earlier lesson, this one has **no meaningful Node version** —
`document` only exists in a browser. Run `npm run dev`, open this folder's
page, and check the console; the read-through examples fire themselves once
automatically (via synthetic `.click()`/`dispatchEvent()`) so you get output
on load, but everything is wired to real listeners too — keep clicking
around the page.

## Files

- `lesson.js` — commented walkthrough plus 4 TODO exercises for you to solve.
- `solution.js` — worked answers to those TODOs.
- `index.html` — the actual interactive page for this lesson (buttons, a todo list, nested divs for bubbling) — open it via `npm run dev`, not directly as a file.

Work through `lesson.js` top to bottom, fill in the TODOs, then compare against `solution.js`. Note: unlike prior lessons, a blank TODO here won't crash — an unwired listener just silently does nothing, so check the console output against the comments carefully.
