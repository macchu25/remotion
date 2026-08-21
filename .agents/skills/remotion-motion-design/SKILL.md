---
name: remotion-motion-design
description: Guidelines, best practices, and code patterns for programmatic motion graphics and spring animations in Remotion.
---

# Remotion Motion Design Skill

This skill provides patterns and standards for designing smooth, high-fps programmatic animations using Remotion and React.

## Key Principles

1. **Use Spring Physics Over Standard Easing**:
   - Prefer `spring({ frame, fps, config: { damping, mass, stiffness } })` for organic movement.
   - Adjust `damping: 10-15` for snappy pops, `damping: 20-30` for smooth transitions.

2. **Extrapolate Clamping**:
   - Always specify `extrapolateLeft: "clamp"` and `extrapolateRight: "clamp"` in `interpolate()` calls to prevent out-of-bounds layout jumps.

3. **Staggered Sequences**:
   - Use `Sequence` components with offset `from` frames to stagger card entrances and text lines (e.g. `from={10 + idx * 8}`).

4. **Dynamic Backgrounds & Ambient Motion**:
   - Add subtle rotation or scaling loops using `Math.sin(frame / N)` for glowing orbs, particles, and gradients so the screen is never static.
