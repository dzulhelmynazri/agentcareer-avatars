import type { NextRequest } from "next/server";

import { generateAvatarSvg } from "@/lib/avatar/generator";
import { createSvgResponse, parseAvatarOptions } from "@/lib/avatar/http";

interface RouteContext {
  params: Promise<{
    seed: string;
  }>;
}

export const GET = async (
  req: NextRequest,
  context: RouteContext
): Promise<Response> => {
  const { seed: rawSeed } = await context.params;
  const cleanSeed = decodeURIComponent(rawSeed).replace(/\.svg$/iu, "");
  const options = parseAvatarOptions(req, cleanSeed);
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
