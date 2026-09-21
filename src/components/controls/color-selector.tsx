"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { COLOR_OPTIONS } from "@/constants/playground";
import { useColorState } from "@/hooks/use-avatar-state";

export const ColorSelector = () => {
  const [color, setColor] = useColorState();

  return (
    <Card>
      <CardHeader>
        <CardTitle>Color Palette</CardTitle>
        <CardAction>
          <code className="text-muted-foreground font-mono text-xs">
            color={color}
          </code>
        </CardAction>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap gap-2">
          {COLOR_OPTIONS.map((c) => (
            <Button
              key={c.id}
              variant={color === c.id ? "default" : "outline"}
              onClick={() => setColor(c.id)}
            >
              <svg viewBox="0 0 14 14">
                <circle
                  cx="7"
                  cy="7"
                  r="6"
                  fill={c.hex === "transparent" ? "none" : c.hex}
                  stroke="currentColor"
                  strokeWidth={c.hex === "transparent" ? 1.5 : 0.5}
                  strokeDasharray={c.hex === "transparent" ? "2,2" : undefined}
                />
              </svg>
              <span>{c.label}</span>
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
