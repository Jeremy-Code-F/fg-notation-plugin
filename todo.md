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
- [x] `c.`/`f.` now parse to `Direction.Close`/`Direction.Far` and render as CLOSE/FAR badges

### 1.3 Grappler / Command grab notation
- [x] Verify 360 / 720 motion parsing works end-to-end (tokenizer → renderer) — current test coverage unclear
- [x] Confirm air-throw notation (`j.THROW`) renders correctly
- [x] Add parser + renderer tests for grappler combos (e.g., `5.LP > 5.MP > 360.PP`)

### 1.4 Super Art identification
- [x] SA1 / SA2 / SA3 badges are supported; confirm all three render with distinct visual styles
- [x] Consider support for `[SA1]` bracketed form (e.g., "during SA1") if the community uses it

### 1.5 Perfect Parry
- [x] Perfect Parry doesn't change combo routing so no notation is needed — skip for 1.0.0

### 1.6 OD (Overdrive) moves
- [x] `PP`/`KK` is sufficient to represent OD moves — no separate `[OD]` badge needed

### 1.7 Drive System moves
- [x] `DRC`, `DR`, `DI` already supported — verify all render correctly (parser + renderer tests)
- [x] ~~Add `[DRIVE RUSH]` or `[DR]` bracketed modifier form if needed for clarity~~ — won't do: `DR`/`DRC` already render as distinct badges, and brackets are reserved for hit states (`[CH]`, `[PC]`) and charge (`[4]`)

## 1.8 Misc
- [x] Support dash with 'dash' or '66'/'44'
- [x] Support delay with 'dl.' or 'd.' (`d.` done and renders a DELAY badge; `dl.` not yet supported)
- [x] Support microwalk tbd on notation 'walk'? 'microwalk'

---

## 2. Bug Fixes

### 2.1 Hardcoded "ggst" in renderer debug log
- [x] `fg-renderer.ts` logged "Processing fg block for ggst" for all games — now uses `config.gameName`

### 2.2 `modifierData` missing `buttonType`
- [x] ~~GGST and COTW `modifierData` entries don't define `buttonType`~~ — N/A for 1.0.0: GGST, COTW and 2XKO were removed to ship SF6 only
- [ ] **Post-1.0:** When reviving those games (saved on the `wip/other-games` branch), port their configs to the current `GameConfig` shape (`inputData` + `modifierData` with `buttonType`/`id`); they still use the old regex-parser fields

### 2.3 Badge/button hardcoding in tokenizer
- [x] `fg-tokenizer-parser.ts` `PushButtonTokon`: badge handling is config-driven — `ButtonType.Special` renamed to `ButtonType.Badge`, and MICROWALK moved into the SF6 config (bespoke recognizer removed)
- [x] Refactor so each game config can declare which modifier tokens also behave as buttons (e.g., `THROW` in SF6)

### 2.4 Icon provider type confusion
- [x] `renderBadge` accepts both `string` and `ButtonData` — tighten the signature and make callers consistent (now `ButtonData` only; fixed the `"DELAY"` and direction callers that rendered `undefined` badges)

### 2.5 Buttons rendered outside their input wrapper
- [x] `renderInputToken` appended the button/super badge to the line instead of the `fg-input` wrapper, separating it from its arrows (regression tests added)

---

## 3. Test Coverage

### 3.1 Renderer tests
- [x] Expand renderer tests (now 47) to cover:
  - [x] Charge inputs rendering correctly (charge direction + release direction shown, e.g. `[4]6HP`, `[2]8KK`, charge in a combo)
  - [x] All separators rendering correct symbols (cancel `>`, link `,`, chain `~`, together `+` incl. `LP+LK`, or `/`)
  - [x] Standalone badges (DRC, DR, DI, SA1–SA3, MICROWALK, WALLSPLAT)
  - [x] Bracketed modifiers ([CH], [PC])
  - [x] Multi-button inputs (PP, KK, PPP, KKK)
  - [x] Jump inputs with motion (`j.360KK`, `j.236LP`, `j.214.HK`)
  - [x] Lines with multiple tokens (full-combo token shape + multi-line blocks; HTML snapshot skipped — would lock in SVG markup and be brittle)

### 3.2 Tiger knee tests
- [x] Parser tests once feature is implemented (see 1.1)

### 3.3 Grappler / 360 motion tests
- [x] Parser + renderer tests for full-circle motions and command grabs (see 1.3)

### 3.4 Edge case coverage
- [x] ~~Charge inputs where the hold and release are the same direction should produce a `RawToken`~~ — won't do: charge inputs are intentionally not validated (see Decisions Log); `[4]4HP` parses as written and a parser test locks that in
- [x] Nested brackets / mismatched brackets — `[[CH]]`, `[CH`, `CH]`, `[4[2]]6HP`, `[[4]6HP` fall back to a single raw token; a mismatched part mid-combo doesn't affect the rest; `[4]6HP]` leaves only the `]` raw
- [x] Extremely long combos (stress test) — a 500-segment combo (~5k tokens) parses in ~10 ms; test checks token count, no raw tokens, a generous 500 ms bound, and that the first and last segments parse identically

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

