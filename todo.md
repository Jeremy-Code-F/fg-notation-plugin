# FG Notation Plugin — 1.0.0 Release Checklist

Goal: Full Street Fighter 6 support (normals, charge, grapplers + any edge cases) and submission to the Obsidian Community Plugin registry.

---

## 1. SF6 Feature Completeness

### 1.1 Tiger Knee inputs (`tk.` prefix)
- [x] `tk.` is already matched in the input regex but the token always has `tigerKnee: false` (parser line ~140)
- [x] Support both `tk.236LK` (explicit prefix) and `9236LK` (raw motion) — both are valid and should be equivalent
- [x] Add renderer support — display a TK badge or styled direction on the token
- [x] Write parser tests for both forms

### 1.2 Crouching / Far-standing prefixes
- [x] `c.` (crouching) and `f.` (far standing) exist in the input regex but are not surfaced in tokens
- [x] These are primarily needed for GGST (not SF6) — defer full implementation to a post-1.0 GGST pass, but ensure the parser doesn't choke on them
- [x] For now: parse and silently ignore `c.`/`f.` so notation with them doesn't break rendering

### 1.3 Grappler / Command grab notation
- [ ] Verify 360 / 720 motion parsing works end-to-end (tokenizer → renderer) — current test coverage unclear
- [ ] Confirm air-throw notation (`j.THROW`) renders correctly
- [ ] Add parser + renderer tests for grappler combos (e.g., `5.LP > 5.MP > 360.PP`)

### 1.4 Super Art identification
- [ ] SA1 / SA2 / SA3 badges are supported; confirm all three render with distinct visual styles
- [ ] Consider support for `[SA1]` bracketed form (e.g., "during SA1") if the community uses it

### 1.5 Perfect Parry
- [ ] Perfect Parry doesn't change combo routing so no notation is needed — skip for 1.0.0

### 1.6 OD (Overdrive) moves
- [ ] `PP`/`KK` is sufficient to represent OD moves — no separate `[OD]` badge needed

### 1.7 Drive System moves
- [ ] `DRC`, `DR`, `DI` already supported — verify all render correctly
- [ ] Add `[DRIVE RUSH]` or `[DR]` bracketed modifier form if needed for clarity

---

## 2. Bug Fixes

### 2.1 Hardcoded "ggst" in renderer debug log
- [ ] `fg-renderer.ts` line ~112 logs "Processing fg block for ggst" for all games — fix to use the actual game name

### 2.2 `modifierData` missing `buttonType`
- [ ] GGST and COTW `modifierData` entries don't define `buttonType`, which can cause runtime errors when the renderer accesses that field
- [ ] Add `buttonType` to all modifier entries or make the field optional and handle it in the renderer

### 2.3 Badge/button hardcoding in tokenizer
- [ ] `fg-tokenizer-parser.ts` line ~117: TODO comment — badge button handling is hardcoded rather than config-driven
- [ ] Refactor so each game config can declare which modifier tokens also behave as buttons (e.g., `THROW` in SF6)

### 2.4 Icon provider type confusion
- [ ] `renderBadge` accepts both `string` and `ButtonData` — tighten the signature and make callers consistent

---

## 3. Test Coverage

### 3.1 Renderer tests
- [ ] Only 6 renderer tests currently — expand to cover:
  - Charge inputs rendering correctly (charge direction + release direction shown)
  - All separators rendering correct symbols
  - Standalone badges (DRC, DR, DI, WALLSPLAT, SA1–SA3)
  - Bracketed modifiers ([CH], [PC])
  - Multi-button inputs (PP, KK, PPP, KKK)
  - Jump inputs with motion (`j.236LP`)
  - Lines with multiple tokens (full combo end-to-end → HTML snapshot)

### 3.2 Tiger knee tests
- [ ] Parser tests once feature is implemented (see 1.1)

### 3.3 Grappler / 360 motion tests
- [ ] Parser + renderer tests for full-circle motions and command grabs (see 1.3)

### 3.4 Edge case coverage
- [ ] Charge inputs where the hold and release are the same direction (malformed — should produce a `RawToken`)
- [ ] Nested brackets / mismatched brackets
- [ ] Extremely long combos (stress test)

