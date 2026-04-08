import { router } from "@/server/trpc";
import { businessRouter } from "./routers/business";
import { siteRouter } from "./routers/site";
import { contactRouter } from "./routers/contact";
import { waitlistRouter } from "./routers/waitlist";

/**
 * Root tRPC router — compose all sub-routers here.
 */
export const appRouter = router({
  business: businessRouter,
  site: siteRouter,
  contact: contactRouter,
  waitlist: waitlistRouter,
});

export type AppRouter = typeof appRouter;
