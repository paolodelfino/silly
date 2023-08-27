import { domain } from "@/app/_lib/utils";
import { appRouter } from "@/server";
import { httpBatchLink } from "@trpc/client";

export const trpcServer = appRouter.createCaller({
  links: [
    httpBatchLink({
      url: `${domain}/api/trpc`,
    }),
  ],
});
