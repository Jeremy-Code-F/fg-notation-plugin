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
- [x] Support dash with '66'/'44' (`j.66`/`j.44` for air dashes); the word 'dash' is intentionally not supported
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

- [x] `"id"`: `"fighting-game-notation"` — `fg-notation` / "FG Notation" were already taken by another fighting game plugin (`kh0p/fg-notation`); checked the new ID and name against `community-plugins.json`. When testing locally, the vault folder must be `.obsidian/plugins/fighting-game-notation/`
- [x] `"name"`: `"Fighting Game Notation"`
- [x] `"description"`: `"Render fighting game combo notation in your notes."` (no "Obsidian" — the validator flags it as redundant)
- [x] `"author"`: `"Jeremy Farmer"`
- [x] `"authorUrl"`: `"https://jeremyfarmer.netlify.app/"`
- [x] `"fundingUrl"`: Removed for now — see the GitHub Sponsors item in §7.3
- [x] `"version"`: `"1.0.0"`
- [x] `"minAppVersion"`: `"0.15.0"` is correct — every Obsidian API the plugin uses exists by then (see §7.2). If a future change uses a newer API, raise it and update `versions.json`

---

## 5. README

The README needs updates before submission — Obsidian reviewers read it carefully.

- [x] Fix the "[GitHub repository](#)" placeholder link — now points to the repo's issues page
- [x] Remove the "Coming Soon" coffee/donate section for now (re-add a GitHub Sponsors link once approved — see §7.3)
- [x] ~~Update the Supported Games table to include GGST, COTW, and 2XKO~~ — won't do: 1.0.0 ships SF6 only
- [x] Add docs for the `/` (or) separator
- [x] Add a section for grappler notation examples
- [x] Add a section for tiger knee notation
- [x] Include screenshots of the rendered output (combo and charge screenshots both in the README)
- [x] Add a "Compatibility" note (desktop + mobile, offline)
- [ ] Verify the plugin on Obsidian mobile — the README says it works on mobile, but it hasn't been tested there yet
- Rewritten for 1.0.0: renamed to "Fighting Game Notation", full SF6 notation reference (motions, buttons, prefixes, separators, charge, tiger knee, grapplers, dashes, microwalk, badges), install instructions with the new plugin folder name, license section. Every example in the README was run through the parser and renders with no raw tokens

---

## 6. CI / Release Pipeline

