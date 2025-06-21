"use client";

import Image from "next/image";
import React from "react";

export function SafeImage(props: React.ComponentProps<typeof Image>) {
  const [errored, setErrored] = React.useState(false);
  return (
    <Image
      {...props}
      unoptimized={errored}
      onError={() => setErrored(true)}
    />
  );
}