"use client";
import dynamic from "next/dynamic";

// Dynamic import with SSR disabled — Three.js needs `window`,
// so we only load it on the client side.
const ParticleUniverse = dynamic(() => import("./ParticleUniverse"), {
  ssr: false,
  loading: () => (
    <div
      style={{
        width: "100%",
        height: "100%",
        background: "transparent",
      }}
      aria-hidden="true"
    />
  ),
});

export default ParticleUniverse;
