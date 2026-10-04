import fs from "node:fs/promises";
import path from "node:path";
import { pathToFileURL } from "node:url";
import { Presentation, PresentationFile } from "@oai/artifact-tool";

const SKILL_DIR = "C:/Users/DELL/.codex/plugins/cache/openai-primary-runtime/presentations/26.905.11957/skills/presentations";
const WORKSPACE = "C:/Users/DELL/OneDrive/Desktop/Voice macro studio/_github_repo";
const BUILD = "C:/Users/DELL/OneDrive/Desktop/Voice macro studio/_ppt_build";
const FINAL = path.join(WORKSPACE, "docs", "Voice-Macro-Studio-STRAWHATS.pptx");
const RUNTIME_PYTHON = "C:/Users/DELL/.cache/codex-runtimes/codex-primary-runtime/dependencies/python/python.exe";
const { resolvePresentationFont, finalizePresentation } = await import(
  pathToFileURL(path.join(SKILL_DIR, "container_tools/artifact_tool_utils.mjs")).href
);

const family = resolvePresentationFont();
const deck = Presentation.create({ slideSize: { width: 1280, height: 720 } });

const C = {
  ink: "#071421", navy: "#0D2538", panel: "#132F44", panel2: "#173A50",
  straw: "#F4B942", straw2: "#FFD978", teal: "#2DD4BF", green: "#55D68B",
  orange: "#FF8A4C", red: "#FF5F6D", blue: "#61A8FF", white: "#F8FAFC",
  muted: "#AFC3D4", line: "#294C63", soft: "#E8F0F6", darkText: "#102635"
};

const IMG = {
  success2: "C:/Users/DELL/AppData/Local/Temp/codex-clipboard-8096a505-d842-41dc-a82d-57672fc86eb9.png",
  success3: "C:/Users/DELL/AppData/Local/Temp/codex-clipboard-ed5fa4f5-a5c6-46eb-b46c-3bc6852902e7.png",
  verified: "C:/Users/DELL/AppData/Local/Temp/codex-clipboard-72c3b4c9-9b7e-4448-aec1-2e04cae4287e.png",
  stop: "C:/Users/DELL/AppData/Local/Temp/codex-clipboard-3d43c2fb-3c0d-4a9b-92b6-8bd5bd4ab8dc.png",
  payment: "C:/Users/DELL/AppData/Local/Temp/codex-clipboard-88c87817-925d-4ab6-b4e4-2622038cb91f.png",
  unknown: "C:/Users/DELL/AppData/Local/Temp/codex-clipboard-955aed74-3d98-425e-beda-3dc921fa2ac6.png",
  app: "C:/Users/DELL/AppData/Local/Temp/codex-clipboard-8cf46941-72f6-434e-8c51-8d046d2ebe43.png",
};

function addText(slide, text, x, y, w, h, opts = {}) {
  const s = slide.shapes.add({
    geometry: "textbox", position: { left: x, top: y, width: w, height: h },
    fill: opts.fill ?? "none", line: opts.line ?? { fill: "none", width: 0 },
    borderRadius: opts.radius,
  });
  s.text = text;
  s.text.style = {
    typeface: family, fontSize: opts.size ?? 22, bold: opts.bold ?? false,
    color: opts.color ?? C.white, autoFit: opts.autoFit ?? "shrinkText",
    alignment: opts.align ?? "left", verticalAlignment: opts.valign ?? "middle",
    insets: opts.insets ?? { left: 0, right: 0, top: 0, bottom: 0 },
  };
  return s;
}

function box(slide, x, y, w, h, fill = C.panel, radius = 18, line = C.line) {
  return slide.shapes.add({ geometry: "roundRect", position: { left: x, top: y, width: w, height: h },
    fill, line: { style: "solid", fill: line, width: 1 }, borderRadius: radius, shadow: "shadow-sm" });
}

function title(slide, kicker, heading, sub = "") {
  addText(slide, kicker.toUpperCase(), 64, 34, 520, 28, { size: 13, bold: true, color: C.straw });
  addText(slide, heading, 64, 67, 1130, 62, { size: 34, bold: true });
  if (sub) addText(slide, sub, 66, 128, 1120, 42, { size: 17, color: C.muted });
}

