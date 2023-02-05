import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "../trpc";

export const paymentRouter = createTRPCRouter({
	createPayment: publicProcedure
		.input(z.object({
			total: z.number(),
			type: z.string(),
			date: z.string().datetime(),
		}))
		.mutation(async ({ input, ctx }) => {
			const payment = await ctx.prisma.payment.create({
				data: { ...input }
			});
			
			return payment;
		}),
});
