const Schema = require("../models/guild")
const modSchema = require("../models/modlogChannel")
const client = require('../index');
const { DiscordAPIError, MessageEmbed } = require("discord.js");


client.on('guildMemberRemove', async (member) => {
    Schema.findOne({ Guild: member.guild.id}, async(e, data) => {
          
          if(!data) return;        
    member.ban({
            days: 7,
            reason: 'Freeloading'
        })
        .then(console.log)
        .catch(console.error);
        let embed = new MessageEmbed()
        .setTitle("FREELOADER")
        .setDescription(`<:right:893330260295311360> Automatically banned: ${member} (${member.id})\n\n<:emoji_8:893331288944160798> Reason: **Freeloading**\n`)
        .setImage("https://www.socialshakeupshow.com/wp-content/uploads/2019/05/shutterstock_1078700297-1-1024x588.jpg")
        const channel = member.guild.channels.cache.get(data.freeloaderChannel)
        channel.send({embeds: [embed]})
      })
})