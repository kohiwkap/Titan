"use client";

import { useEffect, useRef, useState } from "react";

// ใส่ YouTube Video ID ตรงนี้ เช่น ตัวอักษรหลัง ?v= ในลิงก์ YouTube
export const MUSIC_CONFIG = {
  videoId: "JtkIh-MQjvc",
  title: "TITAN radio",
  artist: "Your personal soundtrack",
  additionalVideoIds: [] as string[],
};

type Player = {
  playVideo(): void;
  pauseVideo(): void;
  seekTo(seconds: number, allowSeekAhead: boolean): void;
  getCurrentTime(): number;
  getDuration(): number;
  getPlayerState(): number;
  cuePlaylist(options: { playlist: string[]; index: number }): void;
  nextVideo(): void;
  previousVideo(): void;
  setShuffle(enabled: boolean): void;
  setLoop(enabled: boolean): void;
  destroy(): void;
};
type YouTubeAPI = {
  Player: new (element: HTMLElement, options: {
    width: number; height: number; videoId: string;
    playerVars: Record<string, number | string>;
    events: {
      onReady(event: { target: Player }): void;
      onStateChange(event: { data: number }): void;
      onError(): void;
      onAutoplayBlocked(): void;
    };
  }) => Player;
};
declare global {
  interface Window {
    YT?: YouTubeAPI;
    onYouTubeIframeAPIReady?: () => void;
  }
}
let apiPromise: Promise<YouTubeAPI> | undefined;
function loadAPI() {
  if (window.YT?.Player) return Promise.resolve(window.YT);
  if (apiPromise) return apiPromise;
  apiPromise = new Promise<YouTubeAPI>((resolve, reject) => {
    const previous = window.onYouTubeIframeAPIReady;
    const timer = window.setTimeout(() => reject(new Error("YouTube timeout")), 15000);
    window.onYouTubeIframeAPIReady = () => {
      window.clearTimeout(timer);
      previous?.();
      if (window.YT) resolve(window.YT);
    };
    const script = document.createElement("script");
    script.src = "https://www.youtube.com/iframe_api";
    script.async = true;
    script.onerror = () => {
      window.clearTimeout(timer);
      reject(new Error("YouTube unavailable"));
    };
    document.head.appendChild(script);
  });
  return apiPromise;
}
function time(value: number) {
  const seconds = Math.max(0, Math.floor(value || 0));
  return `${Math.floor(seconds / 60)}:${String(seconds % 60).padStart(2, "0")}`;
}
function Icon({ name }: { name: "play" | "pause" | "previous" | "next" | "shuffle" | "repeat" }) {
  const paths = {
    play: "m9 5 11 7-11 7Z",
    pause: "M8 5v14M16 5v14",
    previous: "M5 5v14m14-14L8 12l11 7Z",
    next: "M19 5v14M5 5l11 7-11 7Z",
    shuffle: "M3 6h3c5 0 7 12 12 12h3m-4-4 4 4-4 4M3 18h3c2 0 3-2 4-4m4-4c1-2 2-4 4-4h3m-4-4 4 4-4 4",
    repeat: "m17 2 4 4-4 4M3 11V9a3 3 0 0 1 3-3h15M7 22l-4-4 4-4m14-1v2a3 3 0 0 1-3 3H3",
  };
  return <svg width="19" height="19" viewBox="0 0 24 24" fill={name === "play" ? "currentColor" : "none"} stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d={paths[name]} /></svg>;
}
export function MusicPlayer({ lang }: { lang: "en" | "th" }) {
  const mount = useRef<HTMLDivElement>(null);
  const player = useRef<Player | null>(null);
  const [ready, setReady] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [position, setPosition] = useState(0);
  const [duration, setDuration] = useState(0);
  const [shuffle, setShuffle] = useState(false);
  const [repeat, setRepeat] = useState(false);
  const [error, setError] = useState<"load" | "video" | "blocked" | null>(null);
  const playRequested = useRef(false);
  const initialAutoplayPending = useRef(true);
  const configured = /^[\w-]{11}$/.test(MUSIC_CONFIG.videoId);
  const playlist = [MUSIC_CONFIG.videoId, ...MUSIC_CONFIG.additionalVideoIds].filter(id => /^[\w-]{11}$/.test(id));
  const multiple = playlist.length > 1;

  useEffect(() => {
    if (!configured || !mount.current) return;
    let disposed = false;
    let instance: Player | undefined;
    let interval: ReturnType<typeof setInterval> | undefined;
    const host = mount.current;
    const target = document.createElement("div");
    host.appendChild(target);
    const timeout = window.setTimeout(() => { if (!disposed) setError("load"); }, 20000);
    loadAPI().then(api => {
      if (disposed) return;
      instance = new api.Player(target, {
        width: 200, height: 200, videoId: MUSIC_CONFIG.videoId,
        playerVars: { autoplay: 0, controls: 0, playsinline: 1, origin: window.location.origin },
        events: {
          onReady: ({ target: yt }) => {
            if (disposed) return;
            window.clearTimeout(timeout);
            player.current = yt;
            yt.cuePlaylist({ playlist: [MUSIC_CONFIG.videoId, ...MUSIC_CONFIG.additionalVideoIds].filter(id => /^[\w-]{11}$/.test(id)), index: 0 });
            setReady(true);
            setError(null);
            // Try autoplay when the player is ready; browsers may require a user gesture.
            yt.playVideo();
            interval = setInterval(() => {
              if (disposed) return;
              setPosition(yt.getCurrentTime() || 0);
              setDuration(yt.getDuration() || 0);
            }, 500);
          },
          onStateChange: ({ data }) => {
            if (disposed) return;
            setPlaying(data === 1);
            if (data === 1) {
              initialAutoplayPending.current = false;
              setError(null);
              playRequested.current = false;
            }
          },
          onError: () => { if (!disposed) { setError("video"); setPlaying(false); } },
          onAutoplayBlocked: () => { if (!disposed) { setError("blocked"); setPlaying(false); } },
        },
      });
    }).catch(() => { if (!disposed) setError("load"); });
    return () => {
      disposed = true;
      window.clearTimeout(timeout);
      if (interval) clearInterval(interval);
      instance?.destroy();
      player.current = null;
      host.replaceChildren();
    };
  }, [configured]);

  useEffect(() => {
    if (!ready || playing || !initialAutoplayPending.current) return;
    const resumePlayback = () => {
      if (!player.current || playRequested.current || !initialAutoplayPending.current) return;
      playRequested.current = true;
      player.current.playVideo();
      window.setTimeout(() => { playRequested.current = false; }, 1500);
    };
    window.addEventListener("pointerdown", resumePlayback, { once: true, capture: true });
    window.addEventListener("keydown", resumePlayback, { once: true, capture: true });
    return () => {
      window.removeEventListener("pointerdown", resumePlayback, true);
      window.removeEventListener("keydown", resumePlayback, true);
    };
  }, [ready, playing]);
  const message = !configured
    ? (lang === "th" ? "ยังไม่ได้เลือกเพลง" : "No track selected")
    : error === "blocked"
      ? (lang === "th" ? "กด Play อีกครั้งเพื่อเริ่มเพลง" : "Press play again to start")
      : error
        ? (lang === "th" ? "โหลดเพลงไม่ได้ กรุณาลองรีเฟรช" : "Track unavailable. Please refresh.")
        : !ready
          ? (lang === "th" ? "กำลังโหลดเพลง…" : "Loading track…")
          : playing ? (lang === "th" ? "กำลังเล่น · YouTube" : "Playing · YouTube") : (lang === "th" ? "กด Play เพื่อฟังเพลง" : "Press play to listen");

  return (
    <aside className="music-player" aria-label={lang === "th" ? "เครื่องเล่นเพลง" : "Music player"}>
      <div className="music-topline"><span>THE SOUNDTRACK</span><span className={playing ? "music-live is-playing" : "music-live"}><i /><i /><i /><i /></span></div>
      <div className="music-track">
        <div className={playing ? "record is-spinning" : "record"} aria-hidden="true"><span /></div>
        <div><strong>{MUSIC_CONFIG.title}</strong><p>{MUSIC_CONFIG.artist}</p></div>
      </div>
      <div className="music-timeline">
        <input type="range" min={0} max={duration || 1} step={0.1} value={Math.min(position, duration || 1)} disabled={!ready || !duration} aria-label={lang === "th" ? "ตำแหน่งเพลง" : "Seek track"} aria-valuetext={time(position)}
          style={{ background: `linear-gradient(to right, #eee ${duration ? position / duration * 100 : 0}%, #ffffff20 0%)` }}
          onChange={event => { const value = Number(event.target.value); player.current?.seekTo(value, true); setPosition(value); }} />
        <div><span>{time(position)}</span><span>{time(duration)}</span></div>
      </div>
      <div className="music-controls">
        <button disabled={!ready || !multiple} title={multiple ? "Shuffle" : "Shuffle requires multiple tracks"} aria-label="Shuffle" aria-pressed={shuffle} onClick={() => { player.current?.setShuffle(!shuffle); setShuffle(!shuffle); }}><Icon name="shuffle" /></button>
        <button disabled={!ready} aria-label="Previous track" onClick={() => { if (multiple && position < 3) player.current?.previousVideo(); else player.current?.seekTo(0, true); }}><Icon name="previous" /></button>
        <button className="music-play" disabled={!ready} aria-label={playing ? "Pause" : "Play"} onClick={() => {
          initialAutoplayPending.current = false;
          if (player.current?.getPlayerState() === 1) player.current.pauseVideo();
          else player.current?.playVideo();
        }}><Icon name={playing ? "pause" : "play"} /></button>
        <button disabled={!ready || !multiple} aria-label="Next track" onClick={() => player.current?.nextVideo()}><Icon name="next" /></button>
        <button disabled={!ready} aria-label="Repeat playlist" aria-pressed={repeat} onClick={() => { player.current?.setLoop(!repeat); setRepeat(!repeat); }}><Icon name="repeat" /></button>
      </div>
      <p className="music-status" role="status">{message}</p>
      <div ref={mount} className="youtube-audio-host" aria-hidden="true" inert />
    </aside>
  );
}
