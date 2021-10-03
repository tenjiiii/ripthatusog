const { Client, Message, MessageEmbed } = require("discord.js")

module.exports = {
    name: "addroleall",
    description: "Give a role to everyone in the server!",
    category: "Administrator",
    /**
     * @param {Client} client
     * @param {Message} message 
     * @param {String[]} args
     */
    run: async(client, message, args) => {
        let role = message.mentions.roles.first() || message.guild.roles.cache.find(r => r.id === args.join(" ").toLowerCase() || r.name.toLowerCase() === args.join(" ").toLowerCase())
        if(!role || !args) {
            return message.reply({content: `<:wrong:893330231954386984> Please supply a valid role!`})
        }
        if(role.position >= message.guild.me.roles.highest.position) {
            return message.reply({content: `<:wrong:893330231954386984> Missing permissions! Please move my role higher than the mentioned role!`})
        }
        
        let finshed = 0
        let msg = await message.reply({content: `<:right:893330260295311360> Adding roles to everyone, this may take a while!`})
        message.guild.members.cache.forEach((m) => {
            setTimeout(() => {
                if(m.roles.cache.find(r => r.id === role.id)) {
                    return;
                } else {
                finshed++
                m.roles.add(role).catch((err) => {
                    finshed--
                })
                }
            }, 10000);
        })


      setTimeout(() => {
        msg.edit({content: `<:right:893330260295311360> Finshed adding role ${role.name} to ${finshed} members!`})
        message.channel.send({content: `<@${message.author.id}>`})
        .then((mes) => {
            setTimeout(() => {
                mes.delete()
            }, 100);
            
        })
      }, 10000 * Number(message.guild.memberCount));
      const modSchema = require("../../../models/modlogChannel")
      modSchema.findOne({ Guildlog: message.guild.id }, async (e, data) => {
        if (!data) return;
        const channelmodlog = message.guild.channels.cache.get(data.modlogChannel)
        let embed1 = new MessageEmbed()
        .setTitle("Role Result")
        .setDescription(`<:right:893330260295311360> Role added: **${role}**\n<:emoji_5:893330719231860777> Actioned by: **${message.author.username}**\n<:emoji_11:893332549068292118> Type: **Add role to everyone**`)
        channelmodlog.send({embeds: [embed1]})
      })
    }
}