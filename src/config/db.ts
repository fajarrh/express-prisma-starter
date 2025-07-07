import { Prisma, PrismaClient } from "../generated/prisma/client";

const prisma = new PrismaClient({
  log: ["query", "error"],
  transactionOptions: {
    isolationLevel: Prisma.TransactionIsolationLevel.Serializable,
  },
});

export default prisma;