### 6.1 Automated release workflow
- [ ] Add `.github/workflows/release.yml` that:
  - Triggers on a version tag push — the tag must exactly match `manifest.json`'s `version` with no `v` prefix (e.g. `1.0.0`, not `v1.0.0`). `.npmrc` already sets `tag-version-prefix=""`, so `npm version` creates tags in this format
  - Runs `npm ci && npm run build`
  - Creates a GitHub Release and attaches `main.js`, `manifest.json`, and `styles.css` as individual assets (not a zip)
  - (Obsidian's community registry expects those exact three files on the release)
- [ ] Confirm the build output filename is `main.js` (the community registry requires this)

### 6.2 Test run in CI
- [ ] Add `npm test` step to the existing `lint.yml` workflow (tests aren't currently run in CI)

---

## 7. Pre-1.0 Review Findings

Found in a whole-project review before release. Items that overlap §4–§6 point there instead of duplicating them.

### 7.1 Will fail checks or get flagged in review
- [x] **CI lint is failing** — `npm run lint` now exits clean (0 errors, 0 warnings). Kept `eslint .` so `manifest.json` stays linted; added `vitest.config.ts`, `scripts/`, `src/test-setup.ts` and `src/obsidian-test-stub.ts` (test/tooling only, never shipped) to the eslint ignores; `_`-prefixed unused vars are now allowed; dropped the unused `ButtonType` import in `button-recognizer.ts`
- [x] **Sample settings tab still shipped** — removed `src/settings.ts` and the settings plumbing from `main.ts` (no settings needed for 1.0)
- [x] **`LICENSE` is the sample plugin's** — replaced with MIT, copyright 2026 Jeremy Farmer; `package.json` `license` updated to match
- [x] **`package.json` still says `obsidian-sample-plugin`** — `name` is now `fighting-game-notation` (matches the plugin ID) and `description` matches the manifest; `package-lock.json` regenerated
- [x] **Plugin ID / name rules** — `fighting-game-notation` / "Fighting Game Notation" don't end in `plugin`/"Plugin" and the description ends with a period (see §4)
- [x] **README documents notation that doesn't work** (fixed in the §5 rewrite) — remove `RC`, `Burst`, `WS`, `WB`, `[RISC]`, `c.HS`, `j.K` (GGST/other-game notation that won't parse in the SF6-only build); document `/` (OR), `tk.`, `d.`, dashes (`66`/`44`), microwalk, `SA1`–`SA3`, `WALLSPLAT`; drop the §5 bullet about adding GGST/COTW/2XKO to the games table

### 7.2 Should fix
- [x] **Too much console logging** — removed the per-badge log (`icon-provider.ts`), the per-block log (`fg-renderer.ts`), the parser's "not recognized" warning, and the charge recognizer's warning for non-direction digits like `[0]` (user input, not an error). The remaining `console.warn` calls sit right before a `throw` on lookups that only fail through a code bug; they're handled by the try/catch item below
- [x] **A parser error leaves the block blank** — `processFgBlock` now catches errors from parsing or rendering, clears any partial output, shows each line as plain text, and logs once with `console.error`. Removed the now-redundant `console.warn` calls before each internal `throw`. Tests cover a parser crash, a crash midway through rendering, and that unrecognized user input logs nothing
- [x] **Release tag conflict** — §6.1 and §8 now say to tag `1.0.0` with no `v`, matching `AGENTS.md` and Obsidian's docs (`.npmrc` already had `tag-version-prefix=""`); §6.1 also now says to attach the files individually rather than as a zip
- [x] ~~**`minAppVersion` 0.15.0 is probably too low**~~ — it isn't: checked the published `obsidian` API types and `sanitizeHTMLToDom` first appears between 0.12.17 and 0.13.8; `Plugin` and `registerMarkdownCodeBlockProcessor` date to 0.9.7, and the DOM helpers are in 0.11.13 at the latest. Kept 0.15.0 (`versions.json` already matches)
- [x] **Hardcoded button colors** — checked in light and dark themes; both look fine, so no color changes. Removed the sample comment block at the top of `styles.css`

### 7.3 Nice to have
- [ ] **Add GitHub Sponsors once approved** — application submitted; `https://github.com/sponsors/Jeremy-Code-F` currently just redirects to the profile. After approval, add `"fundingUrl": "https://github.com/sponsors/Jeremy-Code-F"` to `manifest.json` and a sponsor link to the README, then ship it (in 1.0.0 if approved before submission, otherwise a 1.0.1)
- [x] **Leftover code and files**:
  - deleted the unused `assets/icons/Cotw-LP.png` (from the removed COTW config)
  - removed the unused `parseDirection` method, `DIRECTION_MAP` and `cursor` field from `fg-tokenizer-parser.ts`, and merged the duplicate `config`/`gameConfig` fields into one constructor parameter
  - moved `obsidian` from `dependencies` (`"latest"`) to `devDependencies`, pinned to the installed `1.10.3`
- [x] **Turn on `"strict": true` in `tsconfig.json`** — enabled with no new type errors; removed the individual flags it already covers, kept `noImplicitReturns` and `noUncheckedIndexedAccess` (not part of `strict`)

---

## 8. Obsidian Community Plugin Submission

Once all the above is done:

- [ ] **Create a public GitHub repository** (if not already public)
- [ ] **Tag and release `1.0.0`** (no `v` prefix — the tag must exactly match `manifest.json`'s `version`) — the release must include `main.js`, `manifest.json`, and `styles.css` as individual release assets (not just source code)
- [ ] **Fork the community plugins repo**: `obsidianmd/obsidian-releases`
- [ ] **Add your plugin entry** to `community-plugins.json` in that fork:
  ```json
  {
    "id": "fighting-game-notation",
    "name": "Fighting Game Notation",
    "author": "Jeremy Farmer",
    "description": "Render fighting game combo notation in your notes.",
    "repo": "Jeremy-Code-F/fg-notation-plugin"
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
| Plugin display name | `Fighting Game Notation` (`FG Notation` was already taken) |
| Plugin ID | `fighting-game-notation` (`fg-notation` was already taken by `kh0p/fg-notation`; new ID checked against the community list) |
| Funding link | None for 1.0.0; add GitHub Sponsors once approved (no public address needed, unlike Buy Me a Coffee's support address) |
| Author | Jeremy Farmer |
