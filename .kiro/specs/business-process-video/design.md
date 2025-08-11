# Design Document

## Overview

The Business Process Video section will replace the existing "Our Solutions" section with a sophisticated video player that seamlessly presents three sequential video segments. The design uses a double-buffering approach with two video elements to eliminate gaps between segments, creating a continuous viewing experience that showcases the company's complete workflow.

## Architecture

### Component Structure
```
BusinessProcessVideo
├── VideoStage (Main playback area)
│   ├── VideoPlayer (Primary video element)
│   ├── VideoBuffer (Secondary video element for preloading)
│   ├── PlayOverlay (Autoplay fallback)
│   └── LoadingState (Initial loading indicator)
├── VideoControls
│   ├── PlayPauseButton
│   ├── MuteButton
│   ├── SkipButtons (Forward/Back)
│   └── VolumeControl
├── ProgressTimeline
│   ├── TimelineSegment (x3)
│   ├── ProgressBar
│   └── SegmentLabels
└── CaptionTrack (WebVTT subtitles)
```

### State Management
- Use React hooks for video state, current segment, and playback controls
- Implement double-buffering state to manage two video elements
- Track loading states, autoplay capabilities, and user interactions
- Handle error states and fallback scenarios

### Integration Approach
- Replace the existing "Our Solutions" section completely
- Maintain the same section spacing and responsive grid layout
- Use scoped CSS classes with `.hp-bp-` prefix to avoid global conflicts
- Preserve all other homepage functionality and styling

## Components and Interfaces

### BusinessProcessVideo Component

**Props Interface:**
```typescript
interface BusinessProcessVideoProps {
  segments: VideoSegment[];
  autoplay?: boolean;
  muted?: boolean;
  className?: string;
  onSegmentStart?: (segmentId: string) => void;
  onSegmentComplete?: (segmentId: string) => void;
  onFullPlayComplete?: () => void;
}

interface VideoSegment {
  id: string;
  title: string;
  description: string;
  sources: VideoSource[];
  poster: string;
  captions: string; // WebVTT file path
  duration: number;
}

interface VideoSource {
  src: string;
  type: string; // 'video/mp4' | 'video/webm'
  quality: '720p' | '480p';
}
```

### Double-Buffering Implementation
```typescript
interface VideoBufferState {
  activePlayer: 'primary' | 'secondary';
  primaryVideo: HTMLVideoElement | null;
  secondaryVideo: HTMLVideoElement | null;
  currentSegmentIndex: number;
  nextSegmentIndex: number;
  isTransitioning: boolean;
}
```

## Data Models

### Video Segments Configuration
```typescript
const businessProcessSegments: VideoSegment[] = [
  {
    id: 'initial-contact',
    title: 'Initial Contact & Assessment',
    description: 'Client consultation and requirement analysis',
    sources: [
      { src: '/videos/segment1-720p.mp4', type: 'video/mp4', quality: '720p' },
      { src: '/videos/segment1-480p.mp4', type: 'video/mp4', quality: '480p' },
      { src: '/videos/segment1-720p.webm', type: 'video/webm', quality: '720p' }
    ],
    poster: '/images/segment1-poster.jpg',
    captions: '/captions/segment1.vtt',
    duration: 30
  },
  {
    id: 'processing-logistics',
    title: 'Processing & Logistics',
    description: 'Material processing and logistics coordination',
    sources: [
      { src: '/videos/segment2-720p.mp4', type: 'video/mp4', quality: '720p' },
      { src: '/videos/segment2-480p.mp4', type: 'video/mp4', quality: '480p' },
      { src: '/videos/segment2-720p.webm', type: 'video/webm', quality: '720p' }
    ],
    poster: '/images/segment2-poster.jpg',
    captions: '/captions/segment2.vtt',
    duration: 35
  },
  {
    id: 'delivery-completion',
    title: 'Delivery & Completion',
    description: 'Final delivery and project completion',
    sources: [
      { src: '/videos/segment3-720p.mp4', type: 'video/mp4', quality: '720p' },
      { src: '/videos/segment3-480p.mp4', type: 'video/mp4', quality: '480p' },
      { src: '/videos/segment3-720p.webm', type: 'video/webm', quality: '720p' }
    ],
    poster: '/images/segment3-poster.jpg',
    captions: '/captions/segment3.vtt',
    duration: 25
  }
];
```

