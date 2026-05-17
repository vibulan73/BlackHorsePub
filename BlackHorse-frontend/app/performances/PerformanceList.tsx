"use client";

import { useState, useEffect, useRef } from "react";
import { Play, Pause, Heart, Maximize, Volume2, VolumeX, X } from "lucide-react";
import { ScrollReveal } from "../components/ScrollReveal";

type Media = { id: number; title: string; url: string; type: "IMAGE" | "VIDEO" };

const SAMPLE_VIDEOS = [
  {
    id: 101,
    title: "Rock Band Live Performance",
    url: "https://assets.mixkit.co/videos/preview/mixkit-rock-band-performing-on-stage-43034-large.mp4",
    description: "An electric, high-octane performance from our weekend headliners, shaking the room with classic pub rock.",
    loved: false
  },
  {
    id: 102,
    title: "Acoustic Solo Guitarist",
    url: "https://assets.mixkit.co/videos/preview/mixkit-gig-guitarist-close-up-34444-large.mp4",
    description: "Intimate and soul-stirring fingerstyle guitar covers during our Sunday afternoon acoustic sessions.",
    loved: false
  },
  {
    id: 103,
    title: "Live Vocals Showcase",
    url: "https://assets.mixkit.co/videos/preview/mixkit-singer-performing-on-stage-in-a-nightclub-43026-large.mp4",
    description: "Breathtaking vocals from local songstress, delivering a mesmerizing performance in our intimate lounge.",
    loved: false
  },
  {
    id: 104,
    title: "Late Night Drum Solo",
    url: "https://assets.mixkit.co/videos/preview/mixkit-drummer-performing-in-a-concert-43033-large.mp4",
    description: "An explosive, rhythm-packed drum feature that got the entire crowd dancing at midnight.",
    loved: false
  },
  {
    id: 105,
    title: "Concert Crowd Energy",
    url: "https://assets.mixkit.co/videos/preview/mixkit-audience-raising-hands-at-a-music-concert-43028-large.mp4",
    description: "Capturing the electric vibes of a sold-out Saturday night. The crowd sang along to every single word!",
    loved: false
  }
];

