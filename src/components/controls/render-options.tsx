"use client";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldTitle,
} from "@/components/ui/field";
import { Switch } from "@/components/ui/switch";

import {
  useAnimatedState,
  useTransparentEyesState,
} from "@/hooks/use-avatar-state";

export const RenderOptions = () => {
  const [animated, setAnimated] = useAnimatedState();
  const [transparentEyes, setTransparentEyes] = useTransparentEyesState();

  return (
    <Card>
      <CardHeader>
        <CardTitle>Render Options</CardTitle>
      </CardHeader>
      <CardContent className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Field orientation="horizontal">
          <FieldContent>
            <FieldTitle>CSS Keyframe Animation</FieldTitle>
            <FieldDescription>Gaze drift & blinking loop</FieldDescription>
          </FieldContent>
          <Switch
            id="toggle-animated"
            checked={animated}
            onCheckedChange={(checked) => setAnimated(Boolean(checked))}
          />
        </Field>

        <Field orientation="horizontal">
          <FieldContent>
            <FieldTitle>Transparent Eye Cutouts</FieldTitle>
            <FieldDescription>
              {transparentEyes
                ? "Paper layer removed"
                : "Paper backing enabled"}
            </FieldDescription>
          </FieldContent>
          <Switch
            id="toggle-transparent"
            checked={transparentEyes}
            onCheckedChange={(checked) => setTransparentEyes(Boolean(checked))}
          />
        </Field>
      </CardContent>
    </Card>
  );
};
