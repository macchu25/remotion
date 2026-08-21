import React from "react";
import { AbsoluteFill, Sequence } from "remotion";
import { CHAPTER_CUES } from "./timeline/chapterCues";

import { Chapter01_BeforeNumbers } from "./chapters/Arc1/Chapter01_BeforeNumbers";
import { Chapter02_MarksGrouping } from "./chapters/Arc1/Chapter02_MarksGrouping";
import { Chapter03_NumeralSystems } from "./chapters/Arc1/Chapter03_NumeralSystems";
import { Chapter04_PlaceValueZero } from "./chapters/Arc1/Chapter04_PlaceValueZero";
import { Chapter05_CountingBeyondHand } from "./chapters/Arc1/Chapter05_CountingBeyondHand";

export const EvolutionMasterFilm: React.FC = () => {
  const c1 = CHAPTER_CUES[0];
  const c2 = CHAPTER_CUES[1];
  const c3 = CHAPTER_CUES[2];
  const c4 = CHAPTER_CUES[3];
  const c5 = CHAPTER_CUES[4];

  return (
    <AbsoluteFill style={{ backgroundColor: "#020617" }}>
      {/* Chapter 1: Before Numbers */}
      <Sequence from={c1.setupStart} durationInFrames={c1.durationInFrames} name={c1.title}>
        <Chapter01_BeforeNumbers />
      </Sequence>

      {/* Chapter 2: Marks, Memory, and Grouping */}
      <Sequence from={c2.setupStart} durationInFrames={c2.durationInFrames} name={c2.title}>
        <Chapter02_MarksGrouping />
      </Sequence>

      {/* Chapter 3: Numeral Systems */}
      <Sequence from={c3.setupStart} durationInFrames={c3.durationInFrames} name={c3.title}>
        <Chapter03_NumeralSystems />
      </Sequence>

      {/* Chapter 4: Place Value and Zero */}
      <Sequence from={c4.setupStart} durationInFrames={c4.durationInFrames} name={c4.title}>
        <Chapter04_PlaceValueZero />
      </Sequence>

      {/* Chapter 5: Counting Beyond the Hand */}
      <Sequence from={c5.setupStart} durationInFrames={c5.durationInFrames} name={c5.title}>
        <Chapter05_CountingBeyondHand />
      </Sequence>
    </AbsoluteFill>
  );
};
