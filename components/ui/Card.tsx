import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface CardProps {
  children: ReactNode;
  className?: string;
}

export function Card({ children, className }: CardProps) {
  return (
    <div
      className={cn(
        "bg-card border border-border rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300",
        className
      )}
    >
      {children}
    </div>
  );
}