function footer(slide, n, label) {
  slide.shapes.add({ geometry: "line", position: { left: 64, top: 682, width: 1152, height: 0 }, fill: "none", line: { style: "solid", fill: C.line, width: 1 } });
  addText(slide, `STRAWHATS  •  ${label}`, 64, 686, 500, 22, { size: 10, color: C.muted });
  addText(slide, String(n).padStart(2, "0"), 1150, 686, 66, 22, { size: 10, bold: true, color: C.straw, align: "right" });
}

function base(n, label, bg = C.ink) {
  const s = deck.slides.add();
  s.background.fill = bg;
  footer(s, n, label);
  return s;
}

function pill(slide, text, x, y, w, fill = C.panel2, color = C.white) {
  const p = box(slide, x, y, w, 32, fill, 16, fill);
  p.shadow = "shadow-none";
  addText(slide, text, x + 10, y + 2, w - 20, 28, { size: 12, bold: true, color, align: "center" });
}

async function image(slide, file, x, y, w, h, alt, crop) {
  return slide.images.add({ blob: await fs.readFile(file), contentType: file.endsWith(".jpg") ? "image/jpeg" : "image/png",
    alt, fit: "cover", position: { left: x, top: y, width: w, height: h }, crop,
    geometry: "roundRect", borderRadius: "rounded-2xl" });
}

function iconCircle(slide, glyph, x, y, fill, color = C.ink) {
  slide.shapes.add({ geometry: "ellipse", position: { left: x, top: y, width: 52, height: 52 }, fill, line: { fill, width: 0 } });
  addText(slide, glyph, x, y, 52, 52, { size: 24, bold: true, color, align: "center" });
}

// 1 — Cover
{
  const s = base(1, "VOICE MACRO STUDIO");
  s.shapes.add({ geometry: "rect", position: { left: 0, top: 0, width: 18, height: 720 }, fill: C.straw, line: { fill: C.straw, width: 0 } });
  pill(s, "PRISM GENAI HACKATHON · 2026", 66, 48, 278, C.straw, C.ink);
  addText(s, "VOICE\nMACRO\nSTUDIO", 64, 120, 620, 250, { size: 58, bold: true });
  addText(s, "Teach once. Speak naturally. Replay safely.", 68, 385, 590, 42, { size: 23, color: C.straw2 });
  addText(s, "A local, accessibility-first Android prototype for verified voice macros in native apps.", 68, 440, 560, 76, { size: 19, color: C.muted });
  pill(s, "TEAM STRAWHATS", 68, 555, 188, C.panel2, C.straw2);
  addText(s, "Soumya Ranjan Sahoo  ·  Sandesh Anand\nG Vivek  ·  Ankit Kumar Yadav", 68, 596, 570, 50, { size: 15, color: C.white });
  box(s, 742, 42, 454, 598, C.panel, 30, C.line);
  await image(s, IMG.success2, 775, 68, 388, 546, "Successful Zomato quantity two replay on Android emulator", { left: 0.02, top: 0.02, right: 0.02, bottom: 0.02 });
  pill(s, "LIVE VERIFIED · QUANTITY 2", 820, 584, 300, C.teal, C.ink);
  s.speakerNotes.textFrame.setText("Open with the outcome: Voice Macro Studio learns a demonstrated action and replays it only when the current screen is safe and the target is confidently matched.");
}

