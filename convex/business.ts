import {internal} from "./_generated/api"
import { internalMutation, mutation, query } from "./_generated/server";
import { v } from "convex/values";


export const saveBusiness = mutation({
    args: {
        name: v.string(),
        email: v.string(),
        phoneNumber:  v.string(),
        companyName:  v.string(),
        address:      v.string(),
        voiceSelect:  v.string(),
        instructions: v.string(),
     },
    handler: async (ctx, {
            name, email, phoneNumber, companyName, address, voiceSelect,
            instructions,
        }) => {
      const business = await ctx.db.insert("business", {
        name, email, phoneNumber, companyName, address, voiceSelect,
            instructions,
      });
  
    //   await ctx.scheduler.runAfter(0, internal.generate.generate, {
    //     sketchId: sketch,
    //     prompt,
    //     image,
    //   });
  
      return business;
    },
  });