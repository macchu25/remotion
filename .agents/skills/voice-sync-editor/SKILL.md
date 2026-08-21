---
name: voice-sync-editor
description: Precision frame-by-frame synchronization between voiceover narration timestamps, text caption pop-ins, and visual motion events in Remotion.
---

# Voice Sync Editor Skill

Guidelines for timing animations and subtitles exactly with voiceover speech frames.

## Key Rules

1. **Word-Level Frame Calculation**:
   - At 30 FPS, average speech rate (1.25x speed) is ~3-4 words per second (~7-10 frames per word).
   - Match caption box timestamps to sentence starts and ends using explicit frame calculations (`from={startFrame}`).

2. **Pre-Motion SFX Timing**:
   - Whoosh sound effects should start 2-4 frames BEFORE the visual motion peaks.
   - Impact sound effects must land EXACTLY on the frame of maximum scale or final contact.

3. **Silence Breaks**:
   - Use 0.2s - 0.5s (6 - 15 frames) silence gaps between major chapters to build tension before impact SFX.
