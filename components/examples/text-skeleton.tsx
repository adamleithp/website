import { PropsWithChildren } from "react";

export const TextSkeleton = ({ children }: PropsWithChildren) => {
  return (
    <span
      className="
        animate-pulse
        bg-gray-200 dark:bg-gray-800 rounded-lg
        h-fit w-fit
        select-none
        text-transparent
        [&_*]:!opacity-0
        [&_*]:!text-transparent
        [&_*]:!select-none
        [&_*]:!pointer-events-none
      "
    >
      {children}
    </span>
  );
};
