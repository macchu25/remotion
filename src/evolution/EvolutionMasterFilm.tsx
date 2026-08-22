import React from "react";
import { AbsoluteFill, Sequence } from "remotion";
import { CHAPTER_CUES } from "./timeline/chapterCues";
import { MotionSubtitle } from "./subtitles/MotionSubtitle";
import { getSubtitlesForChapter } from "./subtitles/vietnameseCues";

// Arc 1 — Emergence (Ch 1 - 5)
import { Chapter01_BeforeNumbers } from "./chapters/Arc1/Chapter01_BeforeNumbers";
import { Chapter02_MarksGrouping } from "./chapters/Arc1/Chapter02_MarksGrouping";
import { Chapter03_NumeralSystems } from "./chapters/Arc1/Chapter03_NumeralSystems";
import { Chapter04_PlaceValueZero } from "./chapters/Arc1/Chapter04_PlaceValueZero";
import { Chapter05_CountingBeyondHand } from "./chapters/Arc1/Chapter05_CountingBeyondHand";

// Arc 2 — Structure (Ch 6 - 9)
import { Chapter06_GeometryMeasurement } from "./chapters/Arc2/Chapter06_GeometryMeasurement";
import { Chapter07_MultiplicationArea } from "./chapters/Arc2/Chapter07_MultiplicationArea";
import { Chapter08_PythagoreanStructure } from "./chapters/Arc2/Chapter08_PythagoreanStructure";
import { Chapter09_CircleRatioPi } from "./chapters/Arc2/Chapter09_CircleRatioPi";

// Arc 3 — Abstraction (Ch 10 - 17)
import { Chapter10_NegativeNumbers } from "./chapters/Arc3/Chapter10_NegativeNumbers";
import { Chapter11_UnknownsAlgebra } from "./chapters/Arc3/Chapter11_UnknownsAlgebra";
import { Chapter12_FunctionsGraphs } from "./chapters/Arc3/Chapter12_FunctionsGraphs";
import { Chapter13_TrigonometryWaves } from "./chapters/Arc3/Chapter13_TrigonometryWaves";
import { Chapter14_IrrationalNumbers } from "./chapters/Arc3/Chapter14_IrrationalNumbers";
import { Chapter15_Infinity } from "./chapters/Arc3/Chapter15_Infinity";
import { Chapter16_PrimeNumbers } from "./chapters/Arc3/Chapter16_PrimeNumbers";
import { Chapter17_ComplexNumbers } from "./chapters/Arc3/Chapter17_ComplexNumbers";

// Arc 4 — Infinity & Calculus (Ch 18 - 22)
import { Chapter18_CalculusMotion } from "./chapters/Arc4/Chapter18_CalculusMotion";
import { Chapter19_CalculusAccumulation } from "./chapters/Arc4/Chapter19_CalculusAccumulation";
import { Chapter20_DifferentialEquations } from "./chapters/Arc4/Chapter20_DifferentialEquations";
import { Chapter21_Probability } from "./chapters/Arc4/Chapter21_Probability";
import { Chapter22_Statistics } from "./chapters/Arc4/Chapter22_Statistics";

// Arc 5 — Logic & Computation (Ch 23 - 29)
import { Chapter23_Logic } from "./chapters/Arc5/Chapter23_Logic";
import { Chapter24_LimitsOfFormalSystems } from "./chapters/Arc5/Chapter24_LimitsOfFormalSystems";
import { Chapter25_Algorithms } from "./chapters/Arc5/Chapter25_Algorithms";
import { Chapter26_ComplexitySearch } from "./chapters/Arc5/Chapter26_ComplexitySearch";
import { Chapter27_Binary } from "./chapters/Arc5/Chapter27_Binary";
import { Chapter28_BooleanLogic } from "./chapters/Arc5/Chapter28_BooleanLogic";
import { Chapter29_Transistor } from "./chapters/Arc5/Chapter29_Transistor";

// Arc 6 — Chip & Networks (Ch 30 - 37)
import { Chapter30_ChipArchitecture } from "./chapters/Arc6/Chapter30_ChipArchitecture";
import { Chapter31_InformationData } from "./chapters/Arc6/Chapter31_InformationData";
import { Chapter32_Matrices } from "./chapters/Arc6/Chapter32_Matrices";
import { Chapter33_ComputerGraphics } from "./chapters/Arc6/Chapter33_ComputerGraphics";
import { Chapter34_FourierSignal } from "./chapters/Arc6/Chapter34_FourierSignal";
import { Chapter35_GraphTheoryNetworks } from "./chapters/Arc6/Chapter35_GraphTheoryNetworks";
import { Chapter36_Cryptography } from "./chapters/Arc6/Chapter36_Cryptography";
import { Chapter37_InformationTheory } from "./chapters/Arc6/Chapter37_InformationTheory";

