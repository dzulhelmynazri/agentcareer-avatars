import type { NextRequest } from "next/server";

import { generateAvatarSvg, resolveAvatarConfig } from "@/lib/avatar/generator";
import { parseAvatarOptions } from "@/lib/avatar/http";

export const GET = (req: NextRequest): Response => {
  const options = parseAvatarOptions(req);
  const config = resolveAvatarConfig(options);
  const svg = generateAvatarSvg(options);

  const url = new URL(req.url);
  const avatarUrl = `${url.origin}/api/avatar.svg?${url.searchParams.toString()}`;

  return Response.json(
    {
      animated: config.animated,
      background: config.background,
      body: config.shape,
      color: {
        hex: config.colorHex,
        name: config.colorName,
      },
      expression: config.expression,
      paper: config.paper,
      seed: config.seed,
      size: config.size,
      state: config.state,
      svg,
      url: avatarUrl,
    },
    {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Cache-Control": "public, max-age=31536000, immutable",
      },
    }
  );
};

export const OPTIONS = (): Response =>
  new Response(null, {
    headers: {
      "Access-Control-Allow-Headers": "Content-Type",
      "Access-Control-Allow-Methods": "GET, HEAD, OPTIONS",
      "Access-Control-Allow-Origin": "*",
    },
    status: 204,
  });
