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
      await prisma.shipment.delete({
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
        status: z.string(),

        senderName: z.string(),
        senderAddress: z.string(),
        recipientName: z.string(),
        recipientAddress: z.string(),
      })
    )
    .mutation(async ({ input }) => {
      await prisma.shipment.update({
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
        sortBy: z.string().optional(),
        startId: z.string().optional(),
        take: z.number().optional(),
      })
    )
    .query(async ({ input: { company, sortBy, startId, take } }) => {
      return await prisma.shipment.findMany({
        where: {
          company,
        },
        take: take ?? 5,
        cursor: {
          id: startId ?? undefined,
        },
        orderBy: {
          [sortBy ?? "id"]: "desc",
        },
      });
    }),
  getShipmentsOffset: protectedProcedure
    .input(
      z.object({
        company: z.string(),
        sortBy: z.string().optional(),
        offset: z.number().optional(),
        take: z.number().optional(),
        query: z.string().optional(),
      })
    )
    .query(async ({ input: { company, sortBy, offset, take, query } }) => {
      const page = await prisma.$transaction([
        prisma.shipment.count({
          where: {
            company,
            name: {
              contains: query,
            },
          },
        }),
        prisma.shipment.findMany({
          where: {
            company,
            name: {
              contains: query,
            },
          },
          skip: offset ?? 0,
          take: take ?? 5,
          orderBy: {
            [sortBy ?? "id"]: "desc",
          },
        }),
      ]);
      return {
        count: page[0],
        pageTotal: Math.ceil(page[0] / (take ?? 1)),
        data: page[1],
      };
    }),
});
