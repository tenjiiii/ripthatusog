const client = require("../index");
const { MessageEmbed } = require("discord.js")
const blacklist = require('../models/blackSchema')
const GuildConfig = require("../models/GuildConfig")


client.on("messageCreate", async (message) => {
    const guildConfig = await GuildConfig.findOne({ guildId: message.guild.id })
    const prefix = guildConfig.get('prefix')
 blacklist.findOne({ id : message.author.id }, async(err, data) => {
        if(err) throw err;
        if(!data) { 
    if (
        message.author.bot ||
        !message.guild ||
        !message.content.toLowerCase().startsWith(prefix)
    )
        return;

    const [cmd, ...args] = message.content
        .slice(prefix.length)
        .trim()
        .split(" ");

    const command = client.commands.get(cmd.toLowerCase()) || client.commands.find(c => c.aliases?.includes(cmd.toLowerCase()));

    if (!command) return;
    await command.run(client, message, args);

    const config = require("../config.json");
if (command.ownerOnly && message.author.id !== config.owner) return message.channel.send(" 🧩 ONLY BOT DEVELOPER CAN USE THIS COMMAND!");
} else {
   const blist = new MessageEmbed()
    .setColor("RED")
    .setDescription(`**❌ | You are blacklisted!**`)
    message.reply({embeds : [blist]});
        }

});

})