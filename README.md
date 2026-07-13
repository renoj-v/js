# JS Learning Repo

A hands-on playground for learning core JavaScript concepts. You edit code
directly in each lesson file, run it, see the output (in the browser console,
on the page, and/or in your terminal), then commit your progress to Git.

## Structure

Each numbered folder is one topic:

```
01-variables-and-types/
02-functions/
03-scope-and-closures/
04-arrays-and-objects/
05-loops-and-iteration/
06-async-callbacks-promises-async-await/
07-this-and-context/
08-prototypes-and-classes/
09-modules/
10-dom-and-events/
11-error-handling/
12-es6-plus-features/
```

Inside each topic folder:

- **`lesson.js`** — the file you edit. It's heavily commented, explains the
  concept, and has `// TODO` exercises for you to fill in.
- **`solution.js`** — a reference solution. Try the exercises yourself first,
  then peek here to check your work.
- **`index.html`** — a minimal page that loads `lesson.js` and gives you a
  `<div id="output">` to render results to, in addition to the browser
  console.

## Setup

```bash
npm install
```

## Running lessons

### In the browser (console + on-page output)

```bash
npm run dev
```

This starts a local dev server with live-reload. Open the printed URL, then
navigate into a topic folder (e.g. `http://localhost:5500/01-variables-and-types/`)
to view that lesson. Open your browser's DevTools console (F12 / Cmd+Opt+I) to
see `console.log` output alongside whatever is rendered in the `#output` div.

Because live-reload is on, saving changes to `lesson.js` in your editor will
automatically refresh the page.

### In Node (for lessons that don't touch the DOM)

```bash
npm run node -- 01-variables-and-types/lesson.js
```

Swap in the path to whichever lesson you're working on. This is often faster
for topics like functions, scope, loops, async, and error handling, where
there's nothing to render visually.

## Suggested workflow

1. Open a topic's `lesson.js` in your editor.
2. Read the comments, fill in the `// TODO` exercises.
3. Run it (`npm run dev` and check the browser, or `npm run node -- <path>`).
4. Compare against `solution.js` if you get stuck or want to double check.
5. Check the topic off in [`PROGRESS.md`](./PROGRESS.md).
6. Commit and push:
   ```bash
   git add .
   git commit -m "Practice: closures and lexical scope"
   git push
   ```

Small, frequent commits per concept are encouraged — it gives you a
changelog of your own learning.

## Adding your own notes

Feel free to add a `notes.md` inside any topic folder for your own summaries,
gotchas, or links you found helpful. These are yours to keep.
