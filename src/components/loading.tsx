import React from "react";
import { cn } from "../lib/utils";
import { ClassValue } from "clsx";

interface LoadingProps {
  className?: ClassValue[];
  spinClassName?: ClassValue[];
  children?: React.ReactNode;
}
const Loading: React.FC<LoadingProps> = ({
  className,
  children,
  spinClassName,
}) => {
  return (
    <div className={cn("text-center", className)}>
      <div className="flex justify-center">
        <div
          className={cn(
            "w-12 h-12 border-4 border-blue-500 border-dashed rounded-full animate-spin",
            spinClassName
          )}
        ></div>
      </div>
      {children}
    </div>
  );
};

export default Loading;
