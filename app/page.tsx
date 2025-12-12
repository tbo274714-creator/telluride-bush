// app/page.tsx
"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

// --- START: DATA & UTILITIES ---

function decodeHtml(html: string) {
  const txt = document.createElement("textarea");
  txt.innerHTML = html;
  return txt.value;
}

// Moves massive base64 strings out of the JSX for cleaner code
const GRUNGE_TEXTURE =
  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAMAAAAp4XiDAAAAUVBMVEWFhYWDg4N3d3dtbW17e3t1dXV0dHR4eHh2dnZ6enp8fHx5eXl+fn5ycHJzc3N/f39xcXFwcHBzc3N0dHR2dnZ4eHh6enp8fHx+fn5/f3+Hh4eKioqNjY2QkJCUlJSYmJicnJygmJijmZikmpqmnJynnZ2ooaGpo6OqpKSrpqa9u7v///8rKysAAAAPnRSTlMABgcICQ4PEBESExQVFhcYGRscHR8gISIkJSYnKCkqKy4vMDIzNDY3ODw9Pj9AQUJDRUdJSkxNT1BSU1RYWVtdYWJjZGVnaGlqa21ucXZ4en1+gYOGiImKjY6RkpWXmZqfoaOlpqeqra+wsbK0tba4u72/wcPExcbIycvMzs/R0tTY2dzd3t/h4uTm6Orr7e7w8vP19vf5+vv9/v4AfjBvAAAAAXRSTlMAnZg8kQAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB+UFDA0lE5yXnJMAAAAGdEVYdENvbW1lbnQAa6e7FwAAAlJJREFUeNq1lsWO2zAMRHWp85Z6//9v302C1k4c99A6i02dI4m2RImH04n+d6bT6U+hH9s3/bA+7P5Bv2z/oV+3f9Av2+80/bJ90y/b77R/2C/rQ2n7c/umP7bfaX9s/6A/tofav9u30+k32z9o/6DfaX9u/6H9u32n/bf9R9r/2/5L+/fP7Tvtf+0/tN/7H9o/6HfaP9t/aP9v32n/bf+R9v/2H9p/2X+n/bf990/tn+0/tH+376dDaf9p/6X9+/u2/4/9h/Zf9l+n03/bf6P9p/2H9r+3/532H/bfaf9t/23/bf+V9j+3/9L+5/Yf2n/Yf6eN9l9p/2v/rf0/7D+0/7b/SPtv+4+0/7b/0v7ntm+nQ2n/a/91Ov1u+2/7b/sv7b/sv9L+1/5L+/f37X+n/dP+Q/tv+4+0/7b/tv92Ov1N+w/tH/Q77X9u/5F2tH/Q77R/t/+Q9r/232n/bf+V9j+3/9L+5/Yf2n/oV9p/2P9K+2f7H2n/bf+R9t/2X9r/2/5b+/f3bf+h/df9X9p/2H/bf6f9p/1X2v9c/6X9x/132r/b/yvtv+w/tP+1/9D+x/4b7b/tP7T/uf2H9t/2H2n/bf+V9j+3/9L+/X37f6f9h/Z7/4H2H/bf9t/2306n32z/lfa/9t/av9t32n/bf6T9v/2X9v/2X2n/c/u9/0D7D/vvT6H9h/2H9t/2H2n/bf+l/b/9t/a/9p32n/Zfaf9r/6X9//2H9k/6lfa/9v+d9u/2H9q/23+k/b/9l/a/t/9K+1/7b/vv+5/a/9t/aP9l/6H9h/1H2n/bf6T9r/1/2j/od9p/239r//7/fX8Bl008u883bOQAAAAASUVORK5CYII=";
const DOT_TEXTURE =
  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAIAAAACCAYAAABytg0kAAAAAXNSR0IArs4c6QAAABNJREFUGFdjZGD4/5+BgYFRgAEAMEEB/6j3MgkAAAAASUVORK5CYII=";

const MERCH_URL =
  "https://store.barstoolsports.com/search?q=bush+gaming&_pos=2&_psq=bush&_ss=e&_v=1.0";
const SHOVEL_URL = "#"; // secret shovel link, only shown in terminal
const YOUTUBE_CHANNEL_URL = "https://www.youtube.com/@tBushGaming";
const SECRET_PASSCODE = "bounceonitking";

type Video = {
  id: string;
  title: string;
  desc: string;
  thumbnail?: string;
  url: string;
};

const roster = [
  {
    name: "TJHaly",
    socials: {
      twitch: "https://www.twitch.tv/tjhaly",
      twitter: "https://x.com/TJHaLy",
    },
  },
  {
    name: "Prolute",
    socials: {
      twitch: "https://www.twitch.tv/prolute_",
      twitter: "https://x.com/ProluteB",
    },
  },
  {
    name: "Capsidal",
    socials: {
      twitch: "https://www.twitch.tv/capsidal",
      twitter: "https://x.com/Capsidal_",
    },
  },
  {
    name: "Spart",
    socials: {
      twitch: "https://www.twitch.tv/spart",
      twitter: "https://x.com/itsspart",
    },
  },
];

