'use client';

import { Button } from "@/components/ui/button";


export default function Error({ reset }: { reset: () => void }) {

  return (
    <div className="h-screen relative overflow-hidden">
      <h2 className="text-[500px] font-black absolute top-1/2 -translate-y-1/2 translate-x-[-50%] left-1/2 text-muted dark:opacity-60">500</h2>
      <div className="absolute top-1/2 -translate-y-1/2 translate-x-[-50%] left-1/2 space-y-4 text-center">
      <h1 className="text-6xl font-bold">Something went wrong</h1>
      <div className="flex flex-col items-center justify-center text-center gap-3">
        <p className="text-sm text-muted-foreground w-[500px]">Sorry, an unexpected server error has occurred. Please try again later or contact support if the problem persists.</p>
        <Button variant={"outline"} className="bg-muted-foreground text-muted-foreground hover:bg-muted-foreground/80 cursor-pointer" onClick={() => reset()}>Try Again</Button>
      </div>
      </div>
    </div>
  );
} 