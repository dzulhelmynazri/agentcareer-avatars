import Image from "next/image";

import { PRESET_SEEDS } from "@/constants/playground";

const AGENTS = [
  ...PRESET_SEEDS,
  "Agent Smith",
  "T-800",
  "C-3PO",
  "R2-D2",
  "Data",
  "Cortana",
  "Siri",
  "Alexa",
  "Bender",
  "Wall-E",
] as const;

export const CompanyMarquee = () => {
  const marquee = [...AGENTS, ...AGENTS];

  return (
    <div className="relative mx-auto mt-16 w-full max-w-6xl px-6 pb-4 sm:mt-24 sm:pb-6">
      <div className="overflow-x-clip [mask-image:linear-gradient(to_right,transparent,#000_10%,#000_90%,transparent)] py-2 [-webkit-mask-image:linear-gradient(to_right,transparent,#000_10%,#000_90%,transparent)]">
        <div className="animate-marquee flex w-max items-center gap-3 sm:gap-4">
          {marquee.map((agent, index) => (
            <div
              key={`${agent}-${index}`}
              className="group border-border/70 bg-card/60 hover:border-border hover:bg-card flex shrink-0 items-center gap-2.5 rounded-xl border px-3.5 py-2 shadow-xs backdrop-blur-xs transition-all duration-200 hover:-translate-y-1 sm:px-4 sm:py-2.5"
            >
              <div className="size-6 overflow-hidden sm:size-8">
                <Image
                  src={`/api/avatar.svg?seed=${agent}`}
                  alt={agent}
                  width={32}
                  height={32}
                  unoptimized
                  className="size-full transition-transform duration-200 group-hover:scale-110"
                />
              </div>
              <span className="text-foreground text-xs font-medium whitespace-nowrap sm:text-sm">
                {agent}
              </span>
            </div>
          ))}
        </div>
      </div>
      <p className="text-muted-foreground mt-4 text-center font-mono text-xs">
        Thousands of unique avatars generated daily
      </p>
    </div>
  );
};