export function PerformanceList({ backendMedia }: { backendMedia: Media[] }) {
  const [videos, setVideos] = useState<any[]>([]);
  const [activeVideo, setActiveVideo] = useState<any | null>(null);
  const [lovedIds, setLovedIds] = useState<number[]>([]);
  
  // Modal video controls state
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  const modalVideoRef = useRef<HTMLVideoElement | null>(null);

  // Initialize and randomize/shuffle the videos
  useEffect(() => {
    const saved = localStorage.getItem("loved-videos");
    if (saved) {
      try {
        setLovedIds(JSON.parse(saved));
      } catch (e) {}
    }

    const backendVideos = backendMedia
      .filter((item) => item.type === "VIDEO")
      .map((item) => ({
        id: item.id,
        title: item.title,
        url: item.url,
        description: "Recorded live at Black Horse Pub. Feel the crowd energy and join us for the next performance!"
      }));

    const allVideos = [...backendVideos, ...SAMPLE_VIDEOS];
    
    // Fisher-Yates shuffle for true, unbiased randomness
    const shuffled = [...allVideos];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    
    setVideos(shuffled);
  }, [backendMedia]);

  const toggleLove = (id: number, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    let updated;
    if (lovedIds.includes(id)) {
      updated = lovedIds.filter((item) => item !== id);
    } else {
      updated = [...lovedIds, id];
    }
    setLovedIds(updated);
    localStorage.setItem("loved-videos", JSON.stringify(updated));
  };

  const handleOpenModal = (video: any) => {
    setActiveVideo(video);
    setIsPlaying(true);
    setIsMuted(false);
    setCurrentTime(0);
  };

  const handleCloseModal = () => {
    setActiveVideo(null);
  };

  // Hover tile playing logic
  const handleMouseEnter = (e: React.MouseEvent<HTMLVideoElement>) => {
    const video = e.currentTarget;
    video.currentTime = 0;
    video.play().catch(() => {});
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLVideoElement>) => {
    const video = e.currentTarget;
    video.pause();
  };

  // Modal Video Time/Progress Event Handlers
  const handleTimeUpdate = () => {
    if (modalVideoRef.current) {
      setCurrentTime(modalVideoRef.current.currentTime);
    }
  };

  const handleLoadedMetadata = () => {
    if (modalVideoRef.current) {
      setDuration(modalVideoRef.current.duration);
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = Number(e.target.value);
    if (modalVideoRef.current) {
      modalVideoRef.current.currentTime = val;
      setCurrentTime(val);
    }
  };

  const togglePlayModal = () => {
    if (modalVideoRef.current) {
      if (isPlaying) {
        modalVideoRef.current.pause();
      } else {
        modalVideoRef.current.play().catch(() => {});
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMuteModal = () => {
    if (modalVideoRef.current) {
      modalVideoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const handleFullscreen = () => {
    if (modalVideoRef.current) {
      if (modalVideoRef.current.requestFullscreen) {
        modalVideoRef.current.requestFullscreen();
      } else if ((modalVideoRef.current as any).webkitRequestFullscreen) {
        (modalVideoRef.current as any).webkitRequestFullscreen();
      } else if ((modalVideoRef.current as any).msRequestFullscreen) {
        (modalVideoRef.current as any).msRequestFullscreen();
      }
    }
  };

  const formatTime = (time: number) => {
    const mins = Math.floor(time / 60);
    const secs = Math.floor(time % 60);
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <>
      <div className="grid" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', gap: '24px' }}>
        {videos.map((item, i) => {
          return (
            <ScrollReveal direction="up" delay={(i % 3) * 100} key={item.id}>
              <article 
                className="hover-lift video-gallery-card" 
                style={{ 
                  cursor: 'pointer',
                  overflow: 'hidden',
                  background: '#000',
                  border: '1px solid var(--border2)',
                  borderRadius: '16px',
                  aspectRatio: '16/9',
                  position: 'relative',
                  boxShadow: '0 4px 20px rgba(0,0,0,0.3)'
                }}
                onClick={() => handleOpenModal(item)}
              >
                {item.url ? (
                  <video 
                    src={item.url} 
                    muted 
                    loop 
                    playsInline
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                    style={{ width: "100%", height: '100%', objectFit: 'cover', display: 'block', transition: 'transform 0.5s ease' }} 
                  /> 
                ) : (
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', color: 'var(--muted)' }}>
                    No video available
                  </div>
                )}
                
                {/* Sleek Minimalist Hover Overlay */}
                <div 
                  className="gallery-overlay"
                  style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0) 60%)',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'flex-end',
                    padding: '20px',
                    opacity: 0,
                    transition: 'opacity 0.3s ease',
                    pointerEvents: 'none'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#fff' }}>
                    <Play size={16} fill="#fff" />
                    <span style={{ fontSize: '13px', fontWeight: 600 }}>Hover to Preview / Click to Play</span>
                  </div>
                </div>
              </article>
            </ScrollReveal>
          );
        })}
      </div>

      {/* GORGEOUS VIDEO MODAL DETAILED POPUP */}
      {activeVideo && (
        <div 
          style={{ 
            position: 'fixed', 
            inset: 0, 
            zIndex: 3000, 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center', 
            padding: '20px', 
            background: 'rgba(0,0,0,0.92)', 
            backdropFilter: 'blur(16px)', 
            animation: 'fadeIn 0.3s ease-out' 
          }} 
          onClick={handleCloseModal}
        >
          <div 
            className="glass-card" 
            style={{ 
              width: '100%', 
              maxWidth: '900px', 
              borderRadius: '24px', 
              overflow: 'hidden', 
              boxShadow: '0 25px 60px rgba(139, 92, 246, 0.25)', 
              background: 'rgba(20, 20, 25, 0.95)',
              border: '1px solid var(--border2)',
              animation: 'scaleIn 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)'
            }} 
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '24px 32px', borderBottom: '1px solid var(--border2)' }}>
              <div>
                <span style={{ fontSize: '11px', fontWeight: 800, color: 'var(--accent)', textTransform: 'uppercase', letterSpacing: '2px', display: 'inline-block', background: 'var(--accent-glow)', padding: '4px 10px', borderRadius: '4px', marginBottom: '8px' }}>
                  Now Playing
                </span>
                <h2 style={{ fontSize: '26px', margin: 0, fontWeight: 900, color: '#ffffff' }}>{activeVideo.title}</h2>
              </div>
              <button 
                onClick={handleCloseModal}
                style={{
                  background: 'none',
                  border: 'none',
                  color: 'rgba(255, 255, 255, 0.8)',
                  width: '44px',
                  height: '44px',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  borderWidth: '1px',
                  borderColor: 'var(--border2)'
                }}
                onMouseEnter={(e) => (e.currentTarget.style.background = 'var(--accent-glow)')}
                onMouseLeave={(e) => (e.currentTarget.style.background = 'none')}
              >
                <X size={20} />
              </button>
            </div>

            {/* Video Container */}
            <div style={{ position: 'relative', width: '100%', aspectRatio: '16/9', background: '#000' }}>
              <video 
                ref={modalVideoRef}
                src={activeVideo.url} 
                autoPlay
                onTimeUpdate={handleTimeUpdate}
                onLoadedMetadata={handleLoadedMetadata}
                style={{ width: '100%', height: '100%', objectFit: 'contain' }}
              />

              {/* Central Large Play/Pause Toggle Indicator */}
              {!isPlaying && (
                <div 
                  onClick={togglePlayModal}
                  style={{
                    position: 'absolute',
                    inset: 0,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    background: 'rgba(0,0,0,0.4)',
                    cursor: 'pointer'
                  }}
                >
                  <span style={{
                    width: '72px',
                    height: '72px',
                    borderRadius: '50%',
                    background: 'rgba(139, 92, 246, 0.95)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#fff',
                    boxShadow: '0 8px 24px rgba(139, 92, 246, 0.5)'
                  }}>
                    <Play size={32} style={{ marginLeft: '4px' }} />
                  </span>
                </div>
              )}
            </div>

            {/* Premium Video Controls Bar & Running Bar */}
            <div style={{ background: '#0f0f12', padding: '16px 28px', borderBottom: '1px solid var(--border2)' }}>
              {/* Custom Running Bar */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px', width: '100%' }}>
                <span style={{ fontSize: '12px', color: 'var(--muted)', width: '40px', textAlign: 'right' }}>
                  {formatTime(currentTime)}
                </span>
                
                <input 
                  type="range" 
                  min={0} 
                  max={duration || 100} 
                  value={currentTime} 
                  onChange={handleSeek}
                  style={{
                    flex: 1,
                    height: '6px',
                    borderRadius: '3px',
                    background: 'rgba(255,255,255,0.1)',
                    outline: 'none',
                    cursor: 'pointer',
                    WebkitAppearance: 'none'
                  }}
                  className="seek-slider"
                />

                <span style={{ fontSize: '12px', color: 'var(--muted)', width: '40px' }}>
                  {formatTime(duration)}
                </span>
              </div>

              {/* Control Buttons */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '16px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                  <button 
                    onClick={togglePlayModal}
                    style={{ background: 'none', border: 'none', color: '#fff', cursor: 'pointer' }}
                    title={isPlaying ? "Pause" : "Play"}
                  >
                    {isPlaying ? <Pause size={22} /> : <Play size={22} />}
                  </button>

                  <button 
                    onClick={toggleMuteModal}
                    style={{ background: 'none', border: 'none', color: '#fff', cursor: 'pointer' }}
                    title={isMuted ? "Unmute" : "Mute"}
                  >
                    {isMuted ? <VolumeX size={22} /> : <Volume2 size={22} />}
                  </button>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                  <button 
                    onClick={() => toggleLove(activeVideo.id)}
                    style={{
                      background: 'none',
                      border: 'none',
                      color: lovedIds.includes(activeVideo.id) ? '#ef4444' : 'rgba(255, 255, 255, 0.6)',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      fontSize: '14px',
                      fontWeight: 600,
                      transition: 'all 0.2s ease'
                    }}
                  >
                    <Heart size={20} fill={lovedIds.includes(activeVideo.id) ? '#ef4444' : 'none'} />
                    <span>{lovedIds.includes(activeVideo.id) ? 'Loved!' : 'Love It'}</span>
                  </button>

                  <button 
                    onClick={handleFullscreen}
                    style={{ background: 'none', border: 'none', color: '#fff', cursor: 'pointer' }}
                    title="Fullscreen"
                  >
                    <Maximize size={22} />
                  </button>
                </div>
              </div>
            </div>

            {/* Description Area */}
            <div style={{ padding: '28px 32px 36px', background: 'rgba(25, 25, 30, 0.4)' }}>
              <h4 style={{ margin: '0 0 10px 0', fontSize: '15px', color: 'rgba(255, 255, 255, 0.5)', textTransform: 'uppercase', letterSpacing: '1px' }}>About Performance</h4>
              <p style={{ margin: 0, color: 'rgba(255, 255, 255, 0.8)', fontSize: '15px', lineHeight: 1.7 }}>
                {activeVideo.description}
              </p>
            </div>
          </div>
        </div>
      )}

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes scaleIn {
          from { transform: scale(0.95); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }
        .seek-slider::-webkit-slider-thumb {
          -webkit-appearance: none;
          width: 14px;
          height: 14px;
          border-radius: 50%;
          background: var(--accent);
          cursor: pointer;
          box-shadow: 0 0 8px var(--accent);
          transition: transform 0.1s ease;
        }
        .seek-slider::-webkit-slider-thumb:hover {
          transform: scale(1.2);
        }
        .video-gallery-card:hover .gallery-overlay {
          opacity: 1 !important;
        }
        .video-gallery-card:hover video {
          transform: scale(1.05);
        }
      `}</style>
    </>
  );
}