// Arc 7 — AI & Modern Civilization (Ch 38 - 41)
import { Chapter38_Optimization } from "./chapters/Arc7/Chapter38_Optimization";
import { Chapter39_NeuralNetworks } from "./chapters/Arc7/Chapter39_NeuralNetworks";
import { Chapter40_AIRepresentation } from "./chapters/Arc7/Chapter40_AIRepresentation";
import { Chapter41_ModernLifeMath } from "./chapters/Arc7/Chapter41_ModernLifeMath";

import { Chapter42_FinalReturn } from "./chapters/Arc8/Chapter42_FinalReturn";

// Cinematic Hook Intro (Filmic Hook)
import { EvolutionCinematicHook } from "./hook/EvolutionCinematicHook";
import { HOOK_DURATION_FRAMES } from "./timeline/chapterCues";

import { EvolutionAudioLayer } from "./audio/EvolutionAudioLayer";

export const EvolutionMasterFilm: React.FC = () => {
  const cues = CHAPTER_CUES;

  return (
    <AbsoluteFill style={{ backgroundColor: "#020617" }}>
      {/* Sound Design & Voiceover Audio Layer */}
      <EvolutionAudioLayer />

      {/* ========================================================================= */}
      {/* 00. THE CINEMATIC HOOK INTRO (12 Seconds / 360 Frames)                    */}
      {/* ========================================================================= */}
      <Sequence from={0} durationInFrames={HOOK_DURATION_FRAMES} name="00. The Cinematic Hook">
        <EvolutionCinematicHook />
      </Sequence>

      {/* ========================================================================= */}
      {/* ARC 1 — EMERGENCE (Ch 1 - 5)                                              */}
      {/* ========================================================================= */}
      <Sequence from={cues[0].setupStart} durationInFrames={cues[0].durationInFrames} name={cues[0].title}>
        <Chapter01_BeforeNumbers />
        <MotionSubtitle cues={getSubtitlesForChapter(1)} />
      </Sequence>
      <Sequence from={cues[1].setupStart} durationInFrames={cues[1].durationInFrames} name={cues[1].title}>
        <Chapter02_MarksGrouping />
        <MotionSubtitle cues={getSubtitlesForChapter(2)} />
      </Sequence>
      <Sequence from={cues[2].setupStart} durationInFrames={cues[2].durationInFrames} name={cues[2].title}>
        <Chapter03_NumeralSystems />
        <MotionSubtitle cues={getSubtitlesForChapter(3)} />
      </Sequence>
      <Sequence from={cues[3].setupStart} durationInFrames={cues[3].durationInFrames} name={cues[3].title}>
        <Chapter04_PlaceValueZero />
        <MotionSubtitle cues={getSubtitlesForChapter(4)} />
      </Sequence>
      <Sequence from={cues[4].setupStart} durationInFrames={cues[4].durationInFrames} name={cues[4].title}>
        <Chapter05_CountingBeyondHand />
        <MotionSubtitle cues={getSubtitlesForChapter(5)} />
      </Sequence>

      {/* ========================================================================= */}
      {/* ARC 2 — STRUCTURE (Ch 6 - 9)                                              */}
      {/* ========================================================================= */}
      <Sequence from={cues[5].setupStart} durationInFrames={cues[5].durationInFrames} name={cues[5].title}>
        <Chapter06_GeometryMeasurement />
        <MotionSubtitle cues={getSubtitlesForChapter(6)} />
      </Sequence>
      <Sequence from={cues[6].setupStart} durationInFrames={cues[6].durationInFrames} name={cues[6].title}>
        <Chapter07_MultiplicationArea />
        <MotionSubtitle cues={getSubtitlesForChapter(7)} />
      </Sequence>
      <Sequence from={cues[7].setupStart} durationInFrames={cues[7].durationInFrames} name={cues[7].title}>
        <Chapter08_PythagoreanStructure />
        <MotionSubtitle cues={getSubtitlesForChapter(8)} />
      </Sequence>
      <Sequence from={cues[8].setupStart} durationInFrames={cues[8].durationInFrames} name={cues[8].title}>
        <Chapter09_CircleRatioPi />
        <MotionSubtitle cues={getSubtitlesForChapter(9)} />
      </Sequence>

      {/* ========================================================================= */}
      {/* ARC 3 — ABSTRACTION (Ch 10 - 17)                                          */}
      {/* ========================================================================= */}
      <Sequence from={cues[9].setupStart} durationInFrames={cues[9].durationInFrames} name={cues[9].title}>
        <Chapter10_NegativeNumbers />
        <MotionSubtitle cues={getSubtitlesForChapter(10)} />
      </Sequence>
      <Sequence from={cues[10].setupStart} durationInFrames={cues[10].durationInFrames} name={cues[10].title}>
        <Chapter11_UnknownsAlgebra />
        <MotionSubtitle cues={getSubtitlesForChapter(11)} />
      </Sequence>
      <Sequence from={cues[11].setupStart} durationInFrames={cues[11].durationInFrames} name={cues[11].title}>
        <Chapter12_FunctionsGraphs />
        <MotionSubtitle cues={getSubtitlesForChapter(12)} />
      </Sequence>
      <Sequence from={cues[12].setupStart} durationInFrames={cues[12].durationInFrames} name={cues[12].title}>
        <Chapter13_TrigonometryWaves />
        <MotionSubtitle cues={getSubtitlesForChapter(13)} />
      </Sequence>
      <Sequence from={cues[13].setupStart} durationInFrames={cues[13].durationInFrames} name={cues[13].title}>
        <Chapter14_IrrationalNumbers />
        <MotionSubtitle cues={getSubtitlesForChapter(14)} />
      </Sequence>
      <Sequence from={cues[14].setupStart} durationInFrames={cues[14].durationInFrames} name={cues[14].title}>
        <Chapter15_Infinity />
        <MotionSubtitle cues={getSubtitlesForChapter(15)} />
      </Sequence>
      <Sequence from={cues[15].setupStart} durationInFrames={cues[15].durationInFrames} name={cues[15].title}>
        <Chapter16_PrimeNumbers />
        <MotionSubtitle cues={getSubtitlesForChapter(16)} />
      </Sequence>
      <Sequence from={cues[16].setupStart} durationInFrames={cues[16].durationInFrames} name={cues[16].title}>
        <Chapter17_ComplexNumbers />
        <MotionSubtitle cues={getSubtitlesForChapter(17)} />
      </Sequence>

      {/* ========================================================================= */}
      {/* ARC 4 — INFINITY & CALCULUS (Ch 18 - 22)                                  */}
      {/* ========================================================================= */}
      <Sequence from={cues[17].setupStart} durationInFrames={cues[17].durationInFrames} name={cues[17].title}>
        <Chapter18_CalculusMotion />
        <MotionSubtitle cues={getSubtitlesForChapter(18)} />
      </Sequence>
      <Sequence from={cues[18].setupStart} durationInFrames={cues[18].durationInFrames} name={cues[18].title}>
        <Chapter19_CalculusAccumulation />
        <MotionSubtitle cues={getSubtitlesForChapter(19)} />
      </Sequence>
      <Sequence from={cues[19].setupStart} durationInFrames={cues[19].durationInFrames} name={cues[19].title}>
        <Chapter20_DifferentialEquations />
        <MotionSubtitle cues={getSubtitlesForChapter(20)} />
      </Sequence>
      <Sequence from={cues[20].setupStart} durationInFrames={cues[20].durationInFrames} name={cues[20].title}>
        <Chapter21_Probability />
        <MotionSubtitle cues={getSubtitlesForChapter(21)} />
      </Sequence>
      <Sequence from={cues[21].setupStart} durationInFrames={cues[21].durationInFrames} name={cues[21].title}>
        <Chapter22_Statistics />
        <MotionSubtitle cues={getSubtitlesForChapter(22)} />
      </Sequence>

      {/* ========================================================================= */}
      {/* ARC 5 — LOGIC & COMPUTATION (Ch 23 - 29)                                  */}
      {/* ========================================================================= */}
      <Sequence from={cues[22].setupStart} durationInFrames={cues[22].durationInFrames} name={cues[22].title}>
        <Chapter23_Logic />
        <MotionSubtitle cues={getSubtitlesForChapter(23)} />
      </Sequence>
      <Sequence from={cues[23].setupStart} durationInFrames={cues[23].durationInFrames} name={cues[23].title}>
        <Chapter24_LimitsOfFormalSystems />
        <MotionSubtitle cues={getSubtitlesForChapter(24)} />
      </Sequence>
      <Sequence from={cues[24].setupStart} durationInFrames={cues[24].durationInFrames} name={cues[24].title}>
        <Chapter25_Algorithms />
        <MotionSubtitle cues={getSubtitlesForChapter(25)} />
      </Sequence>
      <Sequence from={cues[25].setupStart} durationInFrames={cues[25].durationInFrames} name={cues[25].title}>
        <Chapter26_ComplexitySearch />
        <MotionSubtitle cues={getSubtitlesForChapter(26)} />
      </Sequence>
      <Sequence from={cues[26].setupStart} durationInFrames={cues[26].durationInFrames} name={cues[26].title}>
        <Chapter27_Binary />
        <MotionSubtitle cues={getSubtitlesForChapter(27)} />
      </Sequence>
      <Sequence from={cues[27].setupStart} durationInFrames={cues[27].durationInFrames} name={cues[27].title}>
        <Chapter28_BooleanLogic />
        <MotionSubtitle cues={getSubtitlesForChapter(28)} />
      </Sequence>
      <Sequence from={cues[28].setupStart} durationInFrames={cues[28].durationInFrames} name={cues[28].title}>
        <Chapter29_Transistor />
        <MotionSubtitle cues={getSubtitlesForChapter(29)} />
      </Sequence>

      {/* ========================================================================= */}
      {/* ARC 6 — CHIP & NETWORKS (Ch 30 - 37)                                      */}
      {/* ========================================================================= */}
      <Sequence from={cues[29].setupStart} durationInFrames={cues[29].durationInFrames} name={cues[29].title}>
        <Chapter30_ChipArchitecture />
        <MotionSubtitle cues={getSubtitlesForChapter(30)} />
      </Sequence>
      <Sequence from={cues[30].setupStart} durationInFrames={cues[30].durationInFrames} name={cues[30].title}>
        <Chapter31_InformationData />
        <MotionSubtitle cues={getSubtitlesForChapter(31)} />
      </Sequence>
      <Sequence from={cues[31].setupStart} durationInFrames={cues[31].durationInFrames} name={cues[31].title}>
        <Chapter32_Matrices />
        <MotionSubtitle cues={getSubtitlesForChapter(32)} />
      </Sequence>
      <Sequence from={cues[32].setupStart} durationInFrames={cues[32].durationInFrames} name={cues[32].title}>
        <Chapter33_ComputerGraphics />
        <MotionSubtitle cues={getSubtitlesForChapter(33)} />
      </Sequence>
      <Sequence from={cues[33].setupStart} durationInFrames={cues[33].durationInFrames} name={cues[33].title}>
        <Chapter34_FourierSignal />
        <MotionSubtitle cues={getSubtitlesForChapter(34)} />
      </Sequence>
      <Sequence from={cues[34].setupStart} durationInFrames={cues[34].durationInFrames} name={cues[34].title}>
        <Chapter35_GraphTheoryNetworks />
        <MotionSubtitle cues={getSubtitlesForChapter(35)} />
      </Sequence>
      <Sequence from={cues[35].setupStart} durationInFrames={cues[35].durationInFrames} name={cues[35].title}>
        <Chapter36_Cryptography />
        <MotionSubtitle cues={getSubtitlesForChapter(36)} />
      </Sequence>
      <Sequence from={cues[36].setupStart} durationInFrames={cues[36].durationInFrames} name={cues[36].title}>
        <Chapter37_InformationTheory />
        <MotionSubtitle cues={getSubtitlesForChapter(37)} />
      </Sequence>

      {/* ========================================================================= */}
      {/* ARC 7 — AI & MODERN CIVILIZATION (Ch 38 - 41)                             */}
      {/* ========================================================================= */}
      <Sequence from={cues[37].setupStart} durationInFrames={cues[37].durationInFrames} name={cues[37].title}>
        <Chapter38_Optimization />
        <MotionSubtitle cues={getSubtitlesForChapter(38)} />
      </Sequence>
      <Sequence from={cues[38].setupStart} durationInFrames={cues[38].durationInFrames} name={cues[38].title}>
        <Chapter39_NeuralNetworks />
        <MotionSubtitle cues={getSubtitlesForChapter(39)} />
      </Sequence>
      <Sequence from={cues[39].setupStart} durationInFrames={cues[39].durationInFrames} name={cues[39].title}>
        <Chapter40_AIRepresentation />
        <MotionSubtitle cues={getSubtitlesForChapter(40)} />
      </Sequence>
      <Sequence from={cues[40].setupStart} durationInFrames={cues[40].durationInFrames} name={cues[40].title}>
        <Chapter41_ModernLifeMath />
        <MotionSubtitle cues={getSubtitlesForChapter(41)} />
      </Sequence>

      {/* ========================================================================= */}
      {/* ARC 8 — RETURN (Ch 42)                                                    */}
      {/* ========================================================================= */}
      <Sequence from={cues[41].setupStart} durationInFrames={cues[41].durationInFrames} name={cues[41].title}>
        <Chapter42_FinalReturn />
        <MotionSubtitle cues={getSubtitlesForChapter(42)} />
      </Sequence>
    </AbsoluteFill>
  );
};

