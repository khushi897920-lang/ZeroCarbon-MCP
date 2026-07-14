"use client";

import React from "react";
import Image from "next/image";

export function PlatformNetwork() {
  return (
    <div
      className="relative w-full overflow-hidden bg-[#f6f9f7] border border-[#dce5df] shadow-[0_4px_20px_rgba(0,0,0,0.03)]"
      style={{
        aspectRatio: "1 / 1",
        borderRadius: 32,
      }}
    >
      <div className="absolute inset-0 overflow-hidden">
        <Image
          src="/images/network-workflow.png"
          alt="ZeroCarbon MCP Network Workflow"
          fill
          priority
          sizes="(max-w-768px) 100vw, 50vw"
          className="scale-[1.08] transition-transform duration-300"
          style={{
            objectFit: "cover",
            objectPosition: "center",
          }}
        />
      </div>
    </div>
  );
}
