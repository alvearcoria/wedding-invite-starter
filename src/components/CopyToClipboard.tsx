
"use client";

import { useState } from "react";
import { Icon } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { useAnalytics } from "@/firebase";
import { logEvent } from "firebase/analytics";

export function CopyToClipboard({ textToCopy }: { textToCopy: string }) {
  const [isCopied, setIsCopied] = useState(false);
  const analytics = useAnalytics();

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(textToCopy);
      setIsCopied(true);
      
      if (analytics && textToCopy.startsWith('#')) {
        logEvent(analytics, 'copy_hashtag', {
            hashtag: textToCopy,
        });
      }
      
      setTimeout(() => setIsCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  return (
    <TooltipProvider>
      <Tooltip open={isCopied}>
        <TooltipTrigger asChild>
          <Button variant="ghost" size="icon" onClick={handleCopy} className="h-7 w-7">
            {isCopied ? <Icon name="check" className="h-4 w-4 text-green-500" /> : <Icon name="copy" className="h-4 w-4" />}
            <span className="sr-only">Copiar al portapapeles</span>
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>¡Copiado!</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
