// ===========================================================================
// CHAPTER CUES & MASTER TIMELINE REGISTRY — THE EVOLUTION OF MATHEMATICS
// ===========================================================================

import { ChapterCue } from "../contracts/types";

export const FPS = 30;
export const HOOK_DURATION_FRAMES = 490; // Exact probed real audio duration for 3 hook cues

// Helper to compute absolute frame budgets
function buildChapterCues(): ChapterCue[] {
  const chapterDurations = [
    // Arc 1 — Emergence (Ch 1–5, 1s Visual Lead + 0.1s Snap Gap)
    495, 466, 462, 476, 491,
    // Arc 2 — Structure (Ch 6–9, 1s Visual Lead + 0.1s Snap Gap)
    464, 506, 467, 455,
    // Arc 3 — Abstraction (Ch 10–17, 1s Visual Lead + 0.1s Snap Gap)
    476, 445, 488, 524, 559, 534, 544, 544,
    // Arc 4 — Infinity & Calculus (Ch 18–22, 1s Visual Lead + 0.1s Snap Gap)
    614, 666, 586, 619, 702,
    // Arc 5 — Logic & Computation (Ch 23–29, 1s Visual Lead + 0.1s Snap Gap)
    577, 697, 646, 597, 573, 572, 655,
    // Arc 6 — Chip & Networks (Ch 30–37, Real Audio Probed)
    658, 644, 596, 654, 645, 625, 607, 669,
    // Arc 7 — AI & Modern Civilization (Ch 38–41, Real Audio Probed)
    585, 631, 604, 606,
    // Arc 8 — Return (Ch 42, Real Audio Probed)
    623,
  ];

  const chapterTitles = [
    "Before Numbers", "Marks, Memory, and Grouping", "Numeral Systems", "Place Value and Zero", "Counting Beyond the Hand",
    "Geometry from Measurement", "Multiplication Becomes Area", "Pythagorean Structure", "Circle, Ratio, and Pi",
    "Negative Numbers", "Unknowns and Algebra", "Functions and Graphs", "Trigonometry and Waves", "Irrational Numbers", "Infinity", "Prime Numbers", "Complex Numbers",
    "Calculus of Motion", "Calculus of Accumulation", "Differential Equations and Physics", "Probability", "Statistics",
    "Logic", "Limits of Formal Systems", "Algorithms", "Complexity and Search", "Binary", "Boolean Logic", "Transistor",
    "Chip Architecture", "Information Becomes Data", "Matrices", "Computer Graphics", "Fourier and Signal", "Graph Theory and Networks", "Cryptography", "Information Theory and Error Correction",
    "Optimization", "Neural Networks", "AI and Representation", "Mathematics Beneath Modern Life",
    "Final Collapse and Return to the Point"
  ];

  const arcTitles = [
    "Arc 1 — Emergence", "Arc 1 — Emergence", "Arc 1 — Emergence", "Arc 1 — Emergence", "Arc 1 — Emergence",
    "Arc 2 — Structure", "Arc 2 — Structure", "Arc 2 — Structure", "Arc 2 — Structure",
    "Arc 3 — Abstraction", "Arc 3 — Abstraction", "Arc 3 — Abstraction", "Arc 3 — Abstraction", "Arc 3 — Abstraction", "Arc 3 — Abstraction", "Arc 3 — Abstraction", "Arc 3 — Abstraction",
    "Arc 4 — Infinity & Calculus", "Arc 4 — Infinity & Calculus", "Arc 4 — Infinity & Calculus", "Arc 4 — Infinity & Calculus", "Arc 4 — Infinity & Calculus",
    "Arc 5 — Logic & Computation", "Arc 5 — Logic & Computation", "Arc 5 — Logic & Computation", "Arc 5 — Logic & Computation", "Arc 5 — Logic & Computation", "Arc 5 — Logic & Computation", "Arc 5 — Logic & Computation",
    "Arc 6 — Chip & Networks", "Arc 6 — Chip & Networks", "Arc 6 — Chip & Networks", "Arc 6 — Chip & Networks", "Arc 6 — Chip & Networks", "Arc 6 — Chip & Networks", "Arc 6 — Chip & Networks", "Arc 6 — Chip & Networks",
    "Arc 7 — AI & Modern Civilization", "Arc 7 — AI & Modern Civilization", "Arc 7 — AI & Modern Civilization", "Arc 7 — AI & Modern Civilization",
    "Arc 8 — Return"
  ];

  let currentFrame = HOOK_DURATION_FRAMES;
  return chapterDurations.map((duration, idx) => {
    const setupStart = currentFrame;
    const setupEnd = setupStart + Math.floor(duration * 0.2);
    const developmentStart = setupEnd;
    const anticipation = setupStart + Math.floor(duration * 0.5);
    const impact = setupStart + Math.floor(duration * 0.65);
    const settle = setupStart + Math.floor(duration * 0.82);
    const bridgeStart = settle;
    const bridgeImpact = setupStart + Math.floor(duration * 0.93);
    const transitionOut = setupStart + duration;

    currentFrame += duration;

    const arcIndices = [1,1,1,1,1, 2,2,2,2, 3,3,3,3,3,3,3,3, 4,4,4,4,4, 5,5,5,5,5,5,5, 6,6,6,6,6,6,6,6, 7,7,7,7, 8];

    return {
      id: `chapter_${String(idx + 1).padStart(2, '0')}`,
      chapterIndex: idx + 1,
      title: chapterTitles[idx],
      arcIndex: arcIndices[idx],
      arcTitle: arcTitles[idx],
      fps: FPS,
      setupStart,
      setupEnd,
      developmentStart,
      anticipation,
      impact,
      settle,
      bridgeStart,
      bridgeImpact,
      transitionOut,
      durationInFrames: duration,
    };
  });
}

export const CHAPTER_CUES = buildChapterCues();

export const TOTAL_FILM_FRAMES = CHAPTER_CUES.reduce((sum, c) => sum + c.durationInFrames, 0);

export function getCueForChapter(chapterIndex: number): ChapterCue {
  return CHAPTER_CUES[chapterIndex - 1] || CHAPTER_CUES[0];
}
