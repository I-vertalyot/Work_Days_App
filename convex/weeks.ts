import { query, mutation } from "./_generated/server";
import { v } from "convex/values";
import { getAuthUserId } from "@convex-dev/auth/server";

const KEY = /^(w-\d{4}-\d{2}-\d{2}|settings)$/;

// Everything the signed-in user has saved. Null when nobody is signed in.
export const list = query({
  args: {},
  handler: async (ctx) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) return null;
    const rows = await ctx.db
      .query("weeks")
      .withIndex("by_user", (q) => q.eq("userId", userId))
      .collect();
    return rows.map((r) => ({ key: r.key, data: r.data, updated: r.updated }));
  },
});

// Save one week (or the settings) for the signed-in user.
export const save = mutation({
  args: { key: v.string(), data: v.any() },
  handler: async (ctx, { key, data }) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) throw new Error("Not signed in");
    if (!KEY.test(key)) throw new Error("Bad key");
    if (JSON.stringify(data).length > 20000) throw new Error("Too large");
    const existing = await ctx.db
      .query("weeks")
      .withIndex("by_user_key", (q) => q.eq("userId", userId).eq("key", key))
      .unique();
    const updated = Date.now();
    if (existing) await ctx.db.patch(existing._id, { data, updated });
    else await ctx.db.insert("weeks", { userId, key, data, updated });
  },
});

// The signed-in user's email, to show in the menu.
export const me = query({
  args: {},
  handler: async (ctx) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) return null;
    const user = await ctx.db.get(userId);
    return { email: user?.email ?? null };
  },
});
