function range(start: number, end: number) {
  let list = [];
  for (let i = start; i <= end; i++) list.push(i);
  return list;
}

export default function StampingProgress({
  counted,
  max,
}: {
  counted: number;
  max: number;
}) {
  const gridCols = [
    "grid-cols-0",
    "grid-cols-1",
    "grid-cols-2",
    "grid-cols-3",
    "grid-cols-4",
    "grid-cols-5",
    "grid-cols-6",
    "grid-cols-7",
    "grid-cols-8",
    "grid-cols-9",
  ];

  return (
    <div className={`grid gap-1 ${max < 10 ? gridCols[max] : "grid-cols-10"}`}>
      {range(1, max)?.map((count) => (
        <span
          className={`h-2 ${count <= counted ? "bg-primary" : "bg-gray-200"} ${
            count === 1 ? "rounded-l-full" : ""
          } ${count === max ? "rounded-r-full" : ""}`}
        />
      ))}
    </div>
  );
}