// 2 — Problem
{
  const s = base(2, "WHY IT MATTERS");
  title(s, "01 · PROBLEM", "Voice control breaks where people need it most", "Native apps change, repeated controls look alike, and sensitive screens demand a human handoff.");
  const cards = [
    ["01", "Fragile automation", "Coordinates drift when layout, offers, or scrolling changes.", C.orange],
    ["02", "Ambiguous targets", "A menu can expose many identical ADD buttons to accessibility.", C.straw],
    ["03", "Sensitive states", "Login, OTP, password and payment screens must stop automation.", C.red],
  ];
  cards.forEach((c, i) => {
    const x = 64 + i * 388;
    box(s, x, 205, 352, 268, C.panel, 22, C.line);
    addText(s, c[0], x + 24, 226, 54, 34, { size: 14, bold: true, color: c[3] });
    addText(s, c[1], x + 24, 276, 300, 48, { size: 24, bold: true });
    addText(s, c[2], x + 24, 342, 300, 92, { size: 17, color: C.muted });
    s.shapes.add({ geometry: "rect", position: { left: x + 24, top: 446, width: 304, height: 5 }, fill: c[3], line: { fill: c[3], width: 0 } });
  });
  box(s, 64, 508, 1128, 112, "#102B3F", 18, C.straw);
  addText(s, "DESIGN QUESTION", 88, 526, 180, 26, { size: 12, bold: true, color: C.straw });
  addText(s, "Can a user teach one action by demonstration, replay it by voice, and still prove that the correct UI state changed?", 88, 554, 1060, 50, { size: 22, bold: true });
  s.speakerNotes.textFrame.setText("Frame the challenge around trust. The system must identify the intended control, block sensitive states, and verify an observed result rather than assuming a dispatched click succeeded.");
}

// 3 — Solution workflow
{
  const s = base(3, "PRODUCT LOOP");
  title(s, "02 · PRODUCT", "A three-part loop: teach, speak, verify", "The user owns the demonstration; the app stores a selector-based flow and replays only inside a bounded safety envelope.");
  const steps = [
    ["1", "TEACH", "Say a unique command, then tap the target once.", "User demonstrates intent", C.straw],
    ["2", "SPEAK", "Use the saved name or a supported paraphrase and quantity.", "English + Hinglish", C.blue],
    ["3", "VERIFY", "Recheck safety, act, then confirm a structural UI change.", "Fail closed on doubt", C.teal],
  ];
  const nodes = [];
  steps.forEach((st, i) => {
    const x = 72 + i * 395;
    const b = box(s, x, 220, 340, 310, i === 2 ? "#113B42" : C.panel, 24, st[4]);
    nodes.push(b);
    iconCircle(s, st[0], x + 24, 246, st[4]);
    addText(s, st[1], x + 24, 316, 290, 42, { size: 26, bold: true, color: st[4] });
    addText(s, st[2], x + 24, 374, 290, 76, { size: 18, color: C.white });
    pill(s, st[3], x + 24, 470, 210, C.panel2, C.muted);
  });
  s.shapes.connect(nodes[0], nodes[1], { kind: "straight", fromSide: "right", toSide: "left", line: { style: "solid", fill: C.straw, width: 3 }, head: { type: "triangle", width: "sm", length: "sm" } });
  s.shapes.connect(nodes[1], nodes[2], { kind: "straight", fromSide: "right", toSide: "left", line: { style: "solid", fill: C.blue, width: 3 }, head: { type: "triangle", width: "sm", length: "sm" } });
  addText(s, "Observed outcome", 478, 562, 324, 26, { size: 14, bold: true, color: C.straw2, align: "center" });
  addText(s, "Complete · Blocked · Failed — always stated visibly and aloud", 345, 594, 590, 34, { size: 18, color: C.muted, align: "center" });
  s.speakerNotes.textFrame.setText("The core interaction is teach once, speak later, and verify every action. The overlay and text-to-speech communicate the result without claiming success prematurely.");
}

