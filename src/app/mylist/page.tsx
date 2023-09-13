import MylistGrid from "@/app/_components/MylistGrid";
import { auth } from "@/app/_lib/auth";

export default async function MylistPage() {
  const session = await auth();
  return <MylistGrid userId={session?.user.id!} />;
}
