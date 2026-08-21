import React, { useEffect, useRef } from "react";
import { Audio, staticFile } from "remotion";
import { z } from "zod";

// ===========================================================================
// HYBRID BGM MANAGER
// 1. Studio Preview: Plays audio live via HTML5 Audio & returns NULL (Zero green timeline rows!)
// 2. Headless Render: Renders Remotion Audio component into the final MP4 video output!
// ===========================================================================

export const bgmSchema = z.object({
  bgmEnabled: z
    .boolean()
    .default(true)
    .describe("Bật / Tắt Nhạc Nền (ON / OFF)"),
  bgmTrack: z
    .string()
    .default("custom_bgm.mp3")
    .describe("File Nhạc Nền trong public/ (e.g. custom_bgm.mp3 [df.mp3])"),
  bgmVolume: z
    .number()
    .min(0.0)
    .max(1.0)
    .step(0.01)
    .default(0.08)
    .describe("Âm lượng Nhạc Nền (0.00 đến 1.00 e.g. 0.03, 0.08)"),
  bgmStartFrame: z
    .number()
    .min(0)
    .default(0)
    .describe("Frame bắt đầu phát nhạc nền"),
});

export type BgmProps = z.infer<typeof bgmSchema>;

interface BgmManagerProps extends BgmProps {
  overrideVolume?: number;
}

export const BgmManager: React.FC<BgmManagerProps> = ({
  bgmEnabled = true,
  bgmTrack = "custom_bgm.mp3",
  bgmVolume = 0.08,
  bgmStartFrame = 0,
  overrideVolume,
}) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const finalVolume = overrideVolume !== undefined ? overrideVolume : bgmVolume;

  const isStudioPreview =
    typeof window !== "undefined" &&
    Boolean(window.location && (window.location.host.includes("localhost") || window.location.host.includes("127.0.0.1")));

  // HTML5 Audio for Studio Preview (Plays live audio without creating timeline rows!)
  useEffect(() => {
    if (isStudioPreview) {
      let audio = audioRef.current;
      const targetSrc = staticFile(bgmTrack);
      if (!audio || audio.src !== targetSrc) {
        if (audio) audio.pause();
        audio = new window.Audio(targetSrc);
        audio.loop = true;
        audioRef.current = audio;
      }

      audio.volume = bgmEnabled ? Math.max(0, Math.min(1, finalVolume)) : 0;

      if (bgmEnabled && finalVolume > 0) {
        audio.play().catch(() => {});
      } else {
        audio.pause();
      }
    }

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
      }
    };
  }, [isStudioPreview, bgmEnabled, bgmTrack, finalVolume]);

  if (!bgmEnabled || !bgmTrack || bgmTrack === "none" || finalVolume <= 0) {
    return null;
  }

  // In Studio Preview: Return NULL so NO green audio track row appears in the bottom timeline editor!
  if (isStudioPreview) {
    return null;
  }

  // During Headless MP4 Render: Render Remotion Audio component into the output video file!
  return (
    <Audio
      src={staticFile(bgmTrack)}
      volume={finalVolume}
      loop
      startFrom={bgmStartFrame}
      playbackRate={1.0}
    />
  );
};
