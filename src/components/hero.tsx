"use client";

import Link from "next/link";

import { Github } from "@/components/socials";
import { Button } from "@/components/ui/button";

import { CompanyMarquee } from "./company-marquee";

export const Hero = () => (
  <section className="bg-background relative flex flex-1 flex-col justify-between overflow-hidden py-6 sm:py-8 lg:py-10">
    <div className="mx-auto my-auto flex max-w-5xl flex-col items-center px-6 text-center">
      <div className="border-border/80 bg-muted/40 text-muted-foreground inline-flex items-center gap-2 rounded-full border px-3.5 py-1.5 font-mono text-xs">
        <span className="bg-primary inline-block size-1.5 animate-pulse rounded-full" />
        v1.0 Live &mdash; 100% Client-Side
      </div>

      <h1 className="text-foreground mt-8 max-w-[20ch] text-5xl font-semibold tracking-tight text-balance sm:text-7xl lg:text-8xl">
        Avatars for AI Agents
      </h1>

      <p className="text-muted-foreground mt-6 max-w-[48ch] text-lg leading-relaxed text-pretty sm:text-2xl">
        Fast, dynamic SVG avatars generated instantly from seed strings.
      </p>

      <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row">
        <Button
          size="lg"
          className="h-11 rounded-full px-8 text-base sm:h-12 sm:px-10"
          nativeButton={false}
          render={<Link href="/playground" />}
        >
          Go to Playground
        </Button>
        <Button
          variant="outline"
          size="lg"
          className="h-11 rounded-full px-8 text-base sm:h-12 sm:px-10"
          nativeButton={false}
          render={
            <a
              href="https://github.com/dzulhelmynazri/agentcareer-avatars"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="View on GitHub"
            />
          }
        >
          <Github className="mr-2 size-5" />
          View on GitHub
        </Button>
      </div>
    </div>

    <CompanyMarquee />
  </section>
);
