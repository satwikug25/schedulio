import { internal } from "./_generated/api";
import { internalMutation, mutation, query } from "./_generated/server";
import { v } from "convex/values";
import { Id } from "./_generated/dataModel";

export const saveBusiness = mutation({
  args: {
    name: v.string(),
    email: v.string(),
    phoneNumber: v.string(),
    companyName: v.string(),
    address: v.string(),
    voiceSelect: v.string(),
    instructions: v.string(),
    events: v.array(
      v.object({
        phoneNumber: v.string(),
        summary: v.string(),
      })
    ),
  },
  handler: async (
    ctx,
    {
      name,
      email,
      phoneNumber,
      companyName,
      address,
      voiceSelect,
      instructions,
      events,
    }
  ) => {
    const business = await ctx.db.insert("business", {
      name,
      email,
      phoneNumber,
      companyName,
      address,
      voiceSelect,
      instructions,
      events,
    });

    return business;
  },
});

export const pushEventsToDatabase = mutation({
  args: {
    phoneNumber: v.optional(v.string()),
    summary: v.optional(v.string()),
    name: v.optional(v.string()),
  },
  handler: async (ctx, { phoneNumber, summary, name }) => {
    const business = await ctx.db
      .query("business")
      .filter((q) => q.eq(q.field("phoneNumber"), "4807918055"))
      .collect();
    console.log(business[0].events);
    const newEvents = business[0].events.concat([{phoneNumber: phoneNumber, summary: summary, name: name}]);
    console.log("newEvents");
    console.log(newEvents);
    const businessId: Id<"business"> = business[0]._id;
    await ctx.db.patch(businessId, { events: newEvents });
    console.log(await ctx.db.get(business[0]._id));
    return business;
  },
});

export const getInstructionsByPhoneNumber = query({
  args: {
    phoneNumber: v.string(),
  },
  handler: async (ctx, { phoneNumber }) => {
    const business = await ctx.db
      .query("business")
      .filter((q) => q.eq(q.field("phoneNumber"), phoneNumber))
      .collect();
    return business[0].instructions;
  },
});



export const getAddressesByPhoneNumber = query({
  args: {
    phoneNumber: v.string(),
  },
  handler: async (ctx, { phoneNumber }) => {
    const business = await ctx.db
      .query("business")
      .filter((q) => q.eq(q.field("phoneNumber"), phoneNumber))
      .collect();
    return business[0].address;
  },
});