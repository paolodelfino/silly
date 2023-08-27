export default function ({
  params,
}: {
  params: { type: "media" | "tv"; id: number };
}) {
  return JSON.stringify(params);
}
