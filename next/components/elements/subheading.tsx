import { cn } from "@/lib/utils";
import { AnimationProps, MotionProps } from "framer-motion";
import React from "react";
import Balancer from "react-wrap-balancer";

export const Subheading = ({
  className,
  as: Tag = "h2",
  children,
  ...props
}: {
  className?: string;
  as?: any;
  children: any;
  props?: React.HTMLAttributes<HTMLHeadingElement | AnimationProps>;
} & MotionProps &
  React.HTMLAttributes<HTMLHeadingElement | AnimationProps>) => {
  return (
    <Tag
      className={cn(
        "text-lg md:text-2xl max-w-7xl text-left my-4 mx-auto",
        "text-charcoal text-center font-normal",
        className
      )}
    >
      <Balancer>{children}</Balancer>
    </Tag>
  );
};
