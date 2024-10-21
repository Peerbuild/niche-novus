import { Prisma } from "@prisma/client";

export interface ClientWithProjects
  extends Prisma.ClientGetPayload<{ include: { Project: true } }> {}
