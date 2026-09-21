import type { NextRequest } from "next/server";

import type { AvatarOptions } from "./generator";

export function parseAvatarOptions(
  req: NextRequest,
  defaultSeed = "agentcareer"
): AvatarOptions {
  const params = req.nextUrl.searchParams;

  return {
    animated: params.get("animated") === "true",
    background: params.get("background") ?? undefined,
    body: params.get("shape") ?? undefined,
    color: params.get("color") ?? undefined,
    expression: params.get("expression") ?? undefined,
    paper: params.get("paper") ?? undefined,
    radius: params.get("radius") ? Number(params.get("radius")) : undefined,
    seed: params.get("seed") ?? defaultSeed,
    size: params.get("size") ? Number(params.get("size")) : undefined,
    state: params.get("state") ?? undefined,
  };
}

export function createSvgResponse(svg: string): Response {
  return new Response(svg, {
    headers: {
      "Access-Control-Allow-Methods": "GET, HEAD, OPTIONS",
      "Access-Control-Allow-Origin": "*",
      "Cache-Control": "public, max-age=31536000, immutable",
      "Content-Type": "image/svg+xml; charset=utf-8",
    },
    status: 200,
  });
}
