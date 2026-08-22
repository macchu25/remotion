import React from "react";
import { Audio, staticFile } from "remotion";
import { z } from "zod";

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
  const finalVolume = overrideVolume !== undefined ? overrideVolume : bgmVolume;

  if (!bgmEnabled || !bgmTrack || bgmTrack === "none" || finalVolume <= 0) {
    return null;
  }

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
