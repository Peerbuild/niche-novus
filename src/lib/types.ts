import { Prisma } from "@prisma/client";
export type ClientWithProjects = Prisma.ClientGetPayload<{
  include: {
    Project: true;
  };
}>;
