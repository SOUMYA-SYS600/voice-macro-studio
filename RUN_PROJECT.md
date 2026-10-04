# Voice Macro Studio — run and test guide

This guide is written for a new tester preparing the live hackathon demo.

## What is included

- Android/Kotlin source code.
- Gradle wrapper and project configuration.
- Tested installable APK: `dist/VoiceMacroStudio-v0.4.0-quantity-debug.apk`.
- Planning, architecture, validation, and delivery documents.

Private app data is intentionally not included. Learned flows are stored in Android's private Room database, so a new phone or emulator must teach its own flow once.

## Requirements

- Android Studio with Android SDK 36.
- Java 17. Android Studio's bundled JDK 17 is acceptable.
- An Android device or Google Play emulator running Android 8.0/API 26 or newer.
- Internet access for the first Gradle dependency download and Android speech recognition.
- Zomato installed and logged in manually.
- A working microphone.

No paid API, Gemini key, or billing account is required.

## Quickest method: install the packaged APK

1. Extract the source ZIP.
2. Start an Android emulator or connect a phone with USB debugging.
3. Open a terminal in the extracted project folder.
4. Confirm the device is visible:

```powershell
adb devices
```

5. Install the packaged APK:

```powershell
adb install -r ".\dist\VoiceMacroStudio-v0.4.0-quantity-debug.apk"
```

If more than one device is connected, use its serial:

```powershell
adb -s emulator-5554 install -r ".\dist\VoiceMacroStudio-v0.4.0-quantity-debug.apk"
```

The APK SHA-256 is recorded in `dist/SHA256SUMS.txt`.

## Open and build the source in Android Studio

1. Open Android Studio.
2. Choose **Open** and select the extracted project folder.
3. If prompted, trust the project.
4. Open **File → Settings → Build, Execution, Deployment → Build Tools → Gradle**.
5. Set **Gradle JDK** to Java 17.
6. Open **Tools → SDK Manager** and ensure Android SDK Platform 36 and recent Build Tools are installed.
7. Let Gradle synchronization finish.
8. Select the connected device/emulator and press **Run**.

Command-line verification on Windows:

```powershell
$env:JAVA_HOME = "C:\path\to\jdk-17"
$env:ANDROID_HOME = "$env:LOCALAPPDATA\Android\Sdk"
.\gradlew.bat testDebugUnitTest assembleDebug lintDebug --console=plain
```

Expected result: 30 JVM tests pass, the debug APK builds, and lint completes. The generated APK is normally under the Gradle user home because this project keeps generated files outside OneDrive:

`%USERPROFILE%\.gradle\voice-macro-studio\build\app\outputs\apk\debug\app-debug.apk`

## Required Android setup

1. Open **Voice Macro Studio**.
2. Grant microphone permission.
3. Tap **Open Accessibility Settings**.
4. Open **Downloaded apps** or **Installed services**.
5. Select **Voice Macro Studio** and enable **Use service**.
6. Return to the app and confirm **Accessibility: connected**.
7. Tap **Test Spoken Feedback** and confirm audio is audible.
8. Open Zomato. Login and OTP entry must be done privately by the account owner.

For an Android Studio emulator, open its three-dot **Extended controls → Microphone** and enable host microphone input if speech remains in Listening.

## Teach a fresh safe demo flow

Use a simple Zomato item that adds with one tap and does not open a customization dialog.

1. Open a restaurant menu and keep the chosen item's **ADD** control visible.
2. Ensure that item is absent from the cart.
3. Confirm the Voice Macro overlay is blue and says **Ready**. Tap **Recheck** if needed.
4. Tap **Record**.
5. Say a unique command, for example: **“choco chip brownie safe.”**
6. Wait for the red recording banner.
7. Tap that item's **ADD** button exactly once.
8. Tap **Record** again to stop.
9. Confirm the app reports one saved step.
10. Remove the item completely and return to the same menu and scroll position.

If the wrong control was recorded, open Voice Macro Studio and use **Delete All Learned Flows**, then teach again.

## Replay and quantity tests

Start every fresh quantity request with the item absent and the original ADD control visible.

English example:

1. Tap **Recheck**, then **Listen**.
2. Say **“Add three choco chip brownie safe.”**
3. Expect quantity 3 and **Replay completed and verified ... Quantity 3**.

Hinglish example:

1. Remove the item completely and tap **Recheck**, then **Listen**.
2. Say **“Do choco chip brownie safe.”**
3. Expect quantity 2 and verified completion.

Safety examples:

- With quantity 2 still present, request quantity 3. Replay must refuse and leave the cart unchanged.
- Say **“Add six choco chip brownie safe.”** It must request a quantity from 1 to 5.
- Tap **Stop Safety**, then say the learned command. Replay must stop without changing the cart.
- Payment, login, password, OTP, unreadable, and unsupported screens must remain orange/blocked.

## Troubleshooting

- **Accessibility overlay missing:** re-enable Voice Macro Studio under Android Accessibility settings.
- **Listening never completes:** enable host microphone input; tap Listen again to cancel and retry.
- **Flow not learned:** use the exact saved name once, then try wrapper phrases such as `run the ... macro`.
- **Target not found or ambiguous:** return to the same restaurant menu and scroll position used while teaching.
- **Item already has quantity:** remove it completely before requesting a new total.
- **Swiggy reports unreadable or EMPTY_TREE:** stop. Swiggy is an acknowledged unsupported target in this deadline build; do not bypass the safety gate.
- **Payment screen:** never place an order. Show the orange block and return manually.

Read `DELIVERY.md` for validated scope and architecture, and `memory.md` for dated evidence.
