import { cn } from "@/lib/utils";

export const Container = (props) => {
  return <div className={cn("max-w-5xl mx-auto flex flex-col gap-6 min-h-screen fade-in max-lg:px-4", props.className)}>{props.children}</div>;
};