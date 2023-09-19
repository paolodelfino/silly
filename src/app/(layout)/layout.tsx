import WithLayout from "@/app/_components/pages/WithLayout";

export default function WithLayoutPage({
  children,
}: {
  children: React.ReactNode;
}) {
  return <WithLayout>{children}</WithLayout>;
}
