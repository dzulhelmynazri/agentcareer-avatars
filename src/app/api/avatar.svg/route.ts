import type { NextRequest } from "next/server";

import { generateAvatarSvg } from "@/lib/avatar/generator";
import { createSvgResponse, parseAvatarOptions } from "@/lib/avatar/http";

export const GET = (req: NextRequest): Response => {
  const options = parseAvatarOptions(req);
  const svg = generateAvatarSvg(options);
  return createSvgResponse(svg);
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
