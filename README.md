## COMMENT
All of the below and all of the html until now is just Claude-generated.
I (KR) wanted to give an inital direction of style. Feel free to change whatever you want.

# QIMEN website

Clean, editable HTML/CSS for the QIMEN project page (PIKE & PRISM schemes,
Chinese Cryptography Competition 2026 submission).


## Editing the things you'll actually want to change

### 1. Per-scheme content

The page has **two scheme tabs** (PIKE / PRISM) on one page. Each element that
belongs to only one scheme carries a `.pike-only` or `.prism-only` class.
The CSS rule:

```css
.pike-only, .prism-only { display: none; }
body[data-scheme="pike"]  .pike-only  { display: revert; }
body[data-scheme="prism"] .prism-only { display: revert; }
```

…hides them by default and shows them only when `<body data-scheme="…">`
matches. The tab buttons in the topbar flip that attribute.

**To change a scheme description:** edit the matching `<p class="tag pike-only">`
or `<p class="tag prism-only">` in the Hero, and/or the corresponding blocks
inside `#overview`.

**To add a chip:** copy a `<span class="chip"><span class="sq"></span>label</span>`
inside `.pikemeta` or `.prismmeta`.

**The `<span class="schemenm"></span>`** placeholder auto-prints `PIKE` or
`PRISM` in headings — it's powered by the CSS `::before` rule at the bottom of
`styles.css`. No JS needed.

### 2. Specs and performance numbers

Look for tables/cells containing `<span class="pending">— bytes</span>` or
`<span class="num pending">pending</span>` — replace them with the real values:

```html
<td class="num">1 016 <span class="u">B</span></td>
<span class="num">12.4</span>
```

Drop the `pending` class once a value is filled in; the styling switches from
italic grey to bold black automatically.

### 3. Authors / affiliations

Each row in `#team` is:

```html
<div class="row">
  <span class="n">01</span>
  <span class="nm">Full Name</span>
  <span class="af">Affiliation</span>
</div>
```

Renumber the `.n` values if you reorder.

### 4. Citation BibTeX

Two `<pre id="cite-pike">` / `<pre id="cite-prism">` blocks. Edit freely — the
"Copy" button copies the `textContent` of whichever `<pre>` matches the active
scheme, so the data-attribute on the button (`data-copy="cite-pike"`) must
match the `<pre>`'s `id`.

### 5. Colors and typography

All tokens live in the `:root { ... }` block at the very top of `styles.css`:

```css
:root {
  --bg:         oklch(0.965 0.028 82);   /* parchment background       */
  --pike:       oklch(0.45 0.17 265);    /* PIKE accent  (cobalt blue) */
  --pike-soft:  oklch(0.93 0.05 265);
  --prism:     oklch(0.62 0.15 55);     /* PRISM accent (warm orange) */
  --prism-soft: oklch(0.95 0.05 55);

  --f-mono:    "JetBrains Mono", ui-monospace, monospace;
  --f-display: "Space Grotesk", sans-serif;
}
```

Change any value, save, refresh — that's it.

To retheme just one scheme, edit only the `--pike-*` or `--prism-*` pair.
`body[data-scheme="prism"]` re-maps `--accent` to the PRISM pair automatically.

### 6. Top-right "Repository" link

In the topbar, replace `href="#"` on `.topright a` with the real repo URL
(and add more links if you want).

## What the page does

- **Tabs**: `[ PIKE ] / [ PRISM ]` flip `body[data-scheme]`. URL hash
  (`#pike` / `#prism`) is honored on load.
- **Section nav**: side rail anchors to `#overview`, `#specs`, `#perf`,
  `#team`, `#cite`.
- **Copy BibTeX**: one-click copy of whichever citation is active. Falls
  back gracefully if the Clipboard API is unavailable.

## Browser support

Uses `oklch()` colors (supported in all evergreen browsers since mid-2023) and
`text-wrap: pretty`. If you need to support older Safari/Firefox builds,
convert the `oklch()` values to hex/rgb — they're all in `styles.css :root`.

## License / attribution

This handoff carries no enforced license; ship it under whatever the QIMEN
team prefers. Fonts come from Google Fonts (JetBrains Mono — Apache 2.0;
Space Grotesk — SIL OFL).
