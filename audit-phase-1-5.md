# Phase 1–5 logic audit — 2026-09-29

## Decision

The project is not ready to start Phase 6. The audited source builds and launches, but Phases 1–5 have outstanding acceptance gates. Earlier notes marked several phases passed from partial implementation or a single observation; those labels have been corrected in `memory.md`.

## Material findings and corrections

### Safety

- Removed the hardcoded `developerBypass` that converted Swiggy `EMPTY_TREE` into `CLEAR`. An unreadable tree is now `UNKNOWN` and blocks both recording and replay.
- Synchronized the stateful safety inspection path.
- Recording now requires a fresh clear verdict before it starts and while events are captured.
- Replay checks both the fresh screen verdict and the manual Stop latch immediately before each action dispatch.

Swiggy still withholds the usable accessibility tree from Voice Macro Studio on the tested screens. That is a compatibility blocker, not a successful safety result for automation. The safe behavior is to stop.

### UI capture

- Fixed `SnapshotBuilder` ownership so it does not clone/recycle the caller-owned root and does recycle the child nodes it owns.
- Retained meaningful React Native nodes when `isVisibleToUser` is unreliable.
- Recycled snapshot roots after the hardware-key capture path.

The code and unit tests pass, but the required repeated live capture stability has not been documented for both target apps.

### Teaching and persistence

- Spoken teaching names are now derived from the user's command instead of saving every direct recording as `New Macro`.
- Recording is limited to the current target package and stops on unsafe or unreadable screens.
- Blank click selectors are skipped, repeated TYPE events for the same field are coalesced, and a view ID is stored when available.
- Save success is reported only after the Room transaction succeeds.
- Added an additive Room 1→2 migration for `selectorViewId` instead of destroying existing learned flows.

A fresh physical-device test still needs to prove that an ordered Zomato flow saves, survives an app restart, and reloads correctly.

### Voice and intent

- Replaced hardcoded `testmicro`/`testm` shortcuts with a deterministic matcher that handles teaching commands, exact names, token similarity, unknown commands, and ambiguous matches.
- Added matcher tests for exact, typo, ambiguous, and unknown cases.

Phase 4 remains incomplete because typed slot extraction/binding has not been implemented. There is no evidence yet for five varied English/Hinglish utterances producing the expected item, quantity, and address slots.

### Replay

- Prevented concurrent replay sessions.
- Limited flow selection and node search to the foreground target package.
- Added fresh safety and Stop checks after waits and immediately before dispatch.
- Checked the return value of `performAction()` and report node-not-found, safety-blocked, and action-rejected outcomes accurately.
- Added text, description, view-ID, class, and editable-field constraints and fixed node recycling.
- Removed the false `Replay finished` message after aborted or failed runs.

Replay still lacks recorded postconditions, so it cannot yet prove that a dispatched action caused the expected screen transition. Exact and paraphrase replay must be retested on the audited APK.

## Verification performed

- Supported build stack: Java 17, Android Gradle Plugin 8.11.1, Gradle 8.13, Kotlin 2.0.21, compile/target SDK 36, min SDK 26.
- `testDebugUnitTest assembleDebug lintDebug`: passed.
- JVM tests: 15 passed, 0 failed, 0 skipped.
- Android lint: 0 errors and 51 warnings. Warnings include dependency updates, launcher icon/backup configuration, and hardcoded UI strings.
- Current audited APK version: code 20, `0.3.6-audit`.
- ADB install: success. Main activity cold launch: success. No fatal exception appeared in the checked Android runtime log.
- The initial ADB audit confirmed the connected phone and installed version code 14 / `0.3.0-audit`, then found that Android no longer reported an enabled accessibility service.
- Follow-up audit build code 15 / `0.3.1-audit` repairs service disable/re-enable lifecycle state. The full test/build/lint command passed again and installation succeeded. Accessibility must be manually re-enabled after this update.
- Follow-up build code 16 / `0.3.2-audit` repairs zero-bounds React Native selection and dynamic price/quantity text matching while keeping generic one-word labels exact. The suite now has 19 passing JVM tests; build and lint pass with 0 lint errors and 51 warnings.
- Follow-up build code 17 / `0.3.3-audit` adds item-card context to recorded selectors through a non-destructive Room 2→3 migration and blocks ambiguous candidate ties. This addresses generic ADD controls without guessing which item to tap. Tests/build/lint remain passing.
- Follow-up build code 18 / `0.3.4-audit` restricts context scoring to the nearest plausible item card so a whole menu cannot make multiple ADD buttons look equivalent. It also provides an explicit narrow control to delete learned flows and dependent steps/slots without clearing unrelated app data. The suite now has 21 passing tests.
- Follow-up build code 19 / `0.3.5-audit` records normalized target position and combines it with semantic context after v18 dispatched the wrong repeated ADD control. The suite now has 23 passing tests. Real-device correct-item replay is still required; a dispatch message alone is not accepted as success.
- Follow-up build code 20 / `0.3.6-audit` prevents indefinite emulator listening by adding cancel, timeout, and forced-processing behavior. The suite remains at 23 passing tests; build and lint pass.

These checks prove compilation and local logic tests. They do not replace the required real-app acceptance tests.

## Required gate before Phase 6

1. Zomato safety regression: normal menu clears; payment remains blocked after Recheck; Stop stays latched until a safe Recheck.
2. Zomato teaching: teach one real flow, verify its ordered steps, restart Voice Macro Studio, and verify the flow reloads.
3. Zomato replay: run the exact command and two paraphrases; verify the intended flow is selected, each action changes the expected state, Stop cancels, and no action occurs on a sensitive/unreadable screen.
4. Decide the second-app path: replace Swiggy with an app that exposes an accessibility tree, or keep Swiggy and accept that it cannot be safely automated on this device/build. Do not restore an `EMPTY_TREE` bypass.
5. Implement and test Phase 4 slot extraction before calling Phase 4 passed. Slot generalization itself belongs to Phase 6, but Phase 4 must at least produce validated typed slots and clarification outcomes.

## Current limitations

- Swiggy automation is blocked by its inaccessible tree on the tested Android 16 device.
- Hinglish recognition and intent accuracy are unmeasured.
- Replay dispatch is implemented, but postcondition verification is incomplete.
- Accessibility selectors derived from dynamic third-party app UI can break after app updates.
- The project uses local/free Android speech facilities; no paid API is required by the current code.
