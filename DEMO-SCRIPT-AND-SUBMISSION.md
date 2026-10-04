# Voice Macro Studio — live demo script and submission checklist

Target duration: 4 to 5 minutes, unedited.

## Before recording

- Use Zomato only for the working automation demo.
- Login beforehand and hide notifications.
- Choose a simple item with one-tap ADD and teach it once using `RUN_PROJECT.md`.
- Remove the item completely and return to the recorded scroll position.
- Confirm microphone permission, accessibility connection, spoken feedback, and a blue Ready banner.
- Never show passwords, OTPs, complete addresses, payment details, or API keys.
- Never place a real order.

## Spoken presentation script

### 0:00–0:30 — Problem and product

Show the Voice Macro Studio home screen.

Say:

> Voice Macro Studio lets a user teach an Android task once and replay it using English or Hinglish voice commands. It uses Android accessibility, local Room storage, and Android speech services, so this deadline build needs no paid API.

Show **Accessibility: connected** and the app disclosure.

### 0:30–1:05 — Architecture and safety

Open `DELIVERY.md` briefly or explain over the app.

Say:

> Speech produces several recognition alternatives. A deterministic local matcher selects a learned flow, while a local parser extracts quantity from one to five. Before every tap, a fresh safety gate checks the active screen. The replay resolves the demonstrated control using semantic context and screen position, performs the action, and verifies that the nearby UI structure changed. Login, password, OTP, payment, unreadable screens, unknown commands, and manual Stop all fail closed.

### 1:05–1:45 — English quantity replay

Open the recorded Zomato menu. Show the item absent and the blue Ready banner.

Tap **Listen** and say:

> Add three choco chip brownie safe.

Wait without touching the emulator. Show quantity 3 and the yellow message ending in **Quantity 3**.

Say:

> The app performed three separately safety-checked actions and verified every state transition instead of treating a dispatched tap as success.

### 1:45–2:25 — Hinglish quantity replay

Manually remove the item completely, return to the same position, and tap **Recheck**.

Tap **Listen** and say:

> Do choco chip brownie safe.

Show quantity 2 and verified completion.

Say:

> Here, “do” is parsed locally as the Hinglish quantity two.

### 2:25–2:55 — Existing-cart protection

Keep quantity 2. Tap **Listen** and say:

> Add three choco chip brownie safe.

Show **Replay not started: item already has quantity 2** and the unchanged cart.

Say:

> The app refuses to guess whether quantity means add more or set a new total.

### 2:55–3:20 — Unsupported quantity

Tap **Listen** and say:

> Add six choco chip brownie safe.

Show **Please use one quantity from 1 to 5** and quantity still at 2.

### 3:20–3:50 — Manual Stop

Remove the item completely, tap **Recheck**, then **Stop Safety**. Tap **Listen** and say the learned command.

Show the orange banner and **Replay stopped by safety check** with no cart change.

Say:

> Stop is latched. Matching a voice command does not authorize an action while safety is stopped.

### 3:50–4:20 — Payment handoff, only if already prepared safely

Manually add an item and open the cart/payment handoff without confirming an order. Show the orange payment block.

Say:

> Payment is always the user's turn. Voice Macro Studio blocks automation and never places the order.

Do not show sensitive payment details. Skip this segment if it cannot be shown safely.

### 4:20–4:50 — Honest limitations and close

Say:

> This hackathon build validates teaching, verified replay, safety, and English/Hinglish quantity one to five for a learned single-tap Zomato item. Different-item substitution, address selection, and Swiggy replay remain limitations. Swiggy withheld a usable accessibility tree on the tested phone, so the app blocks rather than using unsafe coordinates.

## Files to submit or send

1. `VoiceMacroStudio-project-v0.4.0.zip` — clean project source and documentation.
2. `dist/VoiceMacroStudio-v0.4.0-quantity-debug.apk` — tested installable hackathon APK.
3. The unedited demonstration video, no longer than the event limit.
4. `README.md` — project summary and build instructions.
5. `DELIVERY.md` — validated scope, architecture pipeline, checksum, demo order, and limitations.
6. `RUN_PROJECT.md` — beginner setup, teaching, replay, and troubleshooting guide.
7. `memory.md` — dated engineering and device-test evidence, if the submission accepts supporting documentation.

If the portal accepts only one archive, the source ZIP already includes the APK and all Markdown documents.

## Final submission checks

- Verify the APK installs on the demo device.
- Verify SHA-256 against `dist/SHA256SUMS.txt`.
- Open the ZIP once and confirm `app`, `gradle`, `gradlew.bat`, `README.md`, `RUN_PROJECT.md`, `DELIVERY.md`, and the APK are present.
- Confirm the video has audible narration and readable overlay text.
- Confirm no credentials, OTPs, complete addresses, payment details, or personal notifications appear.
- State the supported target as Zomato and list Swiggy as fail-closed/unsupported on the tested device.
- State clearly that the APK is debug-signed for hackathon evaluation.
