"use client";

import {
  Card,
  CardAction,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldLabel,
  FieldTitle,
} from "@/components/ui/field";
import {
  RadioGroup,
  RadioGroupItem,
} from "@/components/ui/radio-group";

import { BODY_OPTIONS } from "@/constants/playground";
import { useSilhouetteState } from "@/hooks/use-avatar-state";

export const SilhouetteSelector = () => {
  const [silhouette, setSilhouette] = useSilhouetteState();

  return (
    <Card>
      <CardHeader>
        <CardTitle>Body Shape</CardTitle>
        <CardAction>
          <code className="text-muted-foreground font-mono text-xs">
            shape={silhouette}
          </code>
        </CardAction>
      </CardHeader>
      <CardContent>
        <RadioGroup
          value={silhouette}
          onValueChange={(val) => setSilhouette(String(val))}
          className="grid grid-cols-1 gap-2 sm:grid-cols-2 md:grid-cols-3"
        >
          {BODY_OPTIONS.map((item) => (
            <FieldLabel key={item.id} htmlFor={`shape-${item.id}`}>
              <Field orientation="horizontal">
                <FieldContent>
                  <FieldTitle>{item.label}</FieldTitle>
                  <FieldDescription>{item.desc}</FieldDescription>
                </FieldContent>
                <RadioGroupItem value={item.id} id={`shape-${item.id}`} />
              </Field>
            </FieldLabel>
          ))}
        </RadioGroup>
      </CardContent>
    </Card>
  );
};
