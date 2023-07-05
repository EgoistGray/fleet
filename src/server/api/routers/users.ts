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
        username: z.string(),
      })
    )
    .mutation(async ({ input: { username } }) => {
      await prisma.user.delete({
        where: {
          username,
        },
      });
    }),

  updateAccount: adminProcedure
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
      await prisma.user.update({
        data: input,
        where: {
          username: input.username,
        },
      });
    }),

  getAccounts: adminProcedure
    .input(
      z.object({
        company: z.string(),
        orderOption: z.string().nullish(),
        startId: z.string().nullish(),
        take: z.number().nullish(),
      })
    )
    .query(async ({ input: { company, orderOption, startId, take } }) => {
      return await prisma.user.findMany({
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
