import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { prisma } from "@/server/db";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime";
import { z } from "zod";
import { adminProcedure } from "../trpc";

export const usersRouter = createTRPCRouter({
  // For basic public usage
  isIDUnique: publicProcedure
    .input(z.object({ username: z.string() }))
    .query(async ({ input: { username } }) => {
      if (
        await prisma.user.findMany({
          where: {
            username,
          },
        })
      )
        return false;
      return true;
    }),

  register: publicProcedure
    .input(
      z.object({
        username: z.string(),
        firstName: z.string(),
        lastName: z.string(),
        password: z.string(),
        company: z.string(),
      })
    )
    .mutation(async ({ input }) => {
      try {
        await prisma.user.create({
          data: {
            ...input,
            role: "owner",
          },
        });
      } catch (e) {
        if (e instanceof PrismaClientKnownRequestError) {
          // The .code property can be accessed in a type-safe manner
          if (e.code === "P2002") {
            console.log(
              "There is a unique constraint violation, a new user cannot be created with this username"
            );
          }
        }
        throw e;
      }
    }),
  login: publicProcedure
    .input(
      z.object({
        username: z.string(),
        password: z.string(),
      })
    )
    .query(async ({ input: { username, password } }) => {
      const userInstance = await prisma.user.findFirst({
        where: {
          username,
          role: "owner",
        },
      });

      // if user not found
      if (!userInstance) return false;
      // validation logic here
      if (password !== userInstance.password) return false;
      return true;
    }),

  // For admin CRUD
  createAccount: adminProcedure
    .input(
      z.object({
        username: z.string(),
        firstName: z.string(),
        lastName: z.string(),
        password: z.string(),
        company: z.string(),
        role: z.string(),
      })
    )
    .mutation(async ({ input }) => {
      try {
        await prisma.user.create({
          data: input,
        });
      } catch (e) {
        // if there is some unique violation
        if (e instanceof PrismaClientKnownRequestError) {
          // The .code property can be accessed in a type-safe manner
          if (e.code === "P2002") {
            console.log(
              "There is a unique constraint violation, a new user cannot be created with this email"
            );
          }
        }
        throw e;
      }
    }),

  deleteAccount: adminProcedure
    .input(
      z.object({
        id: z.string(),
      })
    )
    .mutation(async ({ input: { id } }) => {
      await prisma.user.delete({
        where: {
          id,
        },
      });
    }),

  updateAccount: adminProcedure
    .input(
      z.object({
        id: z.string(),
        username: z.string(),
        firstName: z.string(),
        lastName: z.string(),
        password: z.string(),
        company: z.string(),
        role: z.string(),
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

  // More efficient way of doing it but i'll handle the date of creation later
  getAccounts: adminProcedure
    .input(
      z.object({
        company: z.string(),
        sortBy: z.string().nullish(),
        startId: z.string().nullish(),
        take: z.number().nullish(),
      })
    )
    .query(async ({ input: { company, sortBy, startId, take } }) => {
      const page = await prisma.$transaction([
        prisma.user.count(),
        prisma.user.findMany({
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
          skip: 1,
        }),
      ]);

      return {
        count: page[0] ?? 0,
        data: page[1],
      };
    }),

  // Less efficient but better for my sanity
  getAccountsOffset: adminProcedure
    .input(
      z.object({
        company: z.string(),
        sortBy: z.string().optional(),
        offset: z.number().optional(),
        take: z.number().optional(),
        query: z.string().optional(),
      })
    )
    .query(async ({ input: { query, company, sortBy, offset, take } }) => {
      const page = await prisma.$transaction([
        prisma.user.count({
          where: {
            company,
            role: {
              not: "owner",
            },
            firstName: {
              contains: query,
            },
          },
        }),
        prisma.user.findMany({
          where: {
            company,
            role: {
              not: "owner",
            },
            firstName: {
              contains: query,
            },
          },
          take: take ?? 5,
          skip: offset ?? 0,
          orderBy: {
            [sortBy ?? "id"]: "desc",
          },
        }),
      ]);

      return {
        count: page[0] ?? 0,
        pageTotal: Math.ceil(page[0] / (take ?? 1)),
        data: page[1],
      };
    }),
});
