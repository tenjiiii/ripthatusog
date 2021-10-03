const { Client, Message, MessageEmbed } = require("discord.js");
module.exports = {
    name : 'nuke',
    category : 'Miscellaneous',
    description : 'A simple nuke command.',
    ownerOnly: false,

     /**
      * 
      * @param {*} Client
      * @param {Message} Message
      * @param {*} args
       */
    run: async(client, message, args) => {
        if(!message.member.permissions.has("MANAGE_CHANNELS")) return message.channel.send('<:wrong:893330231954386984> You dont have permission for this command.'+'Permission required: (ManageChannels)')
                
        message.channel.clone().then((ch) => {
            ch.setParent(message.channel.parent.id)
            ch.setPosition(message.channel.position)
            message.channel.delete();

            const NukeEmbed = new MessageEmbed()
            .setColor("Color you want")
            .setDescription(`<:right:893330260295311360> **${message.author.tag}** Nuked this channel.`)
            .setImage("https://2.bp.blogspot.com/-iYl5L6jFjIg/UopL3Z_d1YI/AAAAAAAAEl4/cTIAh6kozqU/s1600/atomic-bomb-blast-explosion-trollface-troll-face.gif")
                  
    
            ch.send({embeds: [NukeEmbed]})

            const modSchema = require("../../../models/modlogChannel")
            modSchema.findOne({ Guildlog: message.guild.id }, async (e, data) => {
              if (!data) return;
              const channelmodlog = message.guild.channels.cache.get(data.modlogChannel)
              let embed1 = new MessageEmbed()
              .setTitle("Nuke Result")
              .setDescription(`<:right:893330260295311360> Nuked: **${ch}**\n<:emoji_5:893330719231860777> Actioned by: **${message.author.username}**\n<:emoji_11:893332549068292118> Type: **Channel Nuke**`)
              channelmodlog.send({embeds: [embed1]})
            })
    })
}}