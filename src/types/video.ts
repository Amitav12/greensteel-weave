export interface VideoSource {
  src: string;
  type: 'video/mp4' | 'video/webm';
  quality: '720p' | '480p';
}

export interface VideoSegment {
  id: string;
  title: string;
  description: string;
  sources: VideoSource[];
  poster: string;
  captions: string; // WebVTT file path
  duration: number; // in seconds
}

export interface VideoBufferState {
  activePlayer: 'primary' | 'secondary';
  primaryVideo: HTMLVideoElement | null;
  secondaryVideo: HTMLVideoElement | null;
  currentSegmentIndex: number;
  nextSegmentIndex: number;
  isTransitioning: boolean;
}

export interface VideoAnalyticsEvent {
  event: 'bp_segment_start' | 'bp_segment_complete' | 'bp_full_play_complete';
  segmentId: string;
  timestamp: number;
  userId?: string;
  sessionId: string;
}

export interface BusinessProcessVideoProps {
  segments?: VideoSegment[];
  autoplay?: boolean;
  muted?: boolean;
  className?: string;
  onSegmentStart?: (segmentId: string) => void;
  onSegmentComplete?: (segmentId: string) => void;
  onFullPlayComplete?: () => void;
}