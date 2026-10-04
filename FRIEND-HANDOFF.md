# Voice Macro Studio — beginner handoff

Date: 2026-09-30  
Submission date: 2026-09-30  
Current app build: `0.4.0-quantity` (version code 26)

## First: what device to use

Use the **Android Studio Emulator / Android Virtual Device (AVD)**. Android Auto is the car-screen product and is not suitable for this project.

An Android 16 Google Play emulator named `VoiceMacro_API36` is installed and passed its first boot. Hardware acceleration is available. Voice Macro Studio `0.3.6-audit` and Zomato are installed, the microphone permission is granted, and the tester is logged into Zomato. Login, OTP, and account details must be entered manually by the account owner and must never be pasted into Codex, logs, screenshots, or project files.

## Current project status

- Android project builds with Java 17, AGP 8.11.1, Gradle 8.13, compile/target SDK 36, and min SDK 26.
- Latest verification: 30 JVM tests passed; debug build and Android lint pass.
- Zomato safety behavior passed on the physical phone: normal menu clear, manual Stop latched, payment screen blocked, and Recheck could not bypass payment.
- Spoken teaching, Room persistence, flow matching, correct-item replay, verified postconditions, and manual cancellation work on the tested Zomato flow.
- English quantity 3 and Hinglish quantity 2 passed live on the emulator. Existing-cart and quantity-above-5 commands were rejected without changing the cart.
- Swiggy withheld its usable accessibility tree on the physical Android 16 phone. It must remain fail-closed. Never restore an `EMPTY_TREE -> CLEAR` bypass.
- Deadline-scoped Phase 6 quantity 1–5 passed for a learned single-tap Zomato item. Different-item substitution, address selection, and Swiggy replay remain limitations.

Read [memory.md](memory.md) and [audit-phase-1-5.md](audit-phase-1-5.md) before changing code.

## Start the emulator

### Android Studio method

1. Open Android Studio.
2. Open this project folder: `C:\Users\DELL\OneDrive\Desktop\Voice macro studio`.
3. Open **File → Settings → Build, Execution, Deployment → Build Tools → Gradle** and set **Gradle JDK** to `C:\Users\DELL\OneDrive\Desktop\Voice macro studio\.tools\jdk17\jdk-17.0.20.1+1`.
4. Select **Tools → Device Manager**.
5. In **Virtual**, find `VoiceMacro_API36` and press its triangular Play button.
6. Wait until the Android home screen is fully visible.

### Easiest method

Double-click `START-EMULATOR.bat` in the project folder. Keep the black status window open until it reports that `emulator-5554` is a `device` and the Android home screen appears.

### Command-line method

Open PowerShell and run:

```powershell
& 'C:\Users\DELL\AppData\Local\Android\Sdk\emulator\emulator.exe' -avd VoiceMacro_API36
```

In a second PowerShell window, confirm it is ready:

```powershell
& 'C:\Users\DELL\AppData\Local\Android\Sdk\platform-tools\adb.exe' devices -l
```

Continue only when an `emulator-...` entry says `device`, not `offline`.

## Install and prepare target apps

1. The Play Store should already show Zomato. Otherwise open **Play Store** and search for Zomato.
2. Sign in manually.
3. Install **Zomato**.
4. Open Zomato and sign in manually. Do not share credentials, OTPs, address details, or payment information.
5. Choose a restaurant and a low-risk test item. Never complete an order during development.

Swiggy may be installed later for a compatibility check. If Voice Macro Studio reports `EMPTY_TREE`, `UNKNOWN`, or unreadable, record it as blocked and stop. Do not weaken the safety gate.

## Install Voice Macro Studio

The latest debug APK is normally here:

`C:\Users\DELL\.gradle\voice-macro-studio\build\app\outputs\apk\debug\app-debug.apk`

With only the emulator connected:

```powershell
& 'C:\Users\DELL\AppData\Local\Android\Sdk\platform-tools\adb.exe' install -r 'C:\Users\DELL\.gradle\voice-macro-studio\build\app\outputs\apk\debug\app-debug.apk'
```

If a phone and emulator are both connected, first obtain the emulator ID from `adb devices`, then use:

```powershell
& 'C:\Users\DELL\AppData\Local\Android\Sdk\platform-tools\adb.exe' -s emulator-5554 install -r 'C:\Users\DELL\.gradle\voice-macro-studio\build\app\outputs\apk\debug\app-debug.apk'
```

Replace `emulator-5554` if `adb devices` shows a different ID.

## Grant required permissions