---

## 4. Manifest & Plugin Metadata

The `manifest.json` currently has placeholder values from the Obsidian sample plugin. These **must** be corrected before submission.

- [ ] `"id"`: Change to a unique, hyphenated lowercase ID — **must not conflict** with any existing community plugin (pick one, e.g., `"fg-notation"`, and verify against the community-plugins.json list)
- [ ] `"name"`: Set to `"Fg Notation"`
- [ ] `"description"`: Replace the placeholder — one sentence describing what the plugin does
- [ ] `"author"`: Set to `"Jeremy Farmer"`
- [ ] `"authorUrl"`: Set your GitHub profile URL or personal site
- [ ] `"fundingUrl"`: Fill in or remove (optional)
- [ ] `"version"`: Confirm `"1.0.0"` is correct
- [ ] `"minAppVersion"`: Verify `"0.15.0"` is still an appropriate minimum (current Obsidian is 1.x)

---

## 5. README

The README needs updates before submission — Obsidian reviewers read it carefully.

- [ ] Fix the "[GitHub repository](#)" placeholder link — point to the actual repo URL
- [ ] Fix "Coming Soon" coffee/donate link — fill in or remove the section
- [ ] Update the Supported Games table to include GGST, COTW, and 2XKO (currently only SF6 is listed)
- [ ] Add docs for the `/` (or) separator — it's implemented but not documented
- [ ] Add a section for grappler notation examples
- [ ] Add a section for tiger knee notation once implemented
- [ ] Include a screenshot or GIF of the rendered output (one already exists for SF6 — add for charge moves)
- [ ] Add a "Compatibility" note (desktop + mobile)

---

## 6. CI / Release Pipeline

### 6.1 Automated release workflow
- [ ] Add `.github/workflows/release.yml` that:
  - Triggers on a version tag push (e.g., `v1.0.0`)
  - Runs `npm ci && npm run build`
  - Packages `main.js`, `manifest.json`, and `styles.css` into a zip
  - Creates a GitHub Release and attaches those three files as assets
  - (Obsidian's community registry expects those exact three files on the release)
- [ ] Confirm the build output filename is `main.js` (the community registry requires this)

### 6.2 Test run in CI
- [ ] Add `npm test` step to the existing `lint.yml` workflow (tests aren't currently run in CI)

---

## 7. Obsidian Community Plugin Submission

Once all the above is done:

- [ ] **Create a public GitHub repository** (if not already public)
- [ ] **Tag and release `v1.0.0`** — the release must include `main.js`, `manifest.json`, and `styles.css` as release assets (not just source code)
- [ ] **Fork the community plugins repo**: `obsidianmd/obsidian-releases`
- [ ] **Add your plugin entry** to `community-plugins.json` in that fork:
  ```json
  {
    "id": "fg-notation",
    "name": "Fg Notation",
    "author": "Jeremy Farmer",
    "description": "Render fighting game combo notation in your Obsidian notes.",
    "repo": "<github-username>/fg-notation-plugin"
  }
  ```
- [ ] **Open a pull request** against `obsidianmd/obsidian-releases` — the Obsidian team reviews and merges
- [ ] **Review checklist**: Obsidian maintainers check against their [plugin review guidelines](https://github.com/obsidianmd/obsidian-releases/blob/master/plugin-review.md) — skim these before submitting
- [ ] **Wait for review** — typically takes a few weeks; address any requested changes

---

## 8. Decisions Log

| Question | Decision |
|---|---|
| Tiger knee notation | Support both `tk.236LK` (explicit prefix) and `9236LK` (raw 9-motion) as equivalent |
| Perfect Parry | No notation needed — doesn't affect combo routing |
| OD moves | `PP`/`KK` is sufficient, no separate `[OD]` badge |
| `c.`/`f.` prefixes | GGST concern, not SF6 — parse silently for now, full support post-1.0 |
| Plugin display name | `Fg Notation` |
| Plugin ID | `fg-notation` (verify against community list before submitting) |
| Author | Jeremy Farmer |