// 4 — Architecture
{
  const s = base(4, "ARCHITECTURE");
  title(s, "03 · PIPELINE", "Deterministic orchestration around Android Accessibility", "Every action passes through matching, a fresh safety gate, target resolution and a postcondition.");
  const data = [
    ["SpeechRecognizer", "up to 5 alternatives", C.blue],
    ["Intent + Quantity", "flow name · 1–5", C.straw],
    ["Room", "flows + ordered steps", C.muted],
    ["Safety Gate", "fresh screen check", C.orange],
    ["Selector Resolver", "text · context · position", C.straw],
    ["Accessibility Action", "single verified dispatch", C.blue],
    ["Postcondition", "local structure changed?", C.teal],
    ["Overlay + TTS", "complete / stop / explain", C.green],
  ];
  const shapes = [];
  data.forEach((d, i) => {
    const row = i < 4 ? 0 : 1;
    const col = row === 0 ? i : 7 - i;
    const x = 64 + col * 288;
    const y = row === 0 ? 210 : 430;
    const b = box(s, x, y, 240, 126, C.panel, 18, d[2]);
    addText(s, String(i + 1).padStart(2, "0"), x + 16, y + 14, 42, 22, { size: 11, bold: true, color: d[2] });
    addText(s, d[0], x + 16, y + 43, 208, 34, { size: 18, bold: true });
    addText(s, d[1], x + 16, y + 80, 208, 28, { size: 13, color: C.muted });
    shapes.push(b);
  });
  for (let i = 0; i < 3; i++) s.shapes.connect(shapes[i], shapes[i + 1], { kind: "straight", fromSide: "right", toSide: "left", line: { style: "solid", fill: C.line, width: 2 }, head: { type: "triangle", width: "sm", length: "sm" } });
  s.shapes.connect(shapes[3], shapes[4], { kind: "elbow", fromSide: "bottom", toSide: "right", line: { style: "solid", fill: C.orange, width: 2 }, head: { type: "triangle", width: "sm", length: "sm" } });
  for (let i = 4; i < 7; i++) s.shapes.connect(shapes[i], shapes[i + 1], { kind: "straight", fromSide: "left", toSide: "right", line: { style: "solid", fill: C.line, width: 2 }, head: { type: "triangle", width: "sm", length: "sm" } });
  addText(s, "BLOCK", 987, 355, 120, 32, { size: 12, bold: true, color: C.orange, align: "center", fill: "#3B261D", radius: 16 });
  addText(s, "continue only when clear", 535, 365, 220, 28, { size: 12, color: C.muted, align: "center" });
  s.speakerNotes.textFrame.setText("Walk left to right on the top row, then back across the bottom. Room supplies the saved flow; every dispatch gets a fresh safety check. Success requires a changed structural fingerprint.");
}

// 5 — Tech stack
{
  const s = base(5, "TECH STACK");
  title(s, "04 · BUILD", "Android-native, local-first, zero paid API cost", "The prototype uses platform speech and accessibility services; matching, quantity parsing and safety policy stay deterministic.");
  const groups = [
    ["APP", ["Kotlin 2.0.21", "Android SDK 36", "Min SDK 26", "Single app module"], C.straw],
    ["PLATFORM", ["AccessibilityService", "SpeechRecognizer", "Text-to-Speech", "Foreground overlay"], C.blue],
    ["DATA", ["Room 2.7.2", "Private local storage", "Schema migrations", "No cloud database"], C.teal],
    ["TOOLING", ["Gradle 8.13", "AGP 8.11.1", "JDK 17", "Android Studio"], C.green],
  ];
  groups.forEach((g, i) => {
    const x = 64 + i * 288;
    box(s, x, 208, 252, 330, C.panel, 22, g[2]);
    pill(s, g[0], x + 20, 228, 100, g[2], C.ink);
    g[1].forEach((item, j) => {
      addText(s, item, x + 24, 286 + j * 52, 204, 38, { size: 17, bold: j === 0, color: j === 0 ? C.white : C.muted });
      if (j < 3) s.shapes.add({ geometry: "line", position: { left: x + 24, top: 328 + j * 52, width: 204, height: 0 }, fill: "none", line: { style: "solid", fill: C.line, width: 1 } });
    });
  });
  box(s, 64, 570, 1128, 66, "#102B3F", 18, C.line);
  addText(s, "₹0 API budget", 88, 582, 185, 42, { size: 22, bold: true, color: C.straw });
  addText(s, "No API key · No paid LLM · No target-app SDK · Runtime actions stay on-device", 285, 582, 870, 42, { size: 17, color: C.white });
  s.speakerNotes.textFrame.setText("Emphasize that the runtime does not depend on a paid generative AI service. Android platform services handle speech and TTS; intent matching and quantities are local code.");
}

