const { MessageEmbed } = require("discord.js")
module.exports = {
  name: "ban",
  run: async(client, message, args) => {

    if(!message.member.permissions.has('BAN_MEMBERS')) return message.channel.send({ embeds: [new MessageEmbed().setTitle("<:wrong:893330231954386984> You are Missing permissions -\`Ban_Members\`").setColor("RED")] })
      

    if(!message.guild.me.permissions.has('BAN_MEMBERS')) return message.channel.send({embeds: [new MessageEmbed().setDescription('<:wrong:893330231954386984> I am missing `\Ban_Members\` Permissions').setColor('RED')]})

    const member = message.mentions.members.first() || message.guild.members.cache.get(args[0])
    const reason = args.slice(1).join(" ")
 try{
    if (
      message.member.roles.highest.position <=
      member.roles.highest.position
  )
      return message.reply({ content: 
          "<:wrong:893330231954386984> You cant punish because u either have the same role or your role is lower.."
      });
 } catch (error) {
   return message.channel.send("Put a valid userID or Mention")
 }
    if(!member) return message.channel.send({embeds: [new MessageEmbed().setDescription('<:wrong:893330231954386984> Mention Someone :/').setColor('RED')]})

    if(member.id === message.author.id) return message.channel.send({embeds: [new MessageEmbed().setDescription('<:wrong:893330231954386984> I am not able to ban this member').setColor('RED')]})

  if(member.id === client.user.id) return message.channel.send({embeds: [new MessageEmbed().setDescription('<:wrong:893330231954386984> I am not able to ban this member').setColor('RED')]})

    member.ban({reason: `${reason || "No Reason"}`}).then (() => {
       message.channel.send({embeds: [new MessageEmbed().setTitle(`${message.author.username} - (${message.author.id})`, message.author.displayAvatarURL({dynamic: true})).setDescription(`<:right:893330260295311360> Successfully banned <@${member.user.id}> - ${member.user.id}`).setColor("RED")]})
    })
    const modSchema = require("../../../models/modlogChannel")
    modSchema.findOne({ Guildlog: member.guild.id }, async (e, data) => {
      if (!data) return;
      const channelmodlog = member.guild.channels.cache.get(data.modlogChannel)
      let embed1 = new MessageEmbed()
      .setTitle("Ban Result")
      .setDescription(`<:right:893330260295311360> Member banned: **${member.user} - (${member.user.id})**\n<:emoji_5:893330719231860777> Actioned by: **${message.author.username}**\n<:emoji_11:893332549068292118> Type: **Server Ban**\n<:emoji_9:893331380166066178> Reason: **${reason}**`)
      channelmodlog.send({embeds: [embed1]})
    })
  }
}