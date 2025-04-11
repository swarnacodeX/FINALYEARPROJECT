// components/ui/card.tsx
import { cn } from "@/lib/utils";

export const Card = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => {
  return (
    <div className={cn("rounded-xl border bg-white p-4 shadow", className)} {...props} />
  );
};