// 6 — Safety
{
  const s = base(6, "SAFETY BY DESIGN");
  title(s, "05 · TRUST", "Fail closed before credentials, payment or uncertainty", "A manual stop latches the system; unreadable trees and sensitive markers block replay.");
  box(s, 64, 194, 356, 430, C.panel, 24, C.orange);
  addText(s, "SAFETY GATES", 88, 218, 200, 28, { size: 13, bold: true, color: C.orange });
  const gates = [
    ["01", "Target app + readable tree"], ["02", "No login / password / OTP"],
    ["03", "No payment screen"], ["04", "Unique selector match"],
    ["05", "Fresh check before every action"], ["06", "Structural change after action"],
  ];
  gates.forEach((g, i) => {
    addText(s, g[0], 88, 267 + i * 52, 34, 30, { size: 11, bold: true, color: C.straw });
    addText(s, g[1], 132, 263 + i * 52, 250, 36, { size: 16, color: i === 2 ? C.orange : C.white });
  });
  box(s, 452, 194, 348, 430, "#2E1D14", 24, C.orange);
  await image(s, IMG.payment, 474, 214, 304, 390, "Orange banner blocking automation on a Zomato payment screen", { left: 0.02, top: 0.0, right: 0.02, bottom: 0.13 });
  box(s, 832, 194, 360, 430, "#2E1D14", 24, C.orange);
  await image(s, IMG.stop, 854, 214, 316, 210, "Manual stop safety banner on a Zomato screen", { left: 0.0, top: 0.0, right: 0.0, bottom: 0.62 });
  addText(s, "Manual Stop stays orange and blocks the matched flow until a fresh safe-screen Recheck.", 874, 444, 276, 92, { size: 16, bold: true, color: C.white, align: "center" });
  pill(s, "PAYMENT → HUMAN", 500, 572, 252, C.orange, C.ink);
  pill(s, "STOP → LATCHED", 888, 572, 248, C.orange, C.ink);
  s.speakerNotes.textFrame.setText("The app never enters payment or credential data. On payment it says 'Your turn' and blocks. Manual stop persists until the user returns to a safe screen and taps Recheck.");
}

// 7 — Language + quantities
{
  const s = base(7, "VOICE EXPERIENCE");
  title(s, "06 · LANGUAGE", "English and Hinglish quantities from 1 to 5", "A supported number is parsed locally, then replay advances through verified ADD / plus transitions.");
  const phrases = [
    ["ONE", "choco chip brownie safe", "1"],
    ["TWO", "do choco chip brownie safe", "2"],
    ["THREE", "add three choco chip brownie safe", "3"],
    ["FOUR / FIVE", "digits or English number words", "4–5"],
  ];
  phrases.forEach((p, i) => {
    const y = 205 + i * 92;
    pill(s, p[0], 64, y, 136, i === 1 ? C.teal : C.panel2, i === 1 ? C.ink : C.straw2);
    addText(s, `“${p[1]}”`, 226, y - 4, 520, 42, { size: 18, bold: true });
    addText(s, `TARGET ${p[2]}`, 630, y - 4, 116, 42, { size: 13, bold: true, color: C.muted, align: "right" });
    if (i < 3) s.shapes.add({ geometry: "line", position: { left: 226, top: y + 60, width: 520, height: 0 }, fill: "none", line: { style: "solid", fill: C.line, width: 1 } });
  });
  box(s, 790, 192, 402, 432, C.panel, 26, C.teal);
  await image(s, IMG.success3, 814, 216, 354, 330, "Verified voice replay status showing quantity three", { left: 0.03, top: 0.0, right: 0.03, bottom: 0.48 });
  addText(s, "Verified quantity 3", 818, 555, 344, 34, { size: 22, bold: true, color: C.teal, align: "center" });
  addText(s, "Out-of-range or conflicting quantities are rejected before replay.", 820, 590, 340, 28, { size: 13, color: C.muted, align: "center" });
  s.speakerNotes.textFrame.setText("Live tests passed for English quantity three and Hinglish 'do' for quantity two. Supported range is one to five. Requests such as six are rejected.");
}