## 7. Pre-1.0 Review Findings

Found in a whole-project review before release. Items that overlap §4–§6 point there instead of duplicating them.

### 7.1 Will fail checks or get flagged in review
- [x] **CI lint is failing** — `npm run lint` now exits clean (0 errors, 0 warnings). Kept `eslint .` so `manifest.json` stays linted; added `vitest.config.ts`, `scripts/`, `src/test-setup.ts` and `src/obsidian-test-stub.ts` (test/tooling only, never shipped) to the eslint ignores; `_`-prefixed unused vars are now allowed; dropped the unused `ButtonType` import in `button-recognizer.ts`
- [ ] **Sample settings tab still shipped** — `src/settings.ts` shows "Settings #1" / "It's a secret" and `mySetting` is never read. Remove the tab and settings plumbing from `main.ts` (no settings needed for 1.0)
- [ ] **`LICENSE` is the sample plugin's** — copyright reads "Dynalist Inc."; put your own name on it (0BSD can stay)
- [ ] **`package.json` still says `obsidian-sample-plugin`** — update `name` and `description`
- [ ] **Plugin ID / name rules** — Obsidian's validator rejects IDs ending in `plugin` and names ending in "Plugin"; the description must end with a period. Already planned in §4 (`fg-notation` / "Fg Notation"); just make sure it lands
- [ ] **README documents notation that doesn't work** — remove `RC`, `Burst`, `WS`, `WB`, `[RISC]`, `c.HS`, `j.K` (GGST/other-game notation that won't parse in the SF6-only build); document `/` (OR), `tk.`, `d.`, dashes (`66`/`44`), microwalk, `SA1`–`SA3`, `WALLSPLAT`; drop the §5 bullet about adding GGST/COTW/2XKO to the games table

### 7.2 Should fix
- [ ] **Too much console logging** — Obsidian's guidelines ask plugins to keep the console clean:
  - remove the per-badge JSON log in `icon-provider.ts` (`renderBadge`)
  - remove the per-block log in `fg-renderer.ts` (`processFgBlock`)
  - remove the parser's "not recognized, pushing it as a raw token" warning (unrecognized text is normal input, not an error)
- [ ] **A parser error leaves the block blank** — some recognizers `throw` on lookups that should never fail; wrap `processFgBlock` in a try/catch that falls back to rendering the raw text
- [ ] **Release tag conflict** — §6.1 and §8 say to tag `v1.0.0`, but `AGENTS.md` and Obsidian's docs require the tag to exactly match the manifest version (`1.0.0`, no `v`); fix those two items
- [ ] **`minAppVersion` 0.15.0 is probably too low** — the code uses `sanitizeHTMLToDom`, which likely postdates 0.15; raise it to a 1.x version you've tested on (ties into the §4 checkbox)
- [ ] **Hardcoded button colors** — plain `blue`/`yellow`/`red` and fixed `#1a1a1a` text; test in light and dark themes and adjust if they're harsh or hard to read. Also remove the sample comment block at the top of `styles.css`

### 7.3 Nice to have
- [ ] **Leftover code and files**:
  - `assets/icons/Cotw-LP.png` is unused (from the removed COTW config)
  - `fg-tokenizer-parser.ts` has an unused `parseDirection` method and `DIRECTION_MAP`, an unused `cursor` field, and a duplicate `config`/`gameConfig` field
  - `obsidian` is listed as `"latest"` in `dependencies`; it's normally a pinned `devDependency`
- [ ] **Turn on `"strict": true` in `tsconfig.json`** — currently enables individual strict checks instead; `AGENTS.md` prefers full strict mode. Optional, may surface a few type errors

---

## 8. Obsidian Community Plugin Submission

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

## 9. Decisions Log

| Question | Decision |
|---|---|
| Tiger knee notation | Support both `tk.236LK` (explicit prefix) and `9236LK` (raw 9-motion) as equivalent |
| Perfect Parry | No notation needed — doesn't affect combo routing |
| OD moves | `PP`/`KK` is sufficient, no separate `[OD]` badge |
| `c.`/`f.` prefixes | GGST concern, not SF6 — parse silently for now, full support post-1.0 |
| Charge input validation | None — any held/release pair (even `[4]4HP`) renders as written; charge notation varies too much across games and players to enforce rules |
| Plugin display name | `Fg Notation` |
| Plugin ID | `fg-notation` (verify against community list before submitting) |
| Author | Jeremy Farmer |
