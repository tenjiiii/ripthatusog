const client = require("../index")
const guild = require("../models/guild")
const GuildConfig = require("../models/GuildConfig")

client.on("guildCreate", async (guild) => {
   try{
       const guildConfig = await GuildConfig.create({
           guildId: guild.id,
       })
       console.log("Bot has joined a server! saved to DB")
   } catch(error) {
       console.log(error)
   }
})