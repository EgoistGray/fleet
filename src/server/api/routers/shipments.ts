import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";
import { prisma } from "@/server/db";
import { z } from "zod";

export const shipmentsRouter = createTRPCRouter({
  createShipment: protectedProcedure
    .input(
      z.object({
        company: z.string(),
        name: z.string(),
        weight: z.number(),

        senderName: z.string(),
        senderAddress: z.string(),
        recipientName: z.string(),
        recipientAddress: z.string(),
      })
    )
    .mutation(async ({ input }) => {
      await prisma.shipment.create({
        data: {
          ...input,
          status: "pending",
        },
      });
    }),

  deleteShipment: protectedProcedure
    .input(
      z.object({
        shipmentId: z.string(),
      })
    )
    .mutation(async ({ input: { shipmentId } }) => {
      await prisma.user.delete({
        where: {
          id: shipmentId,
        },
      });
    }),

  updateShipment: protectedProcedure
    .input(
      z.object({
        id: z.string(),
        company: z.string(),
        name: z.string(),
        weight: z.number(),

        senderName: z.string(),
        senderAddress: z.string(),
        recipientName: z.string(),
        recipientAddress: z.string(),
      })
    )
    .mutation(async ({ input }) => {
      await prisma.user.update({
        data: input,
        where: {
          id: input.id,
        },
      });
    }),

  getShipments: protectedProcedure
    .input(
      z.object({
        company: z.string(),
        orderOption: z.string().nullish(),
        startId: z.string().nullish(),
        take: z.number().nullish(),
      })
    )
    .query(async ({ input: { company, orderOption, startId, take } }) => {
      return await prisma.shipment.findMany({
        where: {
          company,
        },
        take: take ?? 5,
        cursor: {
          id: startId ?? undefined,
        },
        orderBy: {
          [orderOption ?? "id"]: "desc",
        },
      });
    }),
});