const owners = [
  {
    name: "Dave Portnoy",
    percent: "100%",
    socials: {
      twitter: "https://x.com/stoolpresidente",
    },
  },
  {
    name: "Austin Jenkins",
    percent: "0% (Controlling Stake)",
    socials: {
      twitter: "https://x.com/AustinJenkins07",
    },
  },
  {
    name: "Harry Settel",
    percent: "0%",
    socials: {
      twitter: "https://x.com/lilsamsquanch66",
    },
  },
  {
    name: "Connor Mook",
    percent: "0%",
    socials: {
      twitter: "https://x.com/ConnorMook_",
    },
  },
  {
    name: "Jersey Jerry",
    percent: "0%",
    socials: {
      twitter: "https://x.com/Jerrythekid21",
    },
  },
];

const upcomingMatches = [
  {
    date: "Dec 13, 2025",
    event: "Challengers Cup 2 – Day 1",
    link: "https://www.faceit.com/en/championship/4b25e9ad-7b83-4587-9b46-a28ecde1ea33/Call%20of%20Duty%20NA%20Challengers%20Cup%202%20Day%201/standings/column",
  },
  {
    date: "Dec 14, 2025",
    event: "Challengers Cup 2 – Day 2",
    link: "https://www.faceit.com/en/championship/4b25e9ad-7b83-4587-9b46-a28ecde1ea33/Call%20of%20Duty%20NA%20Challengers%20Cup%202%20Day%201/standings/column",
  },
];

const pastMatches = [
  {
    date: "Dec 6, 2025",
    event: "Challengers Cup 1",
    result: "1st Place",
    vod: "https://www.youtube.com/watch?v=1rYBmm4qyRs",
  },
  {
    date: "Nov 22, 2025",
    event: "Monster Energy Launch Invitational 2026",
    result: "13th Place",
  },
];

// --- UI HELPERS ---

const SectionDivider = ({ numeral }: { numeral: string }) => (
  <div className="mt-3 mb-6 flex items-center gap-3 text-[10px] font-mono uppercase tracking-[0.3em] text-[#3ab7aa]/60">
    <span className="h-px flex-1 bg-gradient-to-r from-transparent via-[#3ab7aa]/50 to-transparent" />
    <span>{numeral}</span>
    <span className="h-px flex-1 bg-gradient-to-r from-transparent via-[#3ab7aa]/50 to-transparent" />
  </div>
);

