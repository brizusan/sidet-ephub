"use client";

import dynamic from "next/dynamic";

export const DynamicEventLocation = dynamic(() => import("./EventLocation"), {
  ssr: false,
});
