import * as React from "react";

import { cn } from "@/lib/utils";
import { useTextareaAutoHeight } from "@/lib/hooks/use-textarea-auto-height";

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  autoHeight?: boolean;
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, autoHeight, ...props }, ref) => {
    const innerRef = React.useRef<HTMLTextAreaElement>(null);

    // Use the auto-height hook with innerRef
    useTextareaAutoHeight({
      ref: innerRef,
      autoHeight,
    });

    // Merge both innerRef and the forwarded ref, but only when innerRef is available
    React.useImperativeHandle(ref, () => {
      if (innerRef.current) {
        return innerRef.current;
      }
      // Return an empty object when innerRef is not available yet (during initial render)
      return {} as HTMLTextAreaElement;
    });

    return (
      <textarea
        className={cn(
          "flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        ref={innerRef} // Use the innerRef here
        {...props}
      />
    );
  }
);
Textarea.displayName = "Textarea";

export { Textarea };
