import { useEffect, useRef, useState } from "react";
import { Volume2, VolumeX, Pause, Play, ChevronDown } from "lucide-react";
import { useReducedMotion } from "motion/react";
import { videoSource } from "../data";
// Preservation adapter for the original ambientVideo and floating expandable sound control.
export function VideoSound() {
  const ref = useRef<HTMLVideoElement>(null);
  const [expanded, setExpanded] = useState(false),
    [muted, setMuted] = useState(true),
    [playing, setPlaying] = useState(false),
    [failed, setFailed] = useState(false);
  const reduced = useReducedMotion();
  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    v.volume = 0.65;
    if (reduced) {
      v.pause();
    } else {
      void v.play().catch(() => setPlaying(false));
    }
  }, [reduced]);
  async function sound() {
    const v = ref.current;
    if (!v) return;
    v.muted = !v.muted;
    setMuted(v.muted);
    if (v.paused) {
      try {
        await v.play();
      } catch {
        v.muted = true;
        setMuted(true);
      }
    }
  }
  function playback() {
    const v = ref.current;
    if (!v) return;
    if (v.paused) {
      void v.play().catch(() => setPlaying(false));
    } else v.pause();
  }
  return (
    <>
      <div className="background-video" aria-hidden="true">
        <video
          id="ambientVideo"
          ref={ref}
          autoPlay={!reduced}
          muted
          loop
          playsInline
          preload="metadata"
          poster="/images/video-poster.webp"
          onPlay={() => setPlaying(true)}
          onPause={() => setPlaying(false)}
          onError={() => setFailed(true)}
        >
          <source src="/media/devnazu-original.mp4" type="video/mp4" />
          <source src={videoSource} type="video/mp4" />
        </video>
      </div>
      <div className={"sound-dock " + (expanded ? "expanded" : "")}>
        <button
          className="sound-main"
          id="expandSound"
          aria-label={
            expanded
              ? "Collapse video sound controls"
              : "Expand video sound controls"
          }
          aria-expanded={expanded}
          aria-controls="sound-panel"
          onClick={() => setExpanded(!expanded)}
        >
          {muted ? <VolumeX size={17} /> : <Volume2 size={17} />}
          <span>Sound</span>
          <ChevronDown size={13} />
        </button>
        {expanded && (
          <div id="sound-panel" className="sound-panel">
            <button
              onClick={sound}
              disabled={failed}
              aria-pressed={!muted}
              aria-label={
                muted
                  ? "Enable background video sound"
                  : "Mute background video"
              }
            >
              {muted ? <VolumeX size={17} /> : <Volume2 size={17} />}
              <span>
                {failed
                  ? "Video unavailable"
                  : muted
                    ? "Turn sound on"
                    : "Sound on"}
              </span>
            </button>
            <button
              onClick={playback}
              disabled={failed}
              aria-label={
                playing ? "Pause background video" : "Play background video"
              }
            >
              {playing ? <Pause size={16} /> : <Play size={16} />}
            </button>
          </div>
        )}
      </div>
    </>
  );
}
