export default function Loading() {
  return (
    <div className="flex flex-1 flex-col gap-6 pt-16" aria-busy="true">
      <div className="bg-muted h-10 w-2/3 max-w-md animate-pulse rounded-md" />
      <div className="bg-muted h-4 w-full max-w-xl animate-pulse rounded-md" />
      <div className="bg-muted h-4 w-5/6 max-w-lg animate-pulse rounded-md" />
      <div className="mt-8 grid grid-cols-2 gap-4">
        <div className="bg-muted h-40 animate-pulse rounded-xl" />
        <div className="bg-muted h-40 animate-pulse rounded-xl" />
      </div>
    </div>
  );
}
