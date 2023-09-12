import { auth } from "@/app/_lib/auth";
import { TRPCError, initTRPC } from "@trpc/server";

const t = initTRPC.create();

export const router = t.router;
export const publicProcedure = t.procedure;
export const protectedProcedure = t.procedure.use(async (opts) => {
  const session = await auth();
  if (!session || !session.user || !session.user.id) {
    throw new TRPCError({ code: "UNAUTHORIZED" });
  }

  return opts.next(opts);
});