// 8 — Evidence
{
  const s = base(8, "VALIDATION");
  title(s, "07 · EVIDENCE", "Measured outcomes from the tested v0.4.0 build", "The claims below are tied to emulator or physical-device checks and the repository test suite.");
  const kpis = [["30", "JVM TESTS", C.teal], ["0", "TEST FAILURES", C.green], ["1–5", "QUANTITY RANGE", C.straw], ["16", "ANDROID VERSION", C.blue]];
  kpis.forEach((k, i) => {
    const x = 64 + i * 288;
    box(s, x, 194, 250, 126, C.panel, 20, k[2]);
    addText(s, k[0], x + 20, 208, 210, 54, { size: 34, bold: true, color: k[2] });
    addText(s, k[1], x + 20, 264, 210, 30, { size: 12, bold: true, color: C.muted });
  });
  box(s, 64, 350, 722, 276, C.panel, 22, C.line);
  addText(s, "LIVE SCENARIOS", 88, 372, 260, 28, { size: 13, bold: true, color: C.straw });
  const checks = [
    "Correct item · exact command · wrapper paraphrase",
    "Unknown command rejected · manual Stop latched",
    "Payment screen blocked · unreadable Swiggy tree blocked",
    "Quantity 3 English · quantity 2 Hinglish",
    "Existing cart and quantity 6 refused without action",
  ];
  checks.forEach((t, i) => {
    iconCircle(s, "✓", 90, 413 + i * 39, C.teal, C.ink);
    addText(s, t, 152, 420 + i * 39, 590, 26, { size: 15, color: C.white });
  });
  box(s, 818, 350, 374, 276, "#103840", 22, C.teal);
  await image(s, IMG.verified, 840, 372, 330, 170, "Verified completion banner for the learned brownie flow", { left: 0.02, top: 0.0, right: 0.02, bottom: 0.62 });
  addText(s, "Success means the UI changed", 842, 555, 326, 34, { size: 19, bold: true, color: C.teal, align: "center" });
  addText(s, "A dispatched click alone never counts.", 842, 590, 326, 24, { size: 13, color: C.muted, align: "center" });
  s.speakerNotes.textFrame.setText("Keep the evidence bounded. Thirty JVM tests passed. Live tests cover the listed cases on Android 16 with Zomato. This is not a general reliability claim.");
}

// 9 — Demo plan
{
  const s = base(9, "LIVE DEMO");
  title(s, "08 · DEMO", "A four-minute story judges can follow", "Begin from a safe Zomato menu and an empty item state. End before payment.");
  const timeline = [
    ["0:00", "SETUP", "Show accessibility connected + blue Ready banner", C.blue],
    ["0:30", "TEACH", "Record one ADD tap as “choco chip brownie safe”", C.straw],
    ["1:30", "REPLAY", "Say the exact command; show verified quantity 1", C.teal],
    ["2:15", "HINGLISH", "Remove item; say “do…”; show verified quantity 2", C.green],
    ["3:00", "SAFETY", "Unknown command, manual Stop, or payment handoff", C.orange],
  ];
  s.shapes.add({ geometry: "line", position: { left: 164, top: 210, width: 0, height: 384 }, fill: "none", line: { style: "solid", fill: C.line, width: 4 } });
  timeline.forEach((t, i) => {
    const y = 202 + i * 84;
    s.shapes.add({ geometry: "ellipse", position: { left: 146, top: y + 12, width: 36, height: 36 }, fill: t[3], line: { fill: C.ink, width: 5 } });
    addText(s, t[0], 64, y + 4, 70, 42, { size: 14, bold: true, color: t[3], align: "right" });
    pill(s, t[1], 214, y + 5, 114, t[3], C.ink);
    addText(s, t[2], 350, y, 650, 52, { size: 18, bold: i === 2 });
  });
  box(s, 1010, 206, 182, 386, C.panel, 22, C.line);
  addText(s, "DO", 1034, 226, 134, 26, { size: 12, bold: true, color: C.teal });
  addText(s, "Use one item\nKeep the screen stable\nWait for yellow result\nNarrate the safety stop", 1034, 258, 134, 158, { size: 15, color: C.white });
  addText(s, "DON’T", 1034, 444, 134, 26, { size: 12, bold: true, color: C.orange });
  addText(s, "Confirm an order\nShow credentials\nClaim Swiggy replay", 1034, 475, 134, 96, { size: 15, color: C.muted });
  s.speakerNotes.textFrame.setText("This sequence fits the submission limit. Pause after each command for the persistent yellow status. Do not proceed beyond the cart/payment handoff.");
}

