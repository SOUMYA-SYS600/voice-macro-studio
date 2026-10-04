# Voice Macro Studio — phone-only demo script

Target duration: about 4 minutes. Record in portrait mode with microphone audio.

## Prepare before recording

1. Turn on **Do Not Disturb** and hide notification previews.
2. Close private chats and other apps from Recents.
3. Confirm Voice Macro Studio has microphone and Accessibility permissions.
4. Open Zomato beforehand and navigate to a simple one-tap item such as Choco Chip Brownie.
5. Remove the item completely so **ADD** is visible.
6. Use **Delete All Learned Flows** before the final take only if you plan to show teaching.
7. Test a 10-second screen recording. Confirm your voice is audible and the app can still recognize speech while recording.

If the screen recorder prevents speech recognition, use another phone's camera to record this phone instead.

## 0:00–0:25 — Introduction

Show the Voice Macro Studio main screen.

Say:

> Hello everyone. Today I am presenting Voice Macro Studio, an Android accessibility application that learns a simple task from one demonstration and safely repeats it using English or Hinglish voice commands. Let me show you how it works.

Then say:

> This build uses Android speech recognition, local Room storage, and Accessibility services, so it does not require any paid API.

Show **Accessibility: connected** and **Speech recognizer available: true**.

## 0:25–0:45 — Architecture

Say:

> The application uses Android speech recognition, local Room storage, and Accessibility services. Voice is converted to text, a local parser extracts quantity, and a deterministic matcher loads the learned flow from Room. Before every action, it checks that the screen is safe, and after every action, it verifies that the screen actually changed.

## 0:45–1:20 — Teach one flow

Open the Zomato menu with the brownie absent and ADD visible.

Say:

> First, I will teach the application how to add one item. After that, I will repeat the same task using different voice commands and quantities.

1. Tap **Recheck** and show the blue Ready banner.
2. Tap **Record**.
3. Say: **“choco chip brownie safe.”**
4. Wait for the red recording banner.
5. Tap the brownie's **ADD** control exactly once.
6. Immediately tap **Record** again.
7. Show that **1 step** was saved.
8. Remove the brownie completely.

Say:

> The app stored a semantic selector, nearby item context, and normalized screen position. It did not store a raw screen tree or payment information.

## 1:20–1:55 — English quantity

Return to the same menu position and tap **Recheck**.

Tap **Listen** and say:

> Add three choco chip brownie safe.

Wait without touching the screen. Show quantity **3** and the message ending with **Quantity 3**.

Say:

> Each ADD or plus action passed a fresh safety check and a verified screen transition.

## 1:55–2:30 — Hinglish quantity

Remove the brownie completely and tap **Recheck**.

Tap **Listen** and say:

> Do choco chip brownie safe.

Show quantity **2** and verified completion.

Say:

> The local parser understands “do” as the Hinglish quantity two.

## 2:30–2:55 — Existing-cart protection

Keep quantity 2. Tap **Listen** and say:

> Add three choco chip brownie safe.

Show **Replay not started: item already has quantity 2** and the unchanged quantity.

Say:

> The app refuses to guess whether the user means add more or set a new total.

## 2:55–3:15 — Unsupported quantity

Tap **Listen** and say:

> Add six choco chip brownie safe.

Show **Please use one quantity from 1 to 5** and the unchanged cart.

## 3:15–3:45 — Manual Stop Safety

Remove the item completely and tap **Recheck**. Then tap **Stop Safety**.

Tap **Listen** and say:

> Choco chip brownie safe.

Show the orange banner, **Replay stopped by safety check**, and no cart change.

Say:

> Stop stays latched. Recognizing a valid command cannot bypass safety.

## 3:45–4:10 — Finish honestly

Say:

> Login, password, OTP, payment, unreadable screens, unknown commands, and manual Stop fail closed. This deadline build supports a learned single-tap Zomato item and quantity one to five. Different-item substitution, address selection, and Swiggy replay remain limitations because Swiggy did not expose a usable accessibility tree on the tested phone.

Finish with:

> This prototype successfully demonstrates voice-based teaching, verified replay, English and Hinglish quantities, and fail-safe automation in Zomato without using any paid API. Thank you.

Do not open a screen that exposes a full address or payment details. Do not place an order.

## If you forget your next line

Pause briefly and say:

> Now I will demonstrate the next safety feature.

Then look at the next heading in this script and continue. A short pause is completely fine.
