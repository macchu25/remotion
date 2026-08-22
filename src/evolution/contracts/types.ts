// ===========================================================================
// TYPES & CONTRACT SCHEMAS — THE EVOLUTION OF MATHEMATICS (V4)
// ===========================================================================

export interface ChapterCue {
  id: string;
  chapterIndex: number;
  title: string;
  arcIndex: number;
  arcTitle: string;
  fps: number;
  setupStart: number;       // absolute start frame
  setupEnd: number;
  developmentStart: number;
  anticipation: number;
  impact: number;           // impact frame/event
  settle: number;
  bridgeStart: number;
  bridgeImpact: number;
  transitionOut: number;    // absolute end frame
  durationInFrames: number;
}

export type MotionPhase = 'setup' | 'development' | 'anticipation' | 'action' | 'impact' | 'settle' | 'bridge';

export interface CameraState {
  x: number;
  y: number;
  zoom: number;
  rotation: number;
  shakeIntensity: number;
}

export interface CameraCue {
  openingFraming: CameraState;
  focalSubject: string;
  panBehavior: 'still' | 'slow_push' | 'pullback' | 'lateral_track' | 'orbital' | 'vertical_drift';
  scaleChanges: number[];
  finalFraming: CameraState;
}

export interface AudioCue {
  frame: number;
  assetId: string;
  category: 'semantic_motif' | 'motion' | 'impact' | 'micro' | 'ambient';
  volume: number;
  playbackRate?: number;
  description: string;
}

export interface ChapterAnimationContract {
  chapterId: string;
  title: string;
  conceptualGoal: string;
  openingState: {
    inheritedElement: string;
    cameraPosition: CameraState;
    backgroundState: string;
    colorPalette: string[];
  };
  primaryVisualMetaphor: string;
  primaryMotion: string;
  secondaryMotion: string;
  ambientMicroMotion: string[];
  cameraContract: CameraCue;
  phases: {
    anticipation: string;
    action: string;
    impact: string;
    settle: string;
  };
  visualFocusMap: { frameOffset: number; focusSubject: string }[];
  sfxContract: {
    semanticMotif: string;
    motionSFX: string[];
    impactSFX: string[];
    microDensity: 'low' | 'medium' | 'high';
  };
  musicContract: {
    energyTrajectory: string;
    duckingFrames: number[];
    climaxFrame: number;
  };
  entryExitLanguage: {
    entry: string;
    exit: string;
  };
  chapterToChapterBridge: string;
  cueMap: Record<string, number>;
  complexityBudget: {
    maxParticles: number;
    svgNodes: number;
  };
}

export type SubtitleMotionPreset =
  | "calmExplain"
  | "discovery"
  | "question"
  | "definition"
  | "majorReveal"
  | "technicalTerm"
  | "transition";

export type SubtitlePosition = "bottom" | "top" | "top-right" | "bottom-right" | "bottom-left" | "center";

export interface SubtitleCue {
  id: string;
  chapterIndex: number;
  startFrame: number;
  endFrame: number;
  impactFrame?: number;
  text: string;
  emphasizedWords?: string[];
  motionPreset?: SubtitleMotionPreset;
  position?: SubtitlePosition;
  equationNote?: string;
  voiceFrames?: number;
  durationSec?: number;
}
