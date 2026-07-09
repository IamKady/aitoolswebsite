import { defineConfig } from "prisma/config";

export default defineConfig({
  schema: "prisma/schema.prisma",
  datasource: {
    url: process.env.DATABASE_URL || "postgresql://user:password@endpoint-pooler.region.aws.neon.tech/dbname?sslmode=require",
  },
});
