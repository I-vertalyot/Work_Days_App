import { defineSchema, defineTable } from "convex/server";
import { authTables } from "@convex-dev/auth/server";
import { v } from "convex/values";

export default defineSchema({
  // users, sessions and other sign-in tables from Convex Auth
  ...authTables,

  // one document per user per week ("w-2026-11-16"), plus one "settings" document
  weeks: defineTable({
    userId: v.id("users"),
    key: v.string(),
    data: v.any(),
    updated: v.number(),
  })
    .index("by_user", ["userId"])
    .index("by_user_key", ["userId", "key"]),
});
