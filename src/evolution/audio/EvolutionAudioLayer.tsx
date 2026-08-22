import React from "react";
import { Audio, Sequence, staticFile } from "remotion";
import { CHAPTER_CUES } from "../timeline/chapterCues";
import { VIETNAMESE_SUBTITLE_CUES } from "../subtitles/vietnameseCues";

export const EvolutionAudioLayer: React.FC = () => {
  return (
    <>
      {/* ===== CONTINUOUS CINEMATIC BACKGROUND MUSIC (REMOVED AS REQUESTED) ===== */}

      {/* ===== 🎬 CINEMATIC HOOK VOICEOVER LAYER (0 - 490 FRAMES, EXACT PROBED TIMINGS) ===== */}
      <Sequence from={15} name="Voice: ch00_hook_sub01">
        <Audio
          src={staticFile("audio/voice_evolution/ch00_hook_sub01.mp3")}
          volume={1.0}
          playbackRate={1.0}
        />
      </Sequence>
      <Sequence from={169} name="Voice: ch00_hook_sub02">
        <Audio
          src={staticFile("audio/voice_evolution/ch00_hook_sub02.mp3")}
          volume={1.0}
          playbackRate={1.0}
        />
      </Sequence>
      <Sequence from={350} name="Voice: ch00_hook_sub03">
        <Audio
          src={staticFile("audio/voice_evolution/ch00_hook_sub03.mp3")}
          volume={1.0}
          playbackRate={1.0}
        />
      </Sequence>

      {/* ===== VIETNAMESE AI VOICEOVER LAYER (SYNCED TO SUBTITLE CUES) ===== */}
      {VIETNAMESE_SUBTITLE_CUES.map((sub) => {
        const chapterCue = CHAPTER_CUES[sub.chapterIndex - 1];
        if (!chapterCue) return null;
        const globalStartFrame = chapterCue.setupStart + sub.startFrame;

        return (
          <Sequence
            key={`voice_${sub.id}`}
            from={globalStartFrame}
            name={`Voice: ${sub.id}`}
          >
            <Audio
              src={staticFile(`audio/voice_evolution/${sub.id}.mp3`)}
              volume={1.0}
              playbackRate={1.0}
            />
          </Sequence>
        );
      })}

      {/* ===== 🎬 CINEMATIC HOOK INTRO SOUND DESIGN LAYER (0 - 490 FRAMES) ===== */}
      <Sequence from={0} durationInFrames={490} name="SFX: 00. Cinematic Hook Intro">
        {/* FX-001: Book Materialization & Sub Bass Boom */}
        <Sequence from={5}>
          <Audio src={staticFile("audio/sfx/mystery_ping.wav")} volume={0.35} />
        </Sequence>
        <Sequence from={10}>
          <Audio src={staticFile("audio/sfx/boom.wav")} volume={0.4} />
        </Sequence>

        {/* FX-002: Book Opening Mechanical Creak & Cover Swing */}
        <Sequence from={50}>
          <Audio src={staticFile("audio/sfx/mechanical_lock.wav")} volume={0.3} />
        </Sequence>
        <Sequence from={58}>
          <Audio src={staticFile("audio/sfx/whoosh.wav")} volume={0.28} playbackRate={0.85} />
        </Sequence>

        {/* FX-004: Accelerating Page Turns (Slow -> Fast -> Super Fast) */}
        {/* Page 1 (Slow) */}
        <Sequence from={120}>
          <Audio src={staticFile("audio/sfx/whoosh.wav")} volume={0.20} playbackRate={0.9} />
        </Sequence>
        {/* Page 2 (Faster) */}
        <Sequence from={195}>
          <Audio src={staticFile("audio/sfx/whoosh.wav")} volume={0.24} playbackRate={1.15} />
        </Sequence>
        {/* Page 3 (Fast) */}
        <Sequence from={255}>
          <Audio src={staticFile("audio/sfx/whoosh.wav")} volume={0.28} playbackRate={1.4} />
        </Sequence>
        {/* Page 4 (Very Fast) */}
        <Sequence from={300}>
          <Audio src={staticFile("audio/sfx/whoosh.wav")} volume={0.32} playbackRate={1.65} />
        </Sequence>
        {/* Page 5 (Lightning Fast) */}
        <Sequence from={335}>
          <Audio src={staticFile("audio/sfx/whoosh.wav")} volume={0.36} playbackRate={2.0} />
        </Sequence>
        <Sequence from={350}>
          <Audio src={staticFile("audio/sfx/harmonic_resolve.wav")} volume={0.35} />
        </Sequence>

        {/* FX-005: Tension Riser & Transition Impact into Chapter 1 */}
        <Sequence from={450}>
          <Audio src={staticFile("audio/sfx/riser.wav")} volume={0.35} />
        </Sequence>
        <Sequence from={480}>
          <Audio src={staticFile("audio/sfx/impact.wav")} volume={0.45} />
        </Sequence>
      </Sequence>

      {/* ===== CHAPTER-BY-CHAPTER SOUND DESIGN & SFX LAYER ===== */}
      {CHAPTER_CUES.map((cue, idx) => {
        const start = cue.setupStart;
        const dur = cue.durationInFrames;
        const impact = cue.impact - start;

        return (
          <Sequence key={cue.id} from={start} durationInFrames={dur} name={`SFX: ${cue.title}`}>
            {/* Chapter Entrance Transition Whoosh */}
            <Sequence from={0}>
              <Audio
                src={staticFile("audio/sfx/whoosh.wav")}
                volume={0.22}
              />
            </Sequence>

            {/* Chapter Development / Intermediate SFX */}
            {idx === 0 && ( // Ch 1: Before Numbers
              <>
                <Sequence from={15}>
                  <Audio src={staticFile("audio/sfx/pop.wav")} volume={0.25} />
                </Sequence>
                <Sequence from={50}>
                  <Audio src={staticFile("audio/sfx/pop.wav")} volume={0.25} />
                </Sequence>
                <Sequence from={85}>
                  <Audio src={staticFile("audio/sfx/pop.wav")} volume={0.25} />
                </Sequence>
                <Sequence from={125}>
                  <Audio src={staticFile("audio/sfx/chalk_scratch.wav")} volume={0.3} />
                </Sequence>
                <Sequence from={290}>
                  <Audio src={staticFile("audio/sfx/harmonic_resolve.wav")} volume={0.35} />
                </Sequence>
              </>
            )}

            {idx === 1 && ( // Ch 2: Marks & Grouping
              <>
                <Sequence from={60}>
                  <Audio src={staticFile("audio/sfx/click.wav")} volume={0.25} />
                </Sequence>
                <Sequence from={180}>
                  <Audio src={staticFile("audio/sfx/mechanical_lock.wav")} volume={0.3} />
                </Sequence>
                <Sequence from={300}>
                  <Audio src={staticFile("audio/sfx/impact.wav")} volume={0.35} />
                </Sequence>
              </>
            )}

            {idx === 2 && ( // Ch 3: Numeral Systems
              <>
                <Sequence from={70}>
                  <Audio src={staticFile("audio/sfx/click.wav")} volume={0.25} />
                </Sequence>
                <Sequence from={210}>
                  <Audio src={staticFile("audio/sfx/ding.wav")} volume={0.3} />
                </Sequence>
                <Sequence from={370}>
                  <Audio src={staticFile("audio/sfx/harmonic_resolve.wav")} volume={0.35} />
                </Sequence>
              </>
            )}

            {idx === 3 && ( // Ch 4: Place Value & Zero
              <>
                <Sequence from={70}>
                  <Audio src={staticFile("audio/sfx/click.wav")} volume={0.25} />
                </Sequence>
                <Sequence from={200}>
                  <Audio src={staticFile("audio/sfx/mechanical_lock.wav")} volume={0.3} />
                </Sequence>
                <Sequence from={360}>
                  <Audio src={staticFile("audio/sfx/harmonic_resolve.wav")} volume={0.4} />
                </Sequence>
              </>
            )}

            {idx === 4 && ( // Ch 5: Beyond the Hand
              <>
                <Sequence from={60}>
                  <Audio src={staticFile("audio/sfx/click.wav")} volume={0.25} />
                </Sequence>
                <Sequence from={180}>
                  <Audio src={staticFile("audio/sfx/ding.wav")} volume={0.3} />
                </Sequence>
                <Sequence from={300}>
                  <Audio src={staticFile("audio/sfx/impact.wav")} volume={0.35} />
                </Sequence>
              </>
            )}

            {idx === 5 && ( // Ch 6: Geometry from Measurement
              <>
                <Sequence from={70}>
                  <Audio src={staticFile("audio/sfx/chalk_scratch.wav")} volume={0.3} />
                </Sequence>
                <Sequence from={130}>
                  <Audio src={staticFile("audio/sfx/mechanical_lock.wav")} volume={0.3} />
                </Sequence>
                <Sequence from={210}>
                  <Audio src={staticFile("audio/sfx/ding.wav")} volume={0.3} />
                </Sequence>
                <Sequence from={340}>
                  <Audio src={staticFile("audio/sfx/harmonic_resolve.wav")} volume={0.35} />
                </Sequence>
              </>
            )}

            {idx === 6 && ( // Ch 7: Multiplication Becomes Area
              <>
                <Sequence from={65}>
                  <Audio src={staticFile("audio/sfx/click.wav")} volume={0.25} />
                </Sequence>
                <Sequence from={140}>
                  <Audio src={staticFile("audio/sfx/whoosh.wav")} volume={0.25} />
                </Sequence>
                <Sequence from={280}>
                  <Audio src={staticFile("audio/sfx/harmonic_resolve.wav")} volume={0.35} />
                </Sequence>
              </>
            )}

            {idx === 7 && ( // Ch 8: Pythagorean Structure
              <>
                <Sequence from={70}>
                  <Audio src={staticFile("audio/sfx/click.wav")} volume={0.25} />
                </Sequence>
                <Sequence from={140}>
                  <Audio src={staticFile("audio/sfx/ding.wav")} volume={0.3} />
                </Sequence>
                <Sequence from={270}>
                  <Audio src={staticFile("audio/sfx/whoosh.wav")} volume={0.3} />
                </Sequence>
                <Sequence from={350}>
                  <Audio src={staticFile("audio/sfx/boom.wav")} volume={0.4} />
                </Sequence>
              </>
            )}

            {idx === 8 && ( // Ch 9: Circle, Ratio, and Pi
              <>
                <Sequence from={60}>
                  <Audio src={staticFile("audio/sfx/ding.wav")} volume={0.3} />
                </Sequence>
                <Sequence from={150}>
                  <Audio src={staticFile("audio/sfx/whoosh.wav")} volume={0.3} />
                </Sequence>
                <Sequence from={290}>
                  <Audio src={staticFile("audio/sfx/click.wav")} volume={0.25} />
                </Sequence>
                <Sequence from={360}>
                  <Audio src={staticFile("audio/sfx/harmonic_resolve.wav")} volume={0.4} />
                </Sequence>
              </>
            )}

            {/* General Chapter Impact Fallback */}
            {idx > 8 && (
              <Sequence from={impact}>
                <Audio
                  src={staticFile("audio/sfx/impact.wav")}
                  volume={0.35}
                />
              </Sequence>
            )}
          </Sequence>
        );
      })}
    </>
  );
};
