import { mutation } from "./_generated/server";

// One-time setup: activate all clients and make the first user an admin
export const activateTestUser = mutation({
  args: {},
  handler: async (ctx) => {
    // Find all clients and activate them
    const clients = await ctx.db.query("clients").collect();
    for (const client of clients) {
      if (!client.isActivated) {
        await ctx.db.patch(client._id, { isActivated: true });
      }
    }

    // Make the first user an admin
    const users = await ctx.db.query("users").collect();
    if (users.length > 0 && !users[0].isAdmin) {
      await ctx.db.patch(users[0]._id, { isAdmin: true });
    }

    return {
      activatedClients: clients.length,
      totalUsers: users.length,
    };
  },
});