// 10 — Boundaries / roadmap
{
  const s = base(10, "SCOPE + ROADMAP");
  title(s, "09 · HONEST SCOPE", "A strong prototype with explicit boundaries", "The current build proves a safe one-item replay pattern; the next steps broaden compatibility and generalization.");
  box(s, 64, 196, 536, 426, C.panel, 24, C.teal);
  pill(s, "WORKS NOW", 88, 220, 142, C.teal, C.ink);
  const now = ["Teach a one-tap Zomato item", "Exact + wrapper paraphrase matching", "English / Hinglish quantity 1–5", "Fresh safety check per action", "Verified structural postcondition", "Local Room persistence + deletion"];
  now.forEach((t, i) => { iconCircle(s, "✓", 90, 276 + i * 50, C.teal, C.ink); addText(s, t, 152, 282 + i * 50, 410, 30, { size: 16 }); });
  box(s, 632, 196, 560, 426, "#201D19", 24, C.straw);
  pill(s, "NEXT", 656, 220, 96, C.straw, C.ink);
  const next = [
    ["01", "Parameterize item identity, not only quantity"],
    ["02", "Teach address selection with user confirmation"],
    ["03", "Expand safe selectors across more layouts"],
    ["04", "Add a second app once its tree is readable"],
    ["05", "Run the full multi-utterance reliability matrix"],
    ["06", "Polish onboarding and production signing"],
  ];
  next.forEach((t, i) => { addText(s, t[0], 660, 278 + i * 50, 40, 28, { size: 11, bold: true, color: C.straw }); addText(s, t[1], 712, 276 + i * 50, 438, 34, { size: 16, color: C.soft }); });
  s.speakerNotes.textFrame.setText("State the boundary clearly: Zomato is validated. Swiggy exposed an empty accessibility tree on the tested device, so the app blocks safely instead of bypassing the platform.");
}

// 11 — submission checklist
{
  const s = base(11, "SUBMISSION READY");
  title(s, "10 · DELIVERY", "Everything a reviewer needs lives in one repository", "Source, evaluation APK, docs, video, disclosure and this presentation are linked from the README.");
  const items = [
    ["SOURCE CODE", "Android/Kotlin project", C.teal], ["PRESENTATION", "This deck in /docs", C.teal],
    ["DEMO VIDEO", "YouTube link in README", C.teal], ["AI DISCLOSURE", "Explicit tools + runtime note", C.teal],
    ["README", "Setup · architecture · limits", C.teal], ["APK", "v0.4.0 debug evaluation build", C.teal],
    ["TAG", "PRISM_GENAI_HACKATHON_Y2026", C.straw], ["CHECKSUM", "SHA-256 in /dist", C.blue],
  ];
  items.forEach((it, i) => {
    const col = i % 2, row = Math.floor(i / 2);
    const x = 64 + col * 568, y = 194 + row * 94;
    box(s, x, y, 536, 74, C.panel, 16, it[2]);
    iconCircle(s, "✓", x + 16, y + 11, it[2], C.ink);
    addText(s, it[0], x + 82, y + 8, 184, 28, { size: 13, bold: true, color: it[2] });
    addText(s, it[1], x + 82, y + 34, 424, 28, { size: 15, color: C.white });
  });
  box(s, 64, 592, 1128, 46, "#102B3F", 16, C.line);
  addText(s, "AI disclosure: runtime uses no generative-AI API; Copilot and Codex assisted development, testing and documentation under human review.", 84, 598, 1088, 34, { size: 13, color: C.muted, align: "center" });
  s.speakerNotes.textFrame.setText("The GitHub tag already exists. The README now links the deck and dedicated AI disclosure. The APK checksum lets judges verify the evaluation artifact.");
}

