const { MessageEmbed } = require("discord.js")

module.exports = {
    name: "forceban",
    run: async(client, message, args) => {
        const id = args[0]
        const reason = args.slice(1).join(" ") || "Unspecified";
        if(!id) return message.channel.send("Please put a valid userID")

        let embed = new MessageEmbed()
        .setTitle("FORCEBAN")
        .setColor("GREEN")
        .setDescription(`<:right:893330260295311360> Forcebanned: **${id}**\n<:emoji_8:893331288944160798> Reason: **${reason}**\n<:emoji_8:893331288944160798> Actioned by: ${message.author.username} - (${message.author.id})`, message.author.displayAvatarURL({dynamic: true}))
      try{
        let ban = await message.guild.members.ban(id, { reason: reason })
        message.channel.send({embeds: [embed]})
      } catch (error) {
         return message.channel.send(`Invalid userID!`)
      }
        const modSchema = require("../../../models/modlogChannel")
        modSchema.findOne({ Guildlog: message.guild.id }, async (e, data) => {
          if (!data) return;
          const channelmodlog = message.guild.channels.cache.get(data.modlogChannel)
          let embed1 = new MessageEmbed()
          .setTitle("Ban Result")
          .setDescription(`<:right:893330260295311360> Member banned: **<@${id}> - (${args[0]})**\n<:emoji_5:893330719231860777> Actioned by: **${message.author.username}**\n<:emoji_11:893332549068292118> Type: **Force Ban**\n<:emoji_9:893331380166066178> Reason: **${reason}**`)
          channelmodlog.send({embeds: [embed1]})
        })
    }
}