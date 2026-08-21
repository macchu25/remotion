---
name: audio-mixing
description: Advanced multi-channel audio mixing, dynamic volume ducking, frequency separation, and SFX layer management for Remotion video compositions.
---

# Audio Mixing Skill

Guidelines for balancing voice, background music, impact sounds, and micro-SFX layers.

## Four-Layer Audio Hierarchy

1. **Layer 1: Voiceover (Primary - 100% Volume)**
   - Always placed on top (`volume={1.0}`).
   - Crisp AI TTS or recorded voice track.

2. **Layer 2: Key Impacts & Stamps (70% - 90% Volume)**
   - Stamps, glass breaks, explosions, and cosmic booms (`volume={0.7 - 0.9}`).
   - May briefly punch through voiceover for 100ms-250ms for maximum impact.

3. **Layer 3: Micro SFX (25% - 40% Volume)**
   - Typing, clicks, pops, ticks, subtle swipes (`volume={0.25 - 0.4}`).
   - Kept underneath speech so it doesn't distract.

4. **Layer 4: Background Music (BGM Ducking 12% - 15%)**
   - Sitting ngầm (`volume={0.12 - 0.15}`).
   - Automatic ducking to 0% during intentional silence breaks.