// 12 — close
{
  const s = base(12, "TEAM STRAWHATS");
  s.shapes.add({ geometry: "rect", position: { left: 0, top: 0, width: 1280, height: 12 }, fill: C.straw, line: { fill: C.straw, width: 0 } });
  addText(s, "A safer way for native\napps to listen.", 64, 68, 680, 124, { size: 40, bold: true });
  addText(s, "VOICE MACRO STUDIO", 66, 202, 600, 34, { size: 15, bold: true, color: C.straw });
  const names = ["Soumya Ranjan Sahoo", "Sandesh Anand", "G Vivek", "Ankit Kumar Yadav"];
  names.forEach((n, i) => {
    const x = 64 + (i % 2) * 330, y = 280 + Math.floor(i / 2) * 92;
    box(s, x, y, 300, 68, C.panel, 16, C.line);
    iconCircle(s, String(i + 1), x + 10, y + 8, i % 2 === 0 ? C.straw : C.teal, C.ink);
    addText(s, n, x + 74, y + 10, 210, 46, { size: 16, bold: true });
  });
  box(s, 770, 84, 422, 482, C.panel, 28, C.line);
  addText(s, "EXPLORE THE PROJECT", 804, 122, 354, 28, { size: 13, bold: true, color: C.straw });
  addText(s, "GitHub repository", 804, 188, 320, 34, { size: 22, bold: true });
  const repoLink = addText(s, "github.com/ANKIEMUNKIE/voice_macro_Studio", 804, 228, 334, 42, { size: 13, color: C.blue });
  repoLink.text.get("github.com/ANKIEMUNKIE/voice_macro_Studio").link = { uri: "https://github.com/ANKIEMUNKIE/voice_macro_Studio", isExternal: true };
  addText(s, "Demo video", 804, 320, 320, 34, { size: 22, bold: true });
  const videoLink = addText(s, "youtu.be/HedNCph6ZhA", 804, 360, 334, 42, { size: 14, color: C.blue });
  videoLink.text.get("youtu.be/HedNCph6ZhA").link = { uri: "https://youtu.be/HedNCph6ZhA", isExternal: true };
  pill(s, "THANK YOU", 804, 458, 154, C.straw, C.ink);
  addText(s, "Questions?", 804, 504, 320, 34, { size: 24, bold: true, color: C.white });
  addText(s, "Repository and demo URLs are clickable in the README.", 64, 526, 632, 38, { size: 16, color: C.muted });
  box(s, 64, 590, 1128, 48, "#102B3F", 16, C.line);
  addText(s, "Verified on Android 16 · Zomato · v0.4.0-quantity · local-first · zero paid API budget", 84, 597, 1088, 34, { size: 14, bold: true, color: C.straw2, align: "center" });
  s.speakerNotes.textFrame.setText("Close by inviting questions about the safety pipeline, selector confidence, quantity handling, or the live demo evidence.");
}

await fs.mkdir(path.join(WORKSPACE, "docs"), { recursive: true });
await fs.mkdir(path.join(WORKSPACE, ".codex-finalizer"), { recursive: true });
const candidatePath = path.join(WORKSPACE, ".codex-finalizer", "Voice-Macro-Studio-STRAWHATS-candidate.pptx");
await (await PresentationFile.exportPptx(deck)).save(candidatePath);

await finalizePresentation({
  workspaceDir: WORKSPACE,
  candidatePath,
  finalPath: FINAL,
  pythonExecutable: RUNTIME_PYTHON,
  integrityValidatorPath: path.join(SKILL_DIR, "container_tools/inspect_presentation_package_integrity.py"),
  layoutValidatorPath: path.join(SKILL_DIR, "container_tools/inspect_presentation_layout_geometry.py"),
  layoutArgs: ["--expected-slide-size-emu", "12192000,6858000", "--validate-bullet-geometry", "--validate-heading-fit"],
  explicitTotalSlideCount: 12,
  requiredNativeTableOwnerSlides: [],
  requiredNativeChartOwnerSlides: [],
  requiredEmbeddedWorkbookChartOwnerSlides: [],
  fontPolicy: { basis: "design", families: [family] },
  verifyArtifactToolImport: true,
  receiptPath: path.join(WORKSPACE, ".codex-finalizer", "Voice-Macro-Studio-STRAWHATS.pptx.validation.json"),
});

console.log(JSON.stringify({ final: FINAL, slides: deck.slides.items.length, font: family }, null, 2));
