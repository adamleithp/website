import { PropsWithChildren } from "react";
import { TextSkeleton } from "@/components/examples/text-skeleton";

export const TextSkeletonExample = () => {
  return (
    <div className="space-y-4">
      <div className="flex gap-4">
        <TextSkeleton>
          <h1 className="text-xl font-bold">H1 header</h1>
        </TextSkeleton>
        <h1 className="text-xl font-bold">H1 header</h1>
      </div>
      <div className="flex gap-4">
        <TextSkeleton>
          <h2 className="text-lg font-bold">H2 header</h2>
        </TextSkeleton>
        <h2 className="text-lg font-bold">H2 header</h2>
      </div>
      <div className="flex gap-4">
        <TextSkeleton>
          <h3 className="text-base font-bold">H3 header</h3>
        </TextSkeleton>
        <h3 className="text-base font-bold">H3 header</h3>
      </div>
      <div className="flex gap-4">
        <TextSkeleton>
          <p className="text-sm">Paragraph</p>
        </TextSkeleton>
        <p className="text-sm">Paragraph</p>
      </div>
    </div>
  );
};