const TacticalHeader = ({
  title,
  subtitle,
}: {
  title: string;
  subtitle?: string;
}) => (
  <div className="border-b-2 border-[#1d4f52]/60 pb-4 relative">
    <div className="absolute bottom-0 left-0 w-2 h-2 bg-[#f26a1b]/70"></div>
    <div className="absolute bottom-0 right-0 w-2 h-2 bg-[#f26a1b]/70"></div>
    <div className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-[#3ab7aa] mb-2 font-mono">
      <span>[ :: ]</span>
      <span>{subtitle || "INTEL"}</span>
    </div>
    <h2 className="text-3xl font-black text-white tracking-tight uppercase [text-shadow:2px_2px_0px_#000,4px_4px_0px_#7c3813]">
      {title}
    </h2>
  </div>
);

type Owner = (typeof owners)[number];

const OwnerCard = ({ owner, index }: { owner: Owner; index: number }) => (
  <div className="group relative bg-[#171b20]/70 border-2 border-[#242833] p-5 transition-all duration-300 hover:border-[#f26a1b] hover:bg-[#171b20] clip-path-polygon-[0_0,100%_0,100%_90%,90%_100%,0_100%]">
    <div className="absolute top-0 right-0 bg-zinc-800 text-zinc-500 font-mono text-[10px] px-2 py-0.5 border-l border-b border-zinc-700 group-hover:border-[#f26a1b] group-hover:text-[#ff8a3d]">
      {index.toString().padStart(2, "0")}
    </div>

    <p className="text-lg font-black text-white uppercase">{owner.name}</p>
    <div className="my-2 h-px w-full bg-gradient-to-r from-[#f26a1b]/70 to-transparent"></div>
    <p className="text-xs text-[#3ab7aa] uppercase tracking-wider font-mono font-bold">
      Stake: {owner.percent}
    </p>
    {owner.socials.twitter && (
      <a
        href={owner.socials.twitter}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-4 inline-block text-xs text-zinc-400 font-mono hover:text-[#ff8a3d] transition-colors"
      >
        View on X
      </a>
    )}
  </div>
);

export default function Home() {
  const [videos, setVideos] = useState<Video[]>([]);
  const nextMatch = upcomingMatches[0];
const base = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

  // Secret terminal state
  const [terminalOpen, setTerminalOpen] = useState(false);
  const [terminalStage, setTerminalStage] = useState<"loading" | "ready">(
    "loading"
  );
  const [passcode, setPasscode] = useState("");
  const [passcodeError, setPasscodeError] = useState("");

  const openTerminal = () => {
    setTerminalOpen(true);
    setTerminalStage("loading");
    // fake boot time
    setTimeout(() => {
      setTerminalStage("ready");
    }, 1500);
  };

  const closeTerminal = () => {
    setTerminalOpen(false);
  };

  const handlePasscodeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cleaned = passcode.trim().toLowerCase();
    if (cleaned === SECRET_PASSCODE.toLowerCase()) {
      setPasscode("");
      setPasscodeError("");
      openTerminal();
    } else if (cleaned.length > 0) {
      setPasscodeError("ACCESS DENIED");
      setTimeout(() => setPasscodeError(""), 1500);
    }
  };

  // ESC closes terminal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setTerminalOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  useEffect(() => {
  setVideos([
    {
      id: "cup1",
      title: "Challengers Cup 1 – Grand Finals",
      desc: "",
      url: "https://www.youtube.com/watch?v=1rYBmm4qyRs",
      thumbnail: "https://i.ytimg.com/vi/1rYBmm4qyRs/hqdefault.jpg",
    },
    {
      id: "vid2",
      title: "Best Plays AND Funniest Moments From Championship Sunday",
      desc: "",
      url: "https://youtu.be/qcE3z5Z_HwY?si=KiUZ8uNIUmjdQYjO",
      thumbnail: "https://i.ytimg.com/vi/qcE3z5Z_HwY/hqdefault.jpg",
    },
    {
      id: "vid3",
      title: "Best of Scrap on the Bush Gaming Watch Party",
      desc: "",
      url: "https://youtu.be/hkKloT38XA4?si=Y5xHE7uL8IR-j7gV",
      thumbnail: "https://i.ytimg.com/vi/hkKloT38XA4/hqdefault.jpg",
    },
    {
      id: "vid4",
      title: "Best of Challenger Cup Day 1 - Bush Gaming Highlights",
      desc: "",
      url: "https://youtu.be/GaL_Pzr-Mg8?si=9tihPXfZptx6UpLq",
      thumbnail: "https://i.ytimg.com/vi/GaL_Pzr-Mg8/hqdefault.jpg",
    },
  ]);
}, []);



  // owners in org-chart order
  const dave = owners.find((o) => o.name.startsWith("Dave")) as Owner;
  const austin = owners.find((o) => o.name.startsWith("Austin")) as Owner;
  const jerry = owners.find((o) => o.name.toLowerCase().includes("jerry")) as Owner;
  const mook = owners.find((o) => o.name.toLowerCase().includes("mook")) as Owner;
  const harry = owners.find((o) => o.name.toLowerCase().includes("harry")) as Owner;

  return (
    <main className="min-h-screen bg-[#040507] text-neutral-100 selection:bg-[#f26a1b]/30 relative font-sans">
      {/* --- GRITTY BACKGROUND LAYERS --- */}
      <div className="pointer-events-none fixed inset-0 -z-30 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#15181e] via-[#050608] to-black" />
      <div className="pointer-events-none fixed inset-0 -z-20 mix-blend-overlay opacity-20 [background:repeating-linear-gradient(0deg,rgba(0,0,0,0.2)0px,rgba(0,0,0,0.2)1px,transparent_1px,transparent_4px)]" />
      <div className="pointer-events-none fixed inset-0 -z-10 opacity-40 mix-blend-soft-light [background-image:radial-gradient(circle_at_20%_30%,rgba(50,50,50,0.4)0%,transparent_50%),radial-gradient(circle_at_80%_70%,rgba(30,30,30,0.4)0%,transparent_50%),radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.05)0%,transparent_60%)] filter contrast-150" />

      {/* HEADER */}
      <header className="sticky top-0 z-20 bg-black/90 backdrop-blur-md border-b-[3px] border-[#7c3813]/90 shadow-[0_10px_20px_-10px_rgba(0,0,0,1)]">
        <div className="mx-auto flex max-w-6xl w-full items-center justify-between px-4 py-3">
          {/* LOGO */}
          <div
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="cursor-pointer flex items-center gap-4 group"
          >
          <div className="relative h-11 w-11 flex items-center justify-center rounded-sm">
 <img
  src={`${base}/logo-bush.png`}
  alt="Telluride Bush Logo"
  width={36}
  height={36}
  className="object-contain filter invert"
/>
</div>
            <div className="flex flex-col leading-none font-mono">
              <span className="text-xl font-black tracking-[0.2em] uppercase text-white [text-shadow:1px_1px_0_#000,2px_2px_0_#7c3813]">
                BUSH
              </span>
              <span className="text-[10px] text-[#3ab7aa] tracking-[0.3em] uppercase">
                [ STATUS: UNSHAVEN ]
              </span>
            </div>
          </div>

          {/* NAVIGATION */}
          <nav className="hidden md:flex gap-6 text-xs items-center font-bold uppercase tracking-widest font-mono">
          {[
  ["Structure", "#owners"],
  ["Roster", "#roster"],
  ["Schedule", "#schedule"],
  ["Live", "#twitch"],
].map(([label, link]) => (

              <a
                key={label}
                href={link}
                className="relative text-zinc-400 hover:text-[#ff8a3d] transition group py-2 glitch-link"
                data-text={label}
              >
                <span className="group-hover:before:content-['['] group-hover:after:content-[']'] before:text-[#3ab7aa] after:text-[#3ab7aa] before:mr-1 after:ml-1 before:opacity-0 group-hover:before:opacity-100 after:opacity-0 group-hover:after:opacity-100 transition-all duration-75">
                  {label}
                </span>
              </a>
            ))}

            <div className="flex gap-2 ml-4">
              <a
                href={MERCH_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="border-2 border-[#f26a1b] bg-[#f26a1b]/10 px-3 py-2 text-[10px] font-black uppercase text-[#ff8a3d] hover:bg-[#f26a1b] hover:text-black transition-all shadow-[0_0_18px_rgba(242,106,27,0.35)] glitch-link"
                data-text="Merch"
              >
                Merch
              </a>
            </div>
          </nav>
        </div>
      </header>

      {/* MAIN CONTENT */}
      <div className="mx-auto max-w-6xl px-4 pb-24 pt-12 space-y-32">
        {/* HERO */}
        <section className="grid gap-12 md:grid-cols-[1.5fr,1fr] items-center relative">
          <div className="pointer-events-none absolute -top-24 -left-32 w-[60vw] h-[60vw] bg-[radial-gradient(circle_at_center,rgba(242,106,27,0.35),transparent_60%)] opacity-40 blur-3xl -z-10" />
          <div className="pointer-events-none absolute top-10 right-[-20vw] w-[50vw] h-[50vw] bg-[radial-gradient(circle_at_center,rgba(179,38,30,0.25),transparent_65%)] opacity-50 blur-3xl -z-10" />

          <div className="space-y-8 relative z-10">
            <div className="inline-flex items-center gap-3 border-2 border-dashed border-[#3ab7aa]/50 bg-black/50 px-4 py-2 text-xs uppercase tracking-[0.3em] text-[#3ab7aa] font-black font-mono">
              <span className="animate-pulse">///</span>
              <span>CDL Challengers Unit</span>
              <span>///</span>
            </div>

            <div>
              <h1 className="text-7xl sm:text-8xl md:text-9xl font-black text-white tracking-tighter leading-[0.85] uppercase">
                <span className="block text-transparent bg-clip-text bg-gradient-to-b from-[#ff8a3d] via-[#f26a1b] to-[#7c3813] [text-shadow:0px_0px_20px_rgba(242,106,27,0.3)]">
                  TELLURIDE
                </span>
                <span className="block [text-shadow:3px_3px_0px_#000,5px_5px_0px_#7c3813] relative">
                  BUSH
                  <span
                    className="pointer-events-none absolute inset-0 mix-blend-overlay opacity-50 bg-repeat"
                    style={{ backgroundImage: `url('${GRUNGE_TEXTURE}')` }}
                  />
                  <span className="pointer-events-none absolute inset-x-0 top-1/2 h-px bg-gradient-to-r from-transparent via-[#f26a1b]/60 to-transparent opacity-60 mix-blend-screen" />
                </span>
              </h1>
            </div>

            <div className="flex flex-wrap gap-4 pt-4">
              <a
                href="#schedule"
                className="group relative inline-flex items-center justify-center overflow-hidden bg-[#f26a1b] px-8 py-4 font-mono font-black uppercase tracking-widest text-black transition-all hover:bg-[#ff8a3d] clip-path-polygon-[10px_0,100%_0,100%_calc(100%-10px),calc(100%-10px)_100%,0_100%,0_10px] group-hover:[box-shadow:0_0_25px_rgba(242,106,27,0.35)] group-hover:-translate-y-[1px] glitch-link"
                data-text="View Match Schedule"
              >
                <span className="relative z-10 flex flex-col items-start gap-1">
                  <span className="text-sm sm:text-base">View Match Schedule</span>
                  <span className="text-[9px] opacity-80 tracking-[0.25em]">
                    MISSIONS
                  </span>
                </span>
                <div className="absolute inset-0 h-full w-full scale-y-0 bg-white/30 transition-transform duration-300 group-hover:scale-y-100 origin-bottom"></div>
              </a>
              <a
                href="#videos"
                className="group relative inline-flex items-center justify-center overflow-hidden border-2 border-[#3ab7aa]/70 bg-transparent px-8 py-4 font-mono font-black uppercase tracking-widest text-zinc-300 transition-all hover:border-[#f26a1b] hover:text-[#ff8a3d] clip-path-polygon-[10px_0,100%_0,100%_calc(100%-10px),calc(100%-10px)_100%,0_100%,0_10px] glitch-link"
                data-text="Watch Latest Videos"
              >
                <span className="relative z-10 flex flex-col items-start gap-1">
                  <span className="text-sm sm:text-base">Watch Latest Videos</span>
                  <span className="text-[9px] opacity-80 tracking-[0.25em]">
                    THEATER MODE
                  </span>
                </span>
              </a>
            </div>
          </div>

          <div className="relative z-10 bg-black/80 border-[3px] border-zinc-700 p-1 shadow-[0_0_30px_rgba(0,0,0,0.8)] clip-path-polygon-[20px_0,100%_0,100%_calc(100%-20px),calc(100%-20px)_100%,0_100%,0_20px]">
            <div className="border border-[#7c3813]/60 bg-zinc-900/80 p-6 relative">
              <div className="absolute top-1 left-1 w-1.5 h-1.5 bg-[#ff8a3d]"></div>
              <div className="absolute top-1 right-1 w-1.5 h-1.5 bg-[#ff8a3d]"></div>
              <div className="absolute bottom-1 left-1 w-1.5 h-1.5 bg-[#ff8a3d]"></div>
              <div className="absolute bottom-1 right-1 w-1.5 h-1.5 bg-[#ff8a3d]"></div>

              <div className="flex items-center gap-2 mb-4">
                <div className="h-2 w-2 bg-[#b3261e] rounded-full animate-ping absolute opacity-75"></div>
                <div className="h-2 w-2 bg-[#b3261e] rounded-full relative"></div>
                <p className="text-xs uppercase tracking-[0.25em] text-[#3ab7aa] font-black font-mono">
                  Next Match
                </p>
              </div>

              <div className="border-l-4 border-dotted border-[#3ab7aa]/70 pl-4 space-y-2">
                {nextMatch ? (
                  <>
                    <p className="text-sm text-zinc-400 font-mono uppercase">
                      Date: {nextMatch.date}
                    </p>
                    <p className="text-2xl font-black text-white leading-none uppercase [text-shadow:1px_1px_0_#000,2px_2px_0_#7c3813]">
                      {nextMatch.event}
                    </p>
                    <a
                      href={nextMatch.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block mt-4 bg-[#f26a1b]/10 border border-[#f26a1b]/70 px-4 py-1 text-xs text-[#ff8a3d] font-black uppercase tracking-wider hover:bg-[#f26a1b] hover:text-black transition-all"
                    >
                      Open Event Page →
                    </a>
                  </>
                ) : (
                  <p className="text-sm text-zinc-500 font-mono uppercase">
                    No upcoming matches
                  </p>
                )}
              </div>
            </div>
          </div>

          <div className="absolute top-1/2 right-0 -translate-y-1/2 translate-x-1/4 opacity-10 mix-blend-overlay pointer-events-none z-0">
            <img
  src={`${base}/logo-bush.png`}
  alt=""
  width={600}
  height={600}
  className="filter invert contrast-200 grayscale"
/>

          </div>
        </section>

        {/* OWNERS */}
        <section id="owners" className="space-y-12 scroll-mt-32">
          <TacticalHeader title="Bush Backers" subtitle="COMMAND STRUCTURE" />
          <SectionDivider numeral="I" />

          <div className="flex flex-col items-center gap-8 mt-4">
            <OwnerCard owner={dave} index={1} />
            <div className="w-px h-6 bg-[#242833]" />
            <OwnerCard owner={austin} index={2} />
            <div className="relative w-full max-w-md h-8 flex items-center justify-center">
              <div className="h-px w-full max-w-sm bg-[#242833]" />
              <div className="absolute -top-6 left-1/2 -translate-x-0.5 h-6 w-px bg-[#242833]" />
            </div>
            <div className="flex flex-wrap justify-center gap-6">
              <OwnerCard owner={jerry} index={3} />
              <OwnerCard owner={mook} index={4} />
              <OwnerCard owner={harry} index={5} />
            </div>
          </div>
        </section>

        {/* ROSTER */}
        <section id="roster" className="space-y-12 scroll-mt-32">
          <TacticalHeader title="Active Unit" subtitle="OPERATORS" />
          <SectionDivider numeral="II" />

          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-8">
            {roster.map((p, i) => (
              <div
                key={p.name}
                className="relative group bg-[#111318] border-[3px] border-[#242833] p-1 shadow-[inset_0_0_20px_rgba(0,0,0,1)] transition-all hover:border-[#7c3813]/70"
              >
                <div className="absolute top-1 left-1 w-1.5 h-1.5 rounded-full bg-zinc-700 border border-zinc-900 shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)]"></div>
                <div className="absolute top-1 right-1 w-1.5 h-1.5 rounded-full bg-zinc-700 border border-zinc-900 shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)]"></div>
                <div className="absolute bottom-1 left-1 w-1.5 h-1.5 rounded-full bg-zinc-700 border border-zinc-900 shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)]"></div>
                <div className="absolute bottom-1 right-1 w-1.5 h-1.5 rounded-full bg-zinc-700 border border-zinc-900 shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)]"></div>

                <div className="bg-zinc-900/50 p-6 text-center relative overflow-hidden">
                  <div className="absolute -top-2 -left-2 text-5xl font-black text-zinc-800/50 font-mono z-0 select-none group-hover:text-[#7c3813]/40 transition-colors">
                    O{i + 1}
                  </div>

                  <h3 className="relative z-10 text-2xl font-black text-white uppercase tracking-tight mb-2 [text-shadow:2px_2px_0_#000]">
                    {p.name}
                  </h3>
                  <div className="relative z-10 h-0.5 w-12 mx-auto bg-[#f26a1b] mb-3"></div>
                  <p className="relative z-10 text-xs text-[#3ab7aa] font-mono uppercase tracking-tight">
                  
                    <br />
                    Unshaven since November 2025
                  </p>

                  <div className="relative z-10 flex justify-center gap-4 mt-6 font-mono text-[10px] font-bold uppercase tracking-widest">
                    <a
                      href={p.socials.twitch}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="border border-zinc-700 px-2 py-1 text-zinc-400 hover:border-[#f26a1b] hover:text-[#ff8a3d] hover:bg-[#f26a1b]/10 transition-all"
                    >
                      Twitch
                    </a>
                    <a
                      href={p.socials.twitter}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="border border-zinc-700 px-2 py-1 text-zinc-400 hover:border-[#f26a1b] hover:text-[#ff8a3d] hover:bg-[#f26a1b]/10 transition-all"
                    >
                      X
                    </a>
                  </div>
                </div>
                <div
                  className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity bg-repeat"
                  style={{ backgroundImage: `url('${DOT_TEXTURE}')` }}
                />
              </div>
            ))}
          </div>
        </section>

        {/* SCHEDULE */}
        <section id="schedule" className="space-y-12 scroll-mt-32 relative z-10">
          <TacticalHeader title="Match Schedule" subtitle="MISSION LOG" />
          <SectionDivider numeral="III" />

          <div className="grid md:grid-cols-2 gap-12">
            <div className="space-y-6">
              <h3 className="flex items-center text-lg font-black text-[#f26a1b] uppercase tracking-widest font-mono">
                <span className="mr-2 animate-pulse">▶</span> Upcoming Matches
              </h3>
              <ul className="space-y-4 font-mono">
                {upcomingMatches.map((m) => (
                  <li
                    key={m.date + m.event}
                    className="group flex justify-between items-center gap-4 border-l-[6px] border-zinc-800 bg-zinc-900/30 pl-4 py-3 pr-3 hover:border-[#f26a1b] hover:bg-zinc-900/80 transition-all duration-200"
                  >
                    <div>
                      <p className="text-white font-bold uppercase tracking-tight group-hover:text-[#ffc085]">
                        {m.event}
                      </p>
                      <p className="text-zinc-500 text-xs mt-1 uppercase">
                        {m.date}
                      </p>
                    </div>
                    <a
                      href={m.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-zinc-400 border border-zinc-700 px-3 py-1 hover:text-[#ff8a3d] hover:border-[#f26a1b] text-xs font-bold whitespace-nowrap uppercase transition-all"
                    >
                      View Event Page
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-6">
              <h3 className="text-lg font-black text-[#c4c4c4] uppercase tracking-widest font-mono">
                Recent Results
              </h3>
              <ul className="space-y-4 font-mono">
                {pastMatches.map((m) => (
                  <li
                    key={m.date + m.event}
                    className="relative flex justify-between items-center gap-4 border-l-[6px] border-zinc-800 bg-zinc-900/30 pl-4 py-3 pr-3"
                  >
                    {m.result === "1st Place" && (
                      <div className="absolute inset-0 bg-[#f26a1b]/5 pointer-events-none border-b border-[#f26a1b]/20"></div>
                    )}
                    <div>
                      <p className="text-zinc-200 font-bold uppercase tracking-tight">
                        {m.event}
                      </p>
                      <p className="text-zinc-600 text-xs mt-1 uppercase">
                        {m.date}
                      </p>
                    </div>
                    <div className="text-right relative z-10">
                      <p
                        className={`font-black uppercase tracking-wider ${
                          m.result === "1st Place"
                            ? "text-[#ff8a3d] [text-shadow:0_0_10px_rgba(242,106,27,0.5)]"
                            : "text-white"
                        }`}
                      >
                        {m.result}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* VIDEOS */}
        <section id="videos" className="space-y-8 scroll-mt-32 relative z-10">
          <TacticalHeader title="Theater Mode" subtitle="VODS" />
          <SectionDivider numeral="IV" />

          <div className="flex justify-end">
            <a
              href={YOUTUBE_CHANNEL_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="border border-[#f26a1b]/70 bg-[#f26a1b]/10 px-4 py-2 text-xs font-black uppercase tracking-wider text-[#ff8a3d] hover:bg-[#f26a1b] hover:text-black transition-all"
            >
              Visit YouTube Channel →
            </a>
          </div>

          {videos.length === 0 ? (
            <p className="text-sm text-zinc-500 font-mono uppercase animate-pulse">
              Loading latest videos...
            </p>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {videos.map((v) => (
                <a
                  key={v.id}
                  href={v.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex flex-col gap-3 bg-[#171b20]/70 border-2 border-[#242833] hover:border-[#f26a1b] transition-all duration-300 p-2"
                >
                  <div className="aspect-video relative overflow-hidden bg-black border border-zinc-700 group-hover:border-[#f26a1b]/60 transition-all">
                    <div className="absolute inset-0 z-10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/50">
                      <div className="w-12 h-12 rounded-full border-2 border-[#ff8a3d] flex items-center justify-center bg-[#f26a1b]/20">
                        <div className="w-0 h-0 border-t-[8px] border-t-transparent border-l-[12px] border-l-[#ff8a3d] border-b-[8px] border-b-transparent ml-1"></div>
                      </div>
                    </div>
                    {v.thumbnail ? (
                      <Image
                        src={v.thumbnail}
                        alt={decodeHtml(v.title)}
                        width={320}
                        height={180}
                        className="h-full w-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500 mix-blend-luminosity group-hover:mix-blend-normal"
                      />
                    ) : (
                      <div
                        className="h-full w-full bg-repeat opacity-20"
                        style={{ backgroundImage: `url('${DOT_TEXTURE}')` }}
                      />
                    )}
                  </div>
                  <div className="px-2 pb-2">
                    <h3 className="text-sm font-bold text-white line-clamp-2 leading-tight uppercase group-hover:text-[#ff8a3d]">
                      {decodeHtml(v.title)}
                    </h3>
                    <p className="text-[10px] text-[#f26a1b] font-mono mt-2 uppercase tracking-wider">
                      youtube
                    </p>
                  </div>
                </a>
              ))}
            </div>
          )}
        </section>

        {/* TWITCH */}
        <section id="twitch" className="space-y-12 scroll-mt-32 relative z-10">
          <TacticalHeader title="Live Streams" subtitle="SAT-LINK" />
          <SectionDivider numeral="V" />

          <div className="grid md:grid-cols-2 gap-10">
            <div className="relative">
              <div className="flex items-center gap-2 mb-2 font-mono text-xs text-[#ff8a3d] font-bold uppercase">
                <span className="h-2 w-2 bg-red-500 rounded-full animate-pulse"></span>
                Live: bushsquatch
              </div>
              <div className="border-4 border-[#7c3813] bg-black p-1 shadow-[0_0_24px_rgba(242,106,27,0.4)] clip-path-polygon-[20px_0,100%_0,100%_calc(100%-20px),calc(100%-20px)_100%,0_100%,0_20px]">
                <div
                  className="aspect-video w-full bg-repeat border border-[#f26a1b]/60"
                  style={{ backgroundImage: `url('${DOT_TEXTURE}')` }}
                >
                  <iframe
                    className="h-full w-full mix-blend-luminosity hover:mix-blend-normal transition-all opacity-90 hover:opacity-100"
                    src="https://player.twitch.tv/?channel=bushsquatch&parent=localhost"
                    title="bushsquatch Twitch stream"
                    allowFullScreen
                    frameBorder="0"
                  />
                </div>
              </div>
            </div>

            <div className="relative opacity-70 hover:opacity-100 transition-opacity">
              <div className="flex items-center gap-2 mb-2 font-mono text-xs text-zinc-500 font-bold uppercase">
                <span className="h-2 w-2 bg-zinc-500 rounded-full"></span>
                Channel: jerseyjerry
              </div>
              <div className="border-4 border-zinc-800 bg-black p-1 clip-path-polygon-[20px_0,100%_0,100%_calc(100%-20px),calc(100%-20px)_100%,0_100%,0_20px]">
                <div
                  className="aspect-video w-full bg-repeat border border-zinc-700"
                  style={{ backgroundImage: `url('${DOT_TEXTURE}')` }}
                >
                  <iframe
                    className="h-full w-full grayscale"
                    src="https://player.twitch.tv/?channel=jerseyjerry&parent=localhost"
                    title="jerseyjerry Twitch stream"
                    allowFullScreen
                    frameBorder="0"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FOOTER */}
        <footer className="border-t-[3px] border-[#1d4f52]/70 pt-8 pb-12 text-xs text-zinc-600 font-mono uppercase tracking-wider relative z-10">
          <div className="flex justify-between items-center flex-wrap gap-4">
            <p>
              // © {new Date().getFullYear()} TELLURIDE BUSH.
              <span className="text-[#ff8a3d] ml-2 font-black">[ #UNSHAVEN ]</span>
            </p>
            <a
              href={MERCH_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-zinc-400 hover:text-[#ff8a3d] transition group"
            >
              <span>Shop Bush Merch</span>
              <span className="group-hover:translate-x-1 transition-transform">
                →
              </span>
            </a>
          </div>
        </footer>
      </div>

      {/* PASSCODE BAR (EASTER EGG TRIGGER) */}
      <form
        onSubmit={handlePasscodeSubmit}
        className="fixed bottom-2 left-1/2 -translate-x-1/2 z-40 flex items-center gap-2 rounded-sm border border-[#1d4f52] bg-black/80 px-3 py-1 font-mono text-[10px] text-[#3ab7aa]/80 shadow-[0_0_14px_rgba(0,0,0,0.9)]"
      >
        <span className="tracking-[0.25em] uppercase hidden sm:inline">
          Access Code
        </span>
        <span className="sm:hidden uppercase tracking-[0.2em]">Code</span>
        <span className="text-[#1d4f52] mx-1">:</span>
        <input
          value={passcode}
          onChange={(e) => setPasscode(e.target.value)}
          className="bg-transparent outline-none text-[10px] text-[#ff8a3d] placeholder:text-zinc-600 w-20 sm:w-24"
          placeholder="•••••"
          autoComplete="off"
        />
        <button
          type="submit"
          className="uppercase tracking-[0.2em] text-[9px] text-[#3ab7aa]/80 hover:text-[#ff8a3d] transition"
        >
          Enter
        </button>
        {passcodeError && (
          <span className="ml-2 text-[9px] text-red-500 animate-pulse">
            {passcodeError}
          </span>
        )}
      </form>

      {/* SECRET TERMINAL EASTER EGG */}
      {terminalOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex items-center justify-center"
          onClick={closeTerminal}
        >
          <div
            className="relative w-full max-w-3xl max-h-[80vh] border border-[#3ab7aa] bg-black px-6 py-4 text-[#3ab7aa] font-mono text-xs sm:text-sm overflow-y-auto shadow-[0_0_40px_rgba(0,0,0,0.9)]"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={closeTerminal}
              className="absolute top-2 right-3 text-[#3ab7aa]/60 hover:text-[#ff8a3d] text-xs"
            >
              [ ESC / CLOSE ]
            </button>

            <p className="text-[10px] sm:text-xs text-[#3ab7aa]/70 mb-3">
              BUSH OS v0.7 — UNREGISTERED BUILD — PRESS ESC TO EXIT
            </p>

            {terminalStage === "loading" ? (
              <>
                <pre className="text-[9px] sm:text-[10px] leading-tight mb-4 opacity-60">
{String.raw`
                                                           -+*#%%%#***********#%%%%%%#:
                                                        =#@@@@*-.           -%@@@@@@%-
                                                       +@@@@@=            :*@@@@@@%+.
                                                      +@@@@@=           .*%@@@@@#=.
                                                     +@@@@@=          .+@@@@@@#-
                                                    =@@@@%=           -======:
                                                   =@@@@@=       .::::::::::::::::::
                                                  =@@@@%=       :%@@@#+========+%@@@%+
                                                 =@@@@%=        -@@%-           =@@@@%
                                                =@@@@%-         -@+.            *@@@#.
                                               =@@@@%-          :-             .%@@#.
                                              =@@@@%-                          =@@%.
                                             =@@@@%-                           %@%:
                                            =@@@@%-                          :*%*.
                                           =@@@@%-                     .:=+**+-.
                                          =%@@@%-                .:-+*%%#*=:
                                         =%@@@%-           .:-+*%@@@#+-.
                                        -%@@@%-      .:=+*#%@@@%#+-.
                                       -%@@@@= .:=+*#%@@@@@%#+:.
                                      -%@@@@@%%%@@@@@@@%*=:.
                                      %@@@@@@@@@@@@%*=:
                                      =%@@@@@@%#*=:
                                       :+#%%*=:`
}
                </pre>

                <div className="flex items-center gap-3 mb-2">
                  <div className="h-3 w-3 border-2 border-[#3ab7aa]/70 border-t-transparent rounded-full animate-spin" />
                  <span className="text-[10px] sm:text-xs text-[#3ab7aa]/80">
                    [BOOT] Initializing BUSH OS kernel...
                  </span>
                </div>
                {/* ...rest of loading section */}
              </>
            ) : (
              <>
                <pre className="text-[9px] sm:text-[10px] leading-tight mb-4">
{String.raw`
                                                           -+*#%%%#***********#%%%%%%#:
                                                        =#@@@@*-.           -%@@@@@@%-
                                                       +@@@@@=            :*@@@@@@%+.
                                                      +@@@@@=           .*%@@@@@#=.
                                                     +@@@@@=          .+@@@@@@#-
                                                    =@@@@%=           -======:
                                                   =@@@@@=       .::::::::::::::::::
                                                  =@@@@%=       :%@@@#+========+%@@@%+
                                                 =@@@@%=        -@@%-           =@@@@%
                                                =@@@@%-         -@+.            *@@@#.
                                               =@@@@%-          :-             .%@@#.
                                              =@@@@%-                          =@@%.
                                             =@@@@%-                           %@%:
                                            =@@@@%-                          :*%*.
                                           =@@@@%-                     .:=+**+-.
                                          =%@@@%-                .:-+*%%#*=:
                                         =%@@@%-           .:-+*%@@@#+-.
                                        -%@@@%-      .:=+*#%@@@%#+-.
                                       -%@@@@= .:=+*#%@@@@@%#+:.
                                      -%@@@@@%%%@@@@@@@%*=:.
                                      %@@@@@@@@@@@@%*=:
                                      =%@@@@@@%#*=:
                                       :+#%%*=:`
}
                </pre>

                <p className="mb-3">
                  Welcome, operator. Your access code has been{" "}
                  <span className="text-[#ff8a3d]">verified</span>. Activity in
                  this console is off the record.
                </p>

                <p className="mb-4">
                  What follows is not for public knowledge. Keep this link away from
                  the chat.
                </p>

                <div className="border border-[#3ab7aa]/60 p-3 mb-4 bg-black/60">
                  <p className="mb-2 text-[#3ab7aa]/80">
                    &gt; AVAILABLE SECURE COMMANDS
                  </p>
                  <p className="mb-1">
                    <span className="text-[#ff8a3d]">shovel</span> — open
                    classified utility link
                  </p>
                  <p className="text-[#3ab7aa]/70">
                    (click the button below to execute)
                  </p>
                </div>

                <a
                  href={SHOVEL_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block mt-1 border border-[#f26a1b]/80 bg-[#f26a1b]/10 px-4 py-2 text-[10px] sm:text-xs font-bold uppercase tracking-[0.25em] text-[#ff8a3d] hover:bg-[#f26a1b] hover:text-black transition-all"
                >
                  EXECUTE: TOP SECRET SHOVEL LINK
                </a>

                <p className="mt-6 text-[10px] text-[#3ab7aa]/60">

                </p>
              </>
            )}
          </div>
        </div>
      )}
    </main>
  );
}