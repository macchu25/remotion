import "./index.css";
import { Composition } from "remotion";
import { EvolutionMasterFilm } from "./evolution/EvolutionMasterFilm";
import { TOTAL_FILM_FRAMES } from "./evolution/timeline/chapterCues";
import { DivideByZeroShort } from "./DivideByZeroShort";
import { NegativeTimesNegativeShort } from "./NegativeTimesNegativeShort";
import { PrimeProtectionShort, primeCompSchema } from "./PrimeProtectionShort";
import {
  PrimeMasterclassShort,
  masterclassCompSchema,
} from "./PrimeMasterclassShort";

// ===========================================================================
// REMOTION ROOT — MASTER FILM & SHORTS
// ===========================================================================

export const RemotionRoot: React.FC = () => {
  return (
    <>
      {/* ===== THE EVOLUTION OF MATHEMATICS — MASTER FILM (16:9 1080p) ===== */}

      {/* ===== MASTERCLASS PEDAGOGY SHORT (COMPREHENSIVE PEDAGOGY EDITION) ===== */}
      <Composition
        id="PrimeMasterclassShort"
        component={PrimeMasterclassShort}
        durationInFrames={1933}
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
      <Composition
        id="PrimeMasterclassShortFull"
        component={PrimeMasterclassShort}
        durationInFrames={5413}
        fps={30}
        width={1080}
        height={1920}
        schema={masterclassCompSchema}
        defaultProps={{
          playbackSpeed: 1.75,
          bgmEnabled: true,
          bgmTrack: "",
          bgmVolume: 0.08,
        }}
      />
      {/* ===== PRIME PROTECTION SHORT (VERSION 1) ===== */}
      {/* ===== SHORT 02: NEGATIVE × NEGATIVE = POSITIVE ===== */}
      {/* ===== SHORT 01: DIVIDE BY ZERO ===== */}
    </>
  );
};
