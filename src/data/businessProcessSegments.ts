import { VideoSegment } from '@/types/video';

// Mobile-optimized video segments for the business process
// These are placeholder videos optimized for mobile viewing
export const businessProcessSegments: VideoSegment[] = [
  {
    id: 'initial-contact',
    title: 'Initial Contact & Assessment',
    description: 'Our comprehensive consultation process begins with understanding your specific steel trading and recycling requirements. We conduct detailed assessments of your material specifications, volume requirements, quality standards, and delivery timelines. Our expert team evaluates your project scope, discusses budget considerations, and provides tailored solutions that align with your business objectives. This phase establishes the foundation for a successful partnership.',
    sources: [
      { 
        src: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4', 
        type: 'video/mp4', 
        quality: '720p' 
      },
      { 
        src: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4', 
        type: 'video/mp4', 
        quality: '480p' 
      }
    ],
    poster: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&h=600&fit=crop&crop=center',
    captions: '/captions/segment1.vtt',
    duration: 30
  },
  {
    id: 'processing-logistics',
    title: 'Processing & Logistics',
    description: 'Once requirements are established, we move into the processing and logistics phase. Our state-of-the-art facilities handle material processing with precision and efficiency. We coordinate complex logistics operations including transportation, storage, and quality control measures. Our team ensures environmental compliance throughout the process while maintaining real-time tracking and progress monitoring. This phase demonstrates our operational excellence and commitment to sustainable practices.',
    sources: [
      { 
        src: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4', 
        type: 'video/mp4', 
        quality: '720p' 
      },
      { 
        src: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4', 
        type: 'video/mp4', 
        quality: '480p' 
      }
    ],
    poster: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=400&h=600&fit=crop&crop=center',
    captions: '/captions/segment2.vtt',
    duration: 35
  },
  {
    id: 'delivery-completion',
    title: 'Delivery & Project Completion',
    description: 'The final phase focuses on seamless delivery and project completion. We coordinate precise delivery schedules to your specified locations, conduct thorough final inspections, and ensure customer approval at every step. Our team provides comprehensive documentation, certifications, and quality assurance reports. We maintain ongoing support and follow-up to ensure complete customer satisfaction and establish long-term business relationships.',
    sources: [
      { 
        src: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4', 
        type: 'video/mp4', 
        quality: '720p' 
      },
      { 
        src: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4', 
        type: 'video/mp4', 
        quality: '480p' 
      }
    ],
    poster: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=400&h=600&fit=crop&crop=center',
    captions: '/captions/segment3.vtt',
    duration: 25
  }
];

// Placeholder WebVTT caption content
export const placeholderCaptions = {
  segment1: `WEBVTT

00:00:00.000 --> 00:00:05.000
Welcome to our initial consultation process.

00:00:05.000 --> 00:00:10.000
We begin by understanding your specific steel trading needs.

00:00:10.000 --> 00:00:15.000
Our experts assess your requirements and provide tailored solutions.

00:00:15.000 --> 00:00:20.000
Quality assessment and material specifications are discussed.

00:00:20.000 --> 00:00:25.000
We establish clear timelines and delivery expectations.

00:00:25.000 --> 00:00:30.000
Initial contact phase completed successfully.`,

  segment2: `WEBVTT

00:00:00.000 --> 00:00:05.000
Processing phase begins with material preparation.

00:00:05.000 --> 00:00:10.000
Our state-of-the-art facilities handle steel processing.

00:00:10.000 --> 00:00:15.000
Quality control measures ensure material standards.

00:00:15.000 --> 00:00:20.000
Logistics coordination for efficient transportation.

00:00:20.000 --> 00:00:25.000
Real-time tracking and progress monitoring.

00:00:25.000 --> 00:00:30.000
Environmental compliance throughout the process.

00:00:30.000 --> 00:00:35.000
Processing and logistics phase completed.`,

  segment3: `WEBVTT

00:00:00.000 --> 00:00:05.000
Final delivery preparation and quality verification.

00:00:05.000 --> 00:00:10.000
Coordinated delivery to your specified location.

00:00:10.000 --> 00:00:15.000
Final inspection and customer approval process.

00:00:15.000 --> 00:00:20.000
Documentation and certification provided.

00:00:20.000 --> 00:00:25.000
Project completion and customer satisfaction confirmed.`
};