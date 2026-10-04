# Phase 1 validation

Status after the 2026-09-29 audit: the safety code and JVM tests pass, Zomato has partial physical-device evidence, and Swiggy remains blocked by an unreadable accessibility tree. Recording and replay now exist, so this safety gate must be rerun through the actual executor.

## Implemented

- Bounded inspection of the active target app's visible labels and password metadata.
- Editable field text/descriptions/hints are not read. No screen text is retained, logged, or sent over the network.
- Password, OTP, payment/CVV/UPI, and login markers; English plus selected Hindi labels.
- Missing/unreadable trees, traversal limits, interruptions, and outside-target states block permission to act.
- Orange stop banner and spoken status. Stop persists until manual Recheck succeeds on a currently clear screen.
- Logs contain package, enum verdict/reason, and latch state only.
- Shared SafetyGate requires a fresh check for each future action/recording decision; it is unit-tested but has no executor integration yet. Future phases must not treat a stored CLEAR verdict as permission.

## Automated evidence

Seven JUnit tests cover sensitive labels, normal browsing/substrings, password input metadata, latched stops, unknown/outside-target denial, fresh checks, manual stop, and preservation of a confirmed sensitive reason through incomplete reads. Android build and lint pass; lint warnings remain.

Device findings: initial Zomato testing alternated CLEAR/PAYMENT with generic UNREADABLE on menus and checkout. v0.2.1 adds precise failure reasons, a 750 ms traversal budget, event coalescing, and continued scanning after missing children while still denying CLEAR for incomplete trees. Revised device behavior remains unverified.

## Device procedure — repeat for Zomato and Swiggy

1. Confirm accessibility remains enabled after update.
2. Open a normal restaurant/menu screen. Tap the overlay's Recheck. Expect blue: no sensitive marker detected. This is a heuristic result, not a guarantee of safety.
3. Navigate manually to a payment-options screen without placing an order. Expect orange, PAYMENT, and a spoken handoff. If payment markers are already on the cart screen, an earlier stop is expected.
4. Tap Recheck while on that sensitive screen: it must stay blocked.
5. Return to a normal menu screen: stop should stay latched. Tap Recheck there: it may clear only if a fresh inspection succeeds.
6. Tap Stop on a clear screen: it must block until another successful manual Recheck.
7. Where a login/OTP/password screen is reachable without disrupting the existing account, test detection without typing credentials. Do not log out solely for this test; report unavailable cases as pending.
8. Return to Voice Macro Studio to read the last target-app classification. Report whether spoken feedback was audible; TTS availability alone is not sufficient evidence.

| App | Normal screen | Payment screen | Recheck cannot bypass | Login/OTP/password | Spoken feedback |
| --- | --- | --- | --- | --- | --- |
| Zomato | Passed: blue CLEAR banner on restaurant menu | Passed: orange PAYMENT banner at Place Order/Google Pay UPI | Passed by supplied checkout screenshot sequence; payment block remained | Not tested; logged-in account retained | Not reported |
| Swiggy | Blocked: service receives `EMPTY_TREE` | Blocked: cannot safely classify | Passed only in the fail-closed sense; unreadable screens stay blocked | Pending | Passed: user confirmed audible feedback |

## Limits and gate

Keyword rules can produce false positives (for example payment promotions on a menu) or miss unlabeled custom UI. Hinglish speech is not part of this phase. Whole-screen inspection must precede recording, and every actual dispatch needs a fresh check plus cancellation/window validation when replay is added. A polling interval is not sufficient protection for an executor.

Phase 1 remains in progress until the required real-screen checks in two apps pass. Tests here do not establish zero taps on sensitive screens in a replay engine that has not been built.

Zomato v0.2.1 retest evidence: normal menu is clear; checkout is detected as payment; the payment screen remains blocked after the requested Recheck. Login/OTP/password was not exercised because the account is already logged in. Swiggy remains required for the two-app gate.

Swiggy initially returned EMPTY_TREE despite UIAutomator exposing 160 structural nodes. All nodes incorrectly reported visible-to-user=false. v0.2.2 added display-bounds visibility fallback and application-window selection; v0.2.3 additionally requests views that the app does not mark important for accessibility. Device retest is pending. Spoken feedback is confirmed audible.

## Audit correction — 2026-09-29

The later v0.2.11 `developerBypass` was unsafe because it classified `EMPTY_TREE` as `CLEAR`. It has been removed. Swiggy now remains blocked whenever Voice Macro Studio cannot inspect its content. Phase 1 cannot be marked passed for two apps until a second app supplies an inspectable tree and passes the normal/sensitive/Recheck procedure, or Swiggy begins supplying one through supported accessibility APIs.

The audited executor performs a fresh safety check and checks the manual Stop latch immediately before every dispatch. The complete Zomato safety sequence must now be rerun while replay is active to satisfy the Phase 1/T11 gate.
