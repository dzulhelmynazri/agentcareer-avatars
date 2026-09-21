import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { ENV as env } from "@/env";
import { generateAvatarSvg } from "@/lib/avatar/generator";

export const Header = () => {
  const avatarSvg = generateAvatarSvg({
    seed: "agentcareer",
    size: 64,
  });
  const avatarDataUri = `data:image/svg+xml;utf8,${encodeURIComponent(avatarSvg)}`;

  return (
    <header className="border-border bg-background/80 sticky top-0 z-50 border-b backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3.5 sm:px-6">
        <Link href="/" className="flex items-center gap-2 hover:opacity-80">
          <Image
            src={avatarDataUri}
            alt="Agent Career Logo"
            width={32}
            height={32}
            className="rounded-md"
          />
          <span className="text-foreground font-semibold tracking-tight">
            Agent Career
          </span>
        </Link>

          <Button
            variant="outline"
            nativeButton={false}
            render={
              <a
                href={env.NEXT_PUBLIC_DOCS_URL}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="API Reference"
              />
            }
          >
            API Reference
          </Button>

      </div>
    </header>
  );
};
