/* eslint-disable @typescript-eslint/naming-convention */

export function SkeletonLoader({
  numSkeletons,
  renderSkeleton,
}: {
  numSkeletons: number;
  renderSkeleton: (idx: number) => React.ReactNode;
}): JSX.Element {
  return (
    <>
      {[...Array(numSkeletons)].map((_, idx) => (
        <div key={idx} className="p-1">
          {renderSkeleton(idx)}
        </div>
      ))}
    </>
  );
}
