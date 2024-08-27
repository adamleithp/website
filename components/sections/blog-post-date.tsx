import { format, formatDistance } from "date-fns";

export function BlogPostDate({ date }: { date: string }) {
  const formattedDate = format(new Date(Number(date) * 1000), "MMMM dd, yyyy");
  const dateDistance = formatDistance(
    new Date(Number(date) * 1000),
    new Date(),
    {
      addSuffix: true,
    }
  );

  return (
    <>
      {formattedDate}, ({dateDistance})
    </>
  );
}