## Technical Implementation

### Double-Buffering Strategy
1. **Initialization**: Load first segment in primary video element
2. **Preloading**: While primary plays, preload next segment in secondary element
3. **Transition**: At 0.3s before primary ends, start secondary and crossfade opacity
4. **Swap**: Make secondary the new primary, use old primary for next preload
5. **Repeat**: Continue pattern for seamless playback

### Responsive Design
```css
.hp-bp-container {
  /* Match existing section spacing */
  @apply py-12 sm:py-16 bg-white;
}

.hp-bp-video-stage {
  /* Responsive aspect ratio */
  @apply relative w-full;
  aspect-ratio: 16/9;
}

@media (max-width: 768px) {
  .hp-bp-video-stage {
    aspect-ratio: 4/3;
  }
}
```

### Accessibility Implementation
- ARIA roles and labels for all interactive elements
- Keyboard navigation support (Space, Arrow keys, Tab)
- Screen reader announcements for segment changes
- High contrast focus indicators
- Caption support with WebVTT tracks

## Error Handling

### Video Loading Failures
- Fallback to lower quality versions automatically
- Display poster image if all video sources fail
- Provide manual retry mechanism
- Graceful degradation to static content with process description

### Autoplay Restrictions
- Detect autoplay capability on page load
- Show prominent play button overlay if autoplay blocked
- Maintain layout integrity with overlay
- Start playback when user interacts with play button

### Network Conditions
- Adaptive quality selection based on connection speed
- Progressive loading with metadata preload
- Bandwidth-aware fallbacks
- Loading indicators during buffering

## Performance Optimizations

### Video Delivery
- CDN distribution for global performance
- Multiple format support (MP4, WebM)
- Adaptive bitrate streaming where possible
- Efficient compression settings

### Memory Management
- Proper cleanup of video elements
- Event listener removal on unmount
- Buffer management for smooth playback
- Garbage collection of unused resources

### Loading Strategy
- Preload="metadata" for initial load
- Progressive enhancement approach
- Lazy loading for non-critical assets
- Optimized poster image delivery

## Analytics Integration

### Event Tracking
```typescript
interface VideoAnalyticsEvent {
  event: 'bp_segment_start' | 'bp_segment_complete' | 'bp_full_play_complete';
  segmentId: string;
  timestamp: number;
  userId?: string;
  sessionId: string;
}
```

### Privacy Compliance
- Respect user consent preferences
- Anonymous tracking where required
- GDPR/CCPA compliance
- Opt-out mechanisms

## Testing Strategy

### Cross-Browser Testing
- Chrome, Firefox, Safari (iOS + macOS), Edge
- Android browsers (Chrome, Samsung Internet)
- Video format compatibility testing
- Autoplay behavior verification

### Performance Testing
- Lighthouse audits for CLS and performance
- Network throttling tests
- Memory usage monitoring
- Loading time optimization

### Accessibility Testing
- Screen reader compatibility (NVDA, JAWS, VoiceOver)
- Keyboard navigation testing
- Color contrast validation
- Caption accuracy verification

### Mobile Testing
- Portrait and landscape orientations
- Touch interaction testing
- Autoplay behavior on mobile
- Performance on low-end devices

## Security Considerations

### Content Security Policy
- Video source validation
- CDN whitelist configuration
- XSS prevention measures
- Secure caption file delivery

### Resource Protection
- Video hotlinking prevention
- Bandwidth abuse protection
- Rate limiting for video requests
- Secure token-based access where needed