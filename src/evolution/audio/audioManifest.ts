// ===========================================================================
// AUDIO MANIFEST & SOUND DESIGN CONTROLLER — MASTER PROMPT V4
// ===========================================================================

export interface AudioAsset {
  id: string;
  path: string;
  category: 'semantic_motif' | 'motion' | 'impact' | 'micro' | 'ambient';
  sampleVariants?: string[];
  volume: number;
  isFinal: boolean;
}

export const AUDIO_MANIFEST: Record<string, AudioAsset> = {
  // Dot emergence motif
  dot_appear: {
    id: "dot_appear",
    path: "public/sfx/dot_pop_01.mp3",
    category: "semantic_motif",
    sampleVariants: [
      "public/sfx/dot_pop_01.mp3",
      "public/sfx/dot_pop_02.mp3",
      "public/sfx/dot_pop_03.mp3",
    ],
    volume: 0.35,
    isFinal: true,
  },
  // Stone / scratch impact
  stone_scratch: {
    id: "stone_scratch",
    path: "public/sfx/scratch_stone.mp3",
    category: "motion",
    volume: 0.4,
    isFinal: true,
  },
  // Grouping snap
  group_snap: {
    id: "group_snap",
    path: "public/sfx/snap_group.mp3",
    category: "impact",
    volume: 0.5,
    isFinal: true,
  },
  // Tonal crystallization
  zero_crystallize: {
    id: "zero_crystallize",
    path: "public/sfx/resonant_zero.mp3",
    category: "semantic_motif",
    volume: 0.6,
    isFinal: true,
  },
  // Arc ambient loops
  arc1_ambient: {
    id: "arc1_ambient",
    path: "public/bgm/arc1_primordial.mp3",
    category: "ambient",
    volume: 0.12,
    isFinal: true,
  },
};

/**
 * Gets a sample variation deterministically based on frame and index
 */
export function getSampleVariant(assetId: string, index: number): string {
  const asset = AUDIO_MANIFEST[assetId];
  if (!asset || !asset.sampleVariants || asset.sampleVariants.length === 0) {
    return asset?.path || "";
  }
  const variantIdx = Math.abs(index) % asset.sampleVariants.length;
  return asset.sampleVariants[variantIdx];
}
