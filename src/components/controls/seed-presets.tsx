"use client";

import { Dices } from "lucide-react";
import { useId } from "react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { FieldLabel } from "@/components/ui/field";
import { InputGroup, InputGroupInput } from "@/components/ui/input-group";
import { PRESET_SEEDS } from "@/constants/playground";
import { useSeedState } from "@/hooks/use-avatar-state";

export const SeedPresets = () => {
  const [seed, setSeed] = useSeedState();
  const seedInputId = useId();

  const handleRandomize = () => {
    const rand = Math.random().toString(36).slice(2, 10);
    setSeed(rand);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Avatar Seed</CardTitle>
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
      <CardContent className="space-y-3">
        <InputGroup>
          <InputGroupInput
            id={seedInputId}
            type="text"
            value={seed}
            onChange={(e) => setSeed(e.target.value)}
            placeholder="Type any string or name..."
          />
        </InputGroup>

        <div className="flex flex-col gap-2 pt-2">
          <FieldLabel>Presets</FieldLabel>
          <div className="flex flex-wrap items-center gap-1.5">
            {PRESET_SEEDS.map((p) => (
              <Button
                key={p}
                variant={seed === p ? "default" : "outline"}
                onClick={() => setSeed(p)}
                className="font-mono"
              >
                {p}
              </Button>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