1. Open **Voice Macro Studio** in the emulator.
2. Tap **Grant Mic Permission** and choose **While using the app**.
3. Tap **Open accessibility settings**.
4. Open **Downloaded apps** or **Installed services**.
5. Select **Voice Macro Studio** and enable **Use service**.
6. Accept Android's warning.
7. Return to Voice Macro Studio and confirm `Accessibility: connected`.
8. Tap **Test spoken feedback** and confirm sound is audible.

If speech does not hear the host microphone, open the emulator's three-dot **Extended controls**, select **Microphone**, and enable host microphone input. Also check Windows microphone permission for Android Studio/Android Emulator.

## Clean exact-replay and quantity test

Do this before a demo recording if the saved flow or restaurant changes.

1. In Voice Macro Studio, tap **Delete all learned flows**. Wait for `All learned flows and replay history were deleted.`
2. Open Zomato and navigate to a normal restaurant menu.
3. Choose one simple item that does not require customization. Keep its ADD button visible.
4. Ensure the item is not already in the cart.
5. Tap overlay **Recheck**. Continue only if the banner is blue/ready.
6. Tap **Record** and say a unique command such as `add dal khichdi safe`.
7. Wait for the red recording state.
8. Tap the chosen item's **ADD** button exactly once.
9. Tap **Record** again to stop. Expected: one saved step.
10. Remove the item manually, return to exactly the same menu and scroll position, and ensure the same ADD button is visible.
11. Tap **Recheck** and confirm blue.
12. Tap **Listen**, say the exact command, and do not touch the emulator.
13. Pass only if the exact demonstrated item is added. `Replay actions dispatched` alone is not proof.

If the wrong item is added, immediately tap **Stop Safety**, remove the item manually, and report:

- Spoken command
- Saved step count
- Intended item
- Actual item
- Exact final overlay message
- Whether the menu was at the same scroll position

Do not add more learning attempts under the same name. Delete learned flows before every clean retest.

## Paraphrase test after exact replay passes

Use the same starting screen and reset the cart before every run.

1. Exact: `add dal khichdi safe`
2. Paraphrase 1: `please run add dal khichdi safe`
3. Paraphrase 2: `start the dal khichdi safe macro`

Each run must select the same learned flow and add the same item. Record actual results in `memory.md`. If matching is ambiguous or unknown, it must ask rather than execute.

## Safety regression

1. On a normal menu, Recheck must produce a blue ready banner.
2. Tap **Stop Safety**. It must remain blocked until manual Recheck on a clear screen.
3. Navigate manually to cart/payment without placing an order.
4. Expected: orange `Your turn: payment screen. Automation blocked.`
5. Tap Recheck while remaining on payment. It must stay orange and blocked.
6. Never enter or record a password, OTP, CVV, UPI PIN, or payment value.

## Build verification

In PowerShell from the project folder:

```powershell
$taskJdk = Get-ChildItem '.tools/jdk17' -Directory | Select-Object -First 1 -ExpandProperty FullName
$env:JAVA_HOME = $taskJdk
& '.tools/gradle-8.13/bin/gradle.bat' testDebugUnitTest assembleDebug lintDebug --console=plain
```

Expected before any release work:

- `BUILD SUCCESSFUL`
- 23 or more tests, 0 failures
- Lint: 0 errors. Existing warnings must be reported honestly.

## Architecture in one page

```text
User speech
  → Android SpeechRecognizer (English India / Hinglish attempt)
  → IntentMatcher (exact, typo/token similarity, unknown, ambiguity)
  → Room flow + ordered steps
  → current target-package check
  → fresh accessibility-tree safety inspection
  → selector scoring: ID/text/description/class + item-card context + recorded position
  → ambiguity rejection
  → fresh safety + Stop-latch check immediately before dispatch
  → Accessibility ACTION_CLICK / ACTION_SET_TEXT
  → result message and spoken feedback

Teaching:
Record command
  → fresh safety check
  → capture click/type events only from current target package
  → coalesce repeated typing
  → store selectors locally in Room
  → stop immediately on payment/login/OTP/password/unreadable screens
```

## Deadline order

1. Make one Zomato exact replay add the correct item.
2. Pass two paraphrases from a reset starting state.
3. Add and test the smallest viable item/quantity slot implementation.
4. Build the final APK and write truthful limitations.
5. Record the unedited demo only after the same sequence passes twice.
6. Treat Swiggy as a documented compatibility failure unless the emulator exposes a usable tree. Never claim it works without evidence.

After every test or code change, update [memory.md](memory.md) with the exact build version, input, expected result, actual result, and remaining blocker.
