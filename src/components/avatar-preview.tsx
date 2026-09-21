"use client";

import { Check, Code2, Copy, Dices, Download } from "lucide-react";
import Image from "next/image";
import { useMemo, useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ENV as env } from "@/env";
import {
  useAnimatedState,
  useColorState,
  useExpressionState,
  useSeedState,
  useSilhouetteState,
  useTransparentEyesState,
} from "@/hooks/use-avatar-state";
import { generateAvatarSvg } from "@/lib/avatar/generator";

export const AvatarPreview = () => {
  const [seed, setSeed] = useSeedState();
  const [silhouette] = useSilhouetteState();
  const [color] = useColorState();
  const [expression] = useExpressionState();
  const [animated] = useAnimatedState();
  const [transparentEyes] = useTransparentEyesState();

  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const handleRandomize = () => {
    const rand = Math.random().toString(36).slice(2, 10);
    setSeed(rand);
  };

  const svgMarkup = useMemo(
    () =>
      generateAvatarSvg({
        animated,
        body: silhouette === "random" ? undefined : silhouette,
        color: color === "random" ? undefined : color,
        expression: expression === "random" ? undefined : expression,
        paper: transparentEyes ? "transparent" : "#f9f9f9",
        seed,
        size: 320,
      }),
    [seed, silhouette, color, expression, animated, transparentEyes]
  );

  const avatarDataUri = useMemo(
    () => `data:image/svg+xml;utf8,${encodeURIComponent(svgMarkup)}`,
    [svgMarkup]
  );

  const apiUrl = useMemo(() => {
    const origin = env.NEXT_PUBLIC_APP_URL;

    const params = new URLSearchParams();
    if (seed) {
      params.set("seed", seed);
    }
    if (silhouette !== "random") {
      params.set("shape", silhouette);
    }
    if (color !== "random") {
      params.set("color", color);
    }
    if (expression !== "random") {
      params.set("expression", expression);
    }
    if (animated) {
      params.set("animated", "true");
    }
    if (transparentEyes) {
      params.set("paper", "transparent");
    }

    const qs = params.toString();
    return `${origin}/api/avatar.svg${qs ? `?${qs}` : ""}`;
  }, [seed, silhouette, color, expression, animated, transparentEyes]);

  const handleCopy = async (text: string, key: string) => {
    await navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const handleDownload = () => {
    const blob = new Blob([svgMarkup], { type: "image/svg+xml;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${seed || "avatar"}${animated ? "-animated" : ""}.svg`;
    document.body.append(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  };

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>{seed}</CardTitle>
        <CardAction>
          <Button
            variant="outline"
            size="icon"
            onClick={handleRandomize}
            title="Randomize Seed"
          >
            <Dices />
          </Button>
        </CardAction>
      </CardHeader>

      <CardContent className="flex flex-col items-center">
        <div className="flex size-64 items-center justify-center transition-transform hover:scale-105 sm:size-72">
          <Image
            src={avatarDataUri}
            alt={`Avatar for ${seed}`}
            width={288}
            height={288}
            unoptimized
            className="size-full"
          />
        </div>
      </CardContent>

      <CardFooter>
        <div className="grid w-full grid-cols-3 gap-2">
          <Button
            variant="outline"
            onClick={() => handleCopy(apiUrl, "quick-url")}
          >
            {copiedKey === "quick-url" ? (
              <Check data-icon="inline-start" />
            ) : (
              <Copy data-icon="inline-start" />
            )}
            <span>{copiedKey === "quick-url" ? "Copied!" : "Copy URL"}</span>
          </Button>

          <Button
            variant="outline"
            onClick={() => handleCopy(svgMarkup, "quick-svg")}
          >
            {copiedKey === "quick-svg" ? (
              <Check data-icon="inline-start" />
            ) : (
              <Code2 data-icon="inline-start" />
            )}
            <span>{copiedKey === "quick-svg" ? "Copied!" : "Copy SVG"}</span>
          </Button>

          <Button variant="outline" onClick={handleDownload}>
            <Download data-icon="inline-start" />
            Download
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};
