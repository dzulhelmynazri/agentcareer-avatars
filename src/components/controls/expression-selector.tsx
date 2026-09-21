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

import { EXPRESSION_OPTIONS } from "@/constants/playground";
import { useExpressionState } from "@/hooks/use-avatar-state";

export const ExpressionSelector = () => {
  const [expression, setExpression] = useExpressionState();

  return (
    <Card>
      <CardHeader>
        <CardTitle>Facial Expression</CardTitle>
        <CardAction>
          <code className="text-muted-foreground font-mono text-xs">
            expression={expression}
          </code>
        </CardAction>
      </CardHeader>
      <CardContent>
        <RadioGroup
          value={expression}
          onValueChange={(val) => setExpression(String(val))}
          className="grid grid-cols-1 gap-2 sm:grid-cols-2 md:grid-cols-3"
        >
          {EXPRESSION_OPTIONS.map((expr) => (
            <FieldLabel key={expr.id} htmlFor={`expr-${expr.id}`}>
              <Field orientation="horizontal">
                <FieldContent>
                  <FieldTitle>{expr.label}</FieldTitle>
                  <FieldDescription>{expr.desc}</FieldDescription>
                </FieldContent>
                <RadioGroupItem value={expr.id} id={`expr-${expr.id}`} />
              </Field>
            </FieldLabel>
          ))}
        </RadioGroup>
      </CardContent>
    </Card>
  );
};
