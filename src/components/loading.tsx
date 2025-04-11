import React from "react";
import { cn } from "../lib/utils";
import { ClassValue } from "clsx";
import { Loader } from "lucide-react";

interface LoadingProps {
  className?: ClassValue[];
  spinClassName?: ClassValue[];
  children?: React.ReactNode;
  size?:number
}
const Loading: React.FC<LoadingProps> = ({
  className,
  children,
  spinClassName,
  size = 35
}) => {
  return (
    <div className={cn("text-center", className)}>
      <div className="flex justify-center">
        <Loader
          className={cn("animate-spin text-gray-500", spinClassName)}
          size={size}
        />
      </div>
      {children}
    </div>
  );
};

export default Loading;
