import { Suspense } from "react";

import { AvatarPreview } from "@/components/avatar-preview";
import { ColorSelector } from "@/components/controls/color-selector";
import { ExpressionSelector } from "@/components/controls/expression-selector";
import { RenderOptions } from "@/components/controls/render-options";
import { SeedPresets } from "@/components/controls/seed-presets";
import { SilhouetteSelector } from "@/components/controls/silhouette-selector";

const AvatarPlayground = () => (
  <main className="mx-auto w-full max-w-7xl flex-1 px-4 py-8 sm:px-6 lg:py-12">
    <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-start">
      {/* Left Column: Avatar Preview Canvas */}
      <div className="flex flex-col items-center lg:sticky lg:top-24 lg:col-span-5">
        <AvatarPreview />
      </div>

      {/* Right Column: Interactive Customizer Controls */}
      <div className="flex flex-col gap-6 lg:col-span-7">
        <SeedPresets />
        <SilhouetteSelector />
        <ColorSelector />
        <ExpressionSelector />
        <RenderOptions />
      </div>
    </div>
  </main>
);

const AvatarPlaygroundPage = () => (
  <Suspense>
    <AvatarPlayground />
  </Suspense>
);

export default AvatarPlaygroundPage;
