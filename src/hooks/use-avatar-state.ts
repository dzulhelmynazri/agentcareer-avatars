import { parseAsBoolean, parseAsString, useQueryState } from "nuqs";

export const useSeedState = () =>
  useQueryState("seed", parseAsString.withDefault("agentcareer"));

export const useSilhouetteState = () =>
  useQueryState("shape", parseAsString.withDefault("random"));

export const useColorState = () =>
  useQueryState("color", parseAsString.withDefault("random"));

export const useExpressionState = () =>
  useQueryState("expression", parseAsString.withDefault("random"));

export const useAnimatedState = () =>
  useQueryState("animated", parseAsBoolean.withDefault(true));

export const useTransparentEyesState = () =>
  useQueryState("transparentEyes", parseAsBoolean.withDefault(false));
