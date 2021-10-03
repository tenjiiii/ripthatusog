const { MessageEmbed } = require("discord.js")
const moment = require('moment')
const modSchema = require("../../../models/modlogChannel")


module.exports = {
name: "kick",
category: "moderation",
description: "kick a user",
cooldown: 5,
userPerms: ["KICK_MEMBERS"],
clientPerms: ["KICK_MEMBERS"],
run: async(client, message, args) => {  
    if(!message.member.permissions.has('KICK_MEMBERS')) return message.channel.send({embeds: [new MessageEmbed()
        .setDescription("<:wrong:893330231954386984>  You do not have permission to use this command - `\Kick_MEMBERS\`")
        .setColor("RED")]})

    const mentionedMember = message.mentions.members.first() || message.guild.members.cache.get(args[0])
    if (!mentionedMember) return message.channel.send("<:wrong:893330231954386984> Please put valid userID or mention a member")
    const reason = args.slice(1).join(" ")
     if (
    message.member.roles.highest.position <=
    mentionedMember.roles.highest.position
    )
    return message.reply({ content: 
        "<:wrong:893330231954386984> You cant punish because u either have the same role or your role is lower.."
    });
          if (!args[0]) return message.channel.send({content: "<:wrong:893330231954386984> | **Specify someone to kick.**"})
        if (!mentionedMember) return message.channel.send({content: "<:wrong:893330231954386984> | **I can't find that member.**"})
        if (mentionedMember.id === message.author.id) return message.channel.send({content: "<:wrong:893330231954386984> | You can't kick yourself."})
        if (mentionedMember.roles.highest.position >= message.member.roles.highest.position && message.author.id !== message.guild.owner.id) {
            return message.channel.send({content: "<:wrong:893330231954386984> | **You can\'t kick this member due to your role being lower than that member role.**"})
        }
        if (mentionedMember.kickable) {
            const embed = new MessageEmbed()
            .setAuthor(`${message.author.username} - (${message.author.id})`, message.author.displayAvatarURL({dynamic: true}))
            .setThumbnail(mentionedMember.user.displayAvatarURL({dynamic: true}))
            .setColor(`RANDOM`)
            .setDescription(`<:right:893330260295311360> Successfully kicked\n
**Member:** ${mentionedMember.user.username} - (${mentionedMember.user.id})\n**Reason:** ${reason || "None"}
            `)
        message.channel.send({embeds: [embed]})
        mentionedMember.kick()
        modSchema.findOne({ Guildlog: message.guild.id }, async (e, data) => {
            if (!data) return;
            const channelmodlog = message.guild.channels.cache.get(data.modlogChannel)
            let embed1 = new MessageEmbed()
            .setTitle("Kick Result")
            .setDescription(`<:right:893330260295311360> Member: **${mentionedMember.user} - (${mentionedMember.user.id})**\n<:emoji_5:893330719231860777> Actioned by: **${message.author.username}**\n<:emoji_11:893332549068292118> Type: **Server Ban**\n<:emoji_9:893331380166066178> Reason: **${reason || "none"}**`)
            channelmodlog.send({embeds: [embed1]})
        })

        } else {
            return message.channel.send({content: "<:wrong:893330231954386984> | **I can\'t kick this user make sure that the users role is lower than my role.**"})
        }
        }
    }