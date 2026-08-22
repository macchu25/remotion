import "./index.css";
import { Composition } from "remotion";
import { EvolutionMasterFilm } from "./evolution/EvolutionMasterFilm";
import { EvolutionCinematicHook } from "./evolution/hook/EvolutionCinematicHook";
import { CHAPTER_CUES, HOOK_DURATION_FRAMES } from "./evolution/timeline/chapterCues";
import { DivideByZeroShort } from "./DivideByZeroShort";
import { NegativeTimesNegativeShort } from "./NegativeTimesNegativeShort";
import { PrimeProtectionShort, primeCompSchema } from "./PrimeProtectionShort";
import {
  PrimeMasterclassShort,
  masterclassCompSchema,
} from "./PrimeMasterclassShort";

// Total frames for Full Epic Master Film (Cinematic Hook + all 42 Chapters)
const TOTAL_MASTER_FILM_FRAMES =
  HOOK_DURATION_FRAMES +
  CHAPTER_CUES.reduce((sum, c) => sum + c.durationInFrames, 0);

export const RemotionRoot: React.FC = () => {
  return (
    <>
      {/* ===== THE EVOLUTION OF MATHEMATICS — FULL MASTER FILM (Hook + 42 Chapters) ===== */}
      <Composition
        id="EvolutionOfMathematics"
        component={EvolutionMasterFilm}
        durationInFrames={TOTAL_MASTER_FILM_FRAMES}
        fps={30}
        width={1920}
        height={1080}
      />

      {/* ===== THE CINEMATIC HOOK INTRO ===== */}
      <Composition
        id="EvolutionCinematicHook"
        component={EvolutionCinematicHook}
        durationInFrames={HOOK_DURATION_FRAMES}
        fps={30}
        width={1920}
        height={1080}
      />

      {/* ===== MASTERCLASS PEDAGOGY SHORT ===== */}
      <Composition
        id="PrimeMasterclassShort"
        component={PrimeMasterclassShort}
        durationInFrames={1800}
        fps={30}
        width={1080}
        height={1920}
        schema={masterclassCompSchema}
        defaultProps={{
          playbackSpeed: 2.8,
          bgmEnabled: true,
          bgmTrack: "custom_bgm.mp3",
          bgmVolume: 0.08,
        }}
      />

      {/* ===== PRIME PROTECTION SHORT ===== */}
      <Composition
        id="PrimeProtectionShort"
        component={PrimeProtectionShort}
        durationInFrames={1350}
        fps={30}
        width={1080}
        height={1920}
        schema={primeCompSchema}
        defaultProps={{
          playbackSpeed: 2.8,
          bgmEnabled: true,
          bgmVolume: 0.08,
        }}
      />

      {/* ===== SHORT 02: NEGATIVE × NEGATIVE = POSITIVE ===== */}
      <Composition
        id="NegativeTimesNegativeShort"
        component={NegativeTimesNegativeShort}
        durationInFrames={1350}
        fps={30}
        width={1080}
        height={1920}
      />

      {/* ===== SHORT 01: DIVIDE BY ZERO ===== */}
      <Composition
        id="DivideByZeroShort"
        component={DivideByZeroShort}
        durationInFrames={1350}
        fps={30}
        width={1080}
        height={1920}
      />
    </>
  );
};
