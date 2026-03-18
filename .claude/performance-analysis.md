# Performance Analysis Report
_Generated: 2026-03-16_

## Critical

**1. No debouncing on keystrokes** (`decorator.ts:61-73`)
Every character typed triggers a full document re-render — all regex operations, compilation, and math evaluation for every line. A simple 300ms debounce would drastically reduce CPU usage.

**2. Entire `mathjs.all` bundled** (`math.ts:10`)
```typescript
const math = mathjs.create(mathjs.all, {})
```
This pulls in matrices, complex numbers, symbolic algebra — none of which are used. Using only the needed factories could cut bundle size by 50-70% (currently ~3.4MB).

**3. Tree shaking not enabled** (`esbuild.js`)
No `treeShaking: true` in build options, so dead code isn't eliminated.

---

## High

**4. Global declarations re-evaluated every render** (`document.ts:66-69`)
There's even a `// TODO: not ideal because of performance` comment in the code. These should be compiled/evaluated once and cached.

**5. Settings fetched on every keystroke** (`settings.ts:35-37`)
`vscode.workspace.getConfiguration()` is called 10+ times per keystroke. Settings should be cached and only invalidated on `onDidChangeConfiguration`.

**6. O(n²) margin calculation** (`decorator.ts:159-169`)
When alignment is on, `calculateMargin()` is called for every result line and accesses `lineAt()` again inside — should be precomputed once per render.

**7. Unbounded compile cache** (`document.ts:21`)
The `compileCache` map has no size limit. For documents with many unique expressions it grows forever. Needs an LRU or max-size cap.

---

## Medium

**8. Transformer does test-then-replace on every regex** (`transformer.ts:23-106`)
20+ patterns each call `.test()` then `.replace()` separately — doubles the regex work. Just calling `.replace()` (which returns the original string if no match) is sufficient.

**9. `isMathEnabled()` creates a new array on every call** (`decorator.ts:208-210`)
The `disabledPatterns` filter array is reconstructed on every document change. Should be built once and cached.

**10. Aggregation backward scan is O(n)** (`document.ts:171-206`)
`sum`/`avg`/`mean` walks backward through the entire document running regex on every line each time it's called.

---

## Low / Build

**11. Source maps in dev watch mode** (`esbuild.js:14`)
6.8MB source map regenerated on every build. Could be skipped or made opt-in for faster watch rebuilds.

**12. TypeScript target is ES6** (`tsconfig.json`)
VS Code runs on modern Node.js — targeting ES2020+ enables better tree-shaking.

**13. `colors` package in dependencies** (`package.json`)
Listed as a runtime dependency but appears unused in the bundled output.